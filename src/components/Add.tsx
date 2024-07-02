"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClients } from "@/hooks/useWixClients";
import { useState } from "react";
import { Button } from "./ui/button";

const Add = ({
  productId,
  variantId,
  stock,
}: {
  productId: string;
  variantId: string;
  stock: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) setQuantity((pre) => pre - 1);
    if (type === "i" && quantity < stock) setQuantity((pre) => pre + 1);
  };

  const wixClient = useWixClients();

  const { addItem, isLoading } = useCartStore();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            <div className="border-x-2 w-12 text-center">{quantity}</div>
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
          {stock < 1 ? (
            <div className="text-xs">Sold out!</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-lama">{stock} items</span> left!
            </div>
          )}
        </div>
        <Button
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          disabled={isLoading}
        >
          Add to Bag
        </Button>
      </div>
    </div>
  );
};

export default Add;
