"use client";

import { useWixClients } from "@/hooks/useWixClients";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import CartModal from "./CartModal";
import { useCartStore } from "@/hooks/useCartStore";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const NavIcon = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wixClient = useWixClients();
  const isLoggedIn = wixClient.auth.loggedIn();

  useEffect(() => {}, [isLoggedIn]);

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
    router.push("/");
    toast({
      title: "Success!",
      description: "You are logged out.",
      duration: 4000,
    });
  };

  const { counter, getCart } = useCartStore();
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

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
