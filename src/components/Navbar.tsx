import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-10 xl:px-10 2xl:px-64 relative">
      {/* Mobile */}
      <div className="h-full flex items-center justify-between">
        <Link href="/">
          <Image src={"/nike-logo.png"} alt="logo" width={70} height={70} />
        </Link>
        <Menu />
      </div>
      {/* Bigger screen */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* Left side */}
        <div className="w-1/3">
          <Link href="/">
            <Image src={"/nike-logo.png"} alt="logo" width={70} height={70} />
          </Link>
        </div>
        {/* Right side */}
        <div className="w-2/3"></div>
      </div>
    </div>
  );
};

export default Navbar;
