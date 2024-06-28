import Image from "next/image";
import Link from "next/link";
import { FaGlobe, FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 text-sm mt-24 border-t-2">
      <div className="flex flex-col md:flex-row justify-between font-medium">
        <div className="flex flex-col justify-between">
          <h1 className="text-xl tracking-wide mb-8">Resources</h1>
          <div className="flex flex-col gap-6 text-gray-500">
            <Link href="">Find A Store</Link>
            <Link href="">Become A Member</Link>
            <Link href="">Student Discounts</Link>
            <Link href="">Send Us Feedback</Link>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-xl tracking-wide mb-8">Help</h1>
          <div className="flex flex-col gap-6 text-gray-500">
            <Link href="">Get Help</Link>
            <Link href="">Order Status</Link>
            <Link href="">Delivery</Link>
            <Link href="">Contact Us</Link>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-xl tracking-wide mb-8">Company</h1>
          <div className="flex flex-col gap-6 text-gray-500">
            <Link href="">About Nike</Link>
            <Link href="">News</Link>
            <Link href="">Careers</Link>
            <Link href="">Investors</Link>
          </div>
        </div>
        <div className="flex flex-row w-1/10 justify-between mx-2">
          <FaGlobe />
          <div className="ml-2 -mt-1">Vietnam</div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="text-gray-500 font-bold">
            <span className=" mr-4 flex flex-row">
              <FaRegCopyright />
              <span className="ml-2 -mt-1">
                2024 Nike, Inc. All rights reserved
              </span>
              <div className=" mr-4 flex flex-row gap-5 ml-5 -mt-1">
                <Link href="/" className="hover:text-black">
                  Guides
                </Link>
                <Link href="/" className="hover:text-black">
                  Terms of Sale
                </Link>
                <Link href="/" className="hover:text-black">
                  Terms of Use
                </Link>
                <Link href="/" className="hover:text-black">
                  Nike Privacy Policy
                </Link>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
