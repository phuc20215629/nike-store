"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClients } from "@/hooks/useWixClients";
import { currentCart } from "@wix/ecom";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaCartShopping } from "react-icons/fa6";

const CartModal = () => {
  const wixClient = useWixClients();
  const { cart, removeItem, isLoading } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: {
            checkoutId: checkout.checkoutId,
          },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl)
        window.location.href = redirectSession.fullUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full px-4 py-8 absolute right-0 top-10 flex flex-col justify-between ">
      {!cart.lineItems ? (
        <div className="flex flex-col gap-3 justify-center mt-20">
          <Image
            src="/empty-cart.png"
            alt=""
            width={350}
            height={350}
            className="object-cover rounded-md"
          />{" "}
          <div className="text-center font-semibold text-xl text-muted-foreground">
            Oops! Your cart is empty.
          </div>
        </div>
      ) : (
        <>
          {/* LIST OF ITEMS */}
          <div className="flex flex-col gap-8 overflow-y-scroll">
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
                <hr />
              </div>
            ))}
          </div>
          {/* TOTAL PRICE */}
          <div className="mb-4">
            <hr />
            <div className="flex items-center justify-between font-semibold my-4">
              <span className="">Subtotal</span>
              {/* @ts-ignore */}
              <span className="">${cart.subtotal?.amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <Button
                disabled={isLoading}
                onClick={handleCheckout}
                className="w-full"
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
