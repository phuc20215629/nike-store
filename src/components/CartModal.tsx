"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClients } from "@/hooks/useWixClients";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";

const CartModal = () => {
  const wixClient = useWixClients();
  const { cart, removeItem, getCart, isLoading } = useCartStore();
  console.log(cart);

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div className="">Cart is empty</div>
      ) : (
        <>
          {/* LIST OF ITEMS */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt="/nike-logo.png"
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div>
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-gray-600">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        ${item.price?.amount}
                      </div>
                    </div>
                    {/* DESCRIPTION */}
                    <div className="text-xs text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 text-xs">
                      Quantity: {item.quantity}
                    </span>
                    <span
                      className="text-blue-500"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* TOTAL PRICE */}
          <div>
            <div className="flex items-center justify-between font-semibold mb-4">
              <span className="">Subtotal</span>
              {/* @ts-ignore */}
              <span className="">${cart.subtotal?.amount}</span>
            </div>
            <hr />
            <div className="flex justify-between text-sm mt-4">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
