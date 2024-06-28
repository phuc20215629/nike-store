"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import CartModal from "./CartModal";

const NavIcon = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isLoggedIn = false;

  const handleProfile = () => {
    if (!isLoggedIn) router.push("/login");
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <FaUserCircle
        className="cursor-pointer w-6 h-6"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}

      <FaBell className="cursor-pointer w-6 h-6" />

      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <FaShoppingCart className="cursor-pointer w-6 h-6" />
        <div className="absolute -top-3 -right-3 w-5 h-5 bg-lama rounded-full text-xs text-white flex items-center justify-center">
          2
        </div>
        {isCartOpen && <CartModal />}
      </div>
    </div>
  );
};

export default NavIcon;
