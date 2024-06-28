"use client";

import Image from "next/image";

const CartModal = () => {
  const cartItems = 1;

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cartItems ? (
        <div className="">Cart is empty</div>
      ) : (
        <>
          {/* LIST OF ITEMS */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            <div className="flex gap-4">
              <Image
                src="https://i.pinimg.com/originals/91/bb/7b/91bb7bcb49263e5dfc7731e2b34afef4.jpg"
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div>
                  {/* TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                      $79
                    </div>
                  </div>
                  {/* DESCRIPTION */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 200</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>
            {/* ITEM */}
            <div className="flex gap-4">
              <Image
                src="https://i.pinimg.com/originals/91/bb/7b/91bb7bcb49263e5dfc7731e2b34afef4.jpg"
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div>
                  {/* TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                      $79
                    </div>
                  </div>
                  {/* DESCRIPTION */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 200</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* TOTAL PRICE */}
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">$158</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View cart
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75">
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
