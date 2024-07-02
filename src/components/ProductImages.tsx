"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-start gap-4 mt-8">
        {items.map((item: any, i: number) => (
          <div
            className="w-1/4 h-32 relative gap-4 cursor-pointer "
            key={item._id}
            onMouseOver={() => setIndex(i)}
          >
            <Image
              src={item.image.url}
              alt=""
              fill
              sizes="30vw"
              className={`object-cover rounded-md ${
                index === i ? "border-gray-400 border-2" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
