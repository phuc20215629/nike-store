"use client";

import { useWixClients } from "@/hooks/useWixClients";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import CartModal from "./CartModal";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcon = async () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wixClient = useWixClients();
  const isLoggedIn = wixClient.auth.loggedIn();

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen(!isProfileOpen);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push("/");
  };

  const { cart, counter, getCart } = useCartStore();
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <FaUserCircle
        className="cursor-pointer w-6 h-6"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out..." : "Logout"}
          </div>
        </div>
      )}

      <FaBell className="cursor-pointer w-6 h-6" />

      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <FaShoppingCart className="cursor-pointer w-6 h-6" />
        <div className="absolute -top-3 -right-3 w-5 h-5 bg-red-100 rounded-full text-xs text-black flex items-center justify-center">
          {counter}
        </div>
        {isCartOpen && <CartModal />}
      </div>
    </div>
  );
};

export default NavIcon;
