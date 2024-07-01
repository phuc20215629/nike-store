import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { wixClientServer } from "@/lib/wixClientServer";
import Link from "next/link";
import { notFound } from "next/navigation";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const wixClient = await wixClientServer();

  let order;
  try {
    order = await wixClient.orders.getOrder(id);
  } catch (error) {
    return notFound();
  }

  console.log(order);

  return (
    <Card className="w-[700px] mx-auto mt-8">
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
        <CardDescription>
          You can review your order details here.
        </CardDescription>
      </CardHeader>
      <hr />
      <CardContent>
        <div className="mt-4 grid w-full items-center gap-4">
          <div className="flex flex-col gap-6">
            <div className="">
              <span className="font-semibold">Order Id: </span>
              <span>{order._id}</span>
            </div>
            <div className="">
              <span className="font-semibold">Receiver Name: </span>
              <span>
                {order.billingInfo?.contactDetails?.firstName + " "}
                {order.billingInfo?.contactDetails?.lastName}
              </span>
            </div>
            <div className="">
              <span className="font-semibold">Receiver Email: </span>
              <span>{order.buyerInfo?.email}</span>
            </div>
            <div className="">
              <span className="font-semibold">Price: </span>
              <span>{order.priceSummary?.subtotal?.amount}</span>
            </div>
            <div className="">
              <span className="font-semibold">Payment Status: </span>
              <span>{order.paymentStatus}</span>
            </div>
            <div className="">
              <span className="font-semibold">Order Status: </span>
              <span>{order.status}</span>
            </div>
            <div className="">
              <span className="font-semibold">Delivery Address: </span>
              <span>
                {order.billingInfo?.address?.addressLine1 + " "}
                {order.billingInfo?.address?.city}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <hr />
      <CardFooter className="flex justify-center">
        <Link href="/" className="underline mt-6">
          <Button variant={"link"}>Have a problem? Contact us</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OrderPage;
