"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  {
    id: 1,
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ee711f04-eac6-4043-9d5d-39934515c09b/custom-nike-air-force-1-high-by-you-shoes.png",
  },
  {
    id: 2,
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9f2ff6b5-a4ab-4367-ac73-91430bc949e2/custom-nike-air-force-1-high-by-you-shoes.png",
  },
  {
    id: 3,
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/8691516e-bdee-4cb1-b164-4fef21c8dd6c/custom-nike-air-force-1-high-by-you-shoes.png",
  },
  {
    id: 4,
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b6f9be47-b512-4984-8791-9d15021ce16c/custom-nike-air-force-1-high-by-you-shoes.png",
  },
];

const ProductImages = () => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={images[index].url}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((image, i) => (
          <div
            className="w-1/4 h-32 relative gap-4 cursor-pointer "
            key={image.id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={image.url}
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
