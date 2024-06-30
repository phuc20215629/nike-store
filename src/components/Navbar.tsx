import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
// import NavIcons from "./NavIcons";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  return (
    <div className="top-0 sticky bg-white h-18 px-4 py-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 z-20">
      {/* Mobile */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <Image src={"/nike-logo.png"} alt="logo" width={70} height={70} />
        </Link>
        <Menu />
      </div>
      {/* Bigger screen */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* Left side */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/">
            <Image src={"/nike-logo.png"} alt="logo" width={70} height={70} />
          </Link>
        </div>
        {/* Right side */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
