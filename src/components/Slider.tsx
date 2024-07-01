"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const slides = [
  {
    id: 1,
    title: "DON'T WASTE YOUR ENERGY",
    description:
      "Run in Pegasus. Feel the responsive energy return of Air Zoom and all-new ReacX Foam",
    img: "https://i.pinimg.com/originals/8b/28/e3/8b28e3f8a8f948e669bf58442c2f6449.png",
    url: "/",
    bg: "bg-white",
  },
  {
    id: 2,
    title: "JORDAN SPORT",
    description:
      "Rooted in basketball, influenced by street culture. Jazz Chisholm and Guard Rhyne Howard stunt in elevated pieces designed to complement performance and style.",
    img: "https://i.pinimg.com/originals/65/64/ea/6564eaff4827d5f5062f2940b8952405.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "JUST DO IT",
    description: "Bring your game. Your only limit is you!",
    img: "https://i.pinimg.com/564x/66/03/45/6603454ddb228402260ca9b2e57cd17b.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-5xl font-extrabold">{slide.title}</h1>
              <span className="p-2">{slide.description}</span>
              <Link href={slide.url}>
                <Button className="rounded-3xl">SHOP NOW</Button>
              </Link>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Sliding buttons */}
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
