"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClients } from "@/hooks/useWixClients";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import CartModal from "./CartModal";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useToast } from "./ui/use-toast";

const NavIcon = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const wixClient = useWixClients();
  const isLoggedIn = wixClient.auth.loggedIn();

  const { counter, getCart } = useCartStore();
  useEffect(() => {
    getCart(wixClient);
    console.log("OK");
  }, [wixClient, getCart, isLoggedIn, toast]);

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else router.push("/profile");
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    window.location.reload();
    toast({
      title: "Success!",
      description: "You are logged out.",
      duration: 4000,
    });
  };

  return (
    <div className="flex items-center relative">
      <Button variant={"ghost"} onClick={handleProfile}>
        <FaUserCircle
          className="cursor-pointer w-6 h-6"
          onClick={handleProfile}
        />
      </Button>
      {isLoggedIn && (
        <Button variant={"ghost"}>
          <IoLogOut className="cursor-pointer w-7 h-7" onClick={handleLogout} />
        </Button>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            <FaShoppingCart className="cursor-pointer w-6 h-6" />
            <span className="ml-2 text-md">({counter})</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart ({counter})</SheetTitle>
          </SheetHeader>
          <CartModal />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavIcon;
