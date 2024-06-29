"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, useToast } from "@/components/ui/use-toast";
import { useWixClients } from "@/hooks/useWixClients";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const { toast } = useToast();
  const [mode, setMode] = useState(MODE.LOGIN);
  const router = useRouter();

  const wixClient = useWixClients();
  const isLoggedIn = wixClient.auth.loggedIn();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (error)
      toast({
        title: "Error",
        description: error,
        duration: 5000,
      });
    if (message)
      toast({
        title: message,
        description: "",
        duration: 5000,
      });
  }, [error, message]);

  const formTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset your password"
      : "Email verification";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      let res;

      switch (mode) {
        case MODE.LOGIN:
          res = await wixClient.auth.login({ email, password });
          break;
        case MODE.REGISTER:
          res = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username! },
          });
          break;
        case MODE.RESET_PASSWORD:
          res = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Password reset email sent. Please check your e-mail.");
          break;
        case MODE.EMAIL_VERIFICATION:
          res = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (res?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Logged in successfully!");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            res.data.sessionToken!
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 3,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            res.errorCode === "invalidEmail" ||
            res.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
          } else if (res.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (res.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong!");
          }
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMessage("Email verification required");
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
        default:
          setError("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      setError("Authentication Error!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-5 -mb-5 flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-center">{formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {mode === MODE.REGISTER ? (
            <div className="grid w-full items-center gap-3">
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="nike"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          ) : null}

          {mode !== MODE.EMAIL_VERIFICATION ? (
            <div className="grid w-full items-center gap-3">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="grid w-full items-center gap-3">
              <Label>Verification Code</Label>
              <Input
                type="text"
                name="emailCode"
                placeholder="Your received email code"
                onChange={(e) => setEmailCode(e.target.value)}
              />
            </div>
          )}

          {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
            <div className="grid w-full items-center gap-3">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : null}

          {mode === MODE.LOGIN && (
            <div
              className="text-xs cursor-pointer hover:text-gray-500"
              onClick={() => setMode(MODE.RESET_PASSWORD)}
            >
              Forgot Password?
            </div>
          )}
          <Button className="w-full my-2">
            {isLoading ? <span className="loader" /> : buttonTitle}
          </Button>

          {/* CHANGE MODE SECTION */}
          {mode === MODE.LOGIN && (
            <div
              className="text-sm text-center cursor-pointer hover:text-gray-500"
              onClick={() => setMode(MODE.REGISTER)}
            >
              {"Don't"} have an account?
            </div>
          )}
          {mode === MODE.REGISTER && (
            <div
              className="text-sm text-center hover:text-gray-500 cursor-pointer"
              onClick={() => setMode(MODE.LOGIN)}
            >
              Have and account?
            </div>
          )}
          {mode === MODE.RESET_PASSWORD && (
            <div
              className="text-sm text-center hover:text-gray-500 cursor-pointer"
              onClick={() => setMode(MODE.LOGIN)}
            >
              Go back to Login
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
