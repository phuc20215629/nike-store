import Add from "@/components/Add";
import CustomizedProducts from "@/components/CustomizedProducts";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { Suspense } from "react";
import Reviews from "@/components/Reviews";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  const price = product.convertedPriceData?.formatted?.price;
  const discountedPrice =
    product.convertedPriceData?.formatted?.discountedPrice;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMAGE */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>

      {/* DESCRIPTION */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1
          className="text-4xl font-medium"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.name || ""),
          }}
        />
        <div
          className="text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description || ""),
          }}
        />
        <div className="h-[2px] bg-gray-100" />

        {price !== discountedPrice ? (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">{price}</h3>
            <h2 className="text-2xl font-medium">{discountedPrice}</h2>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl">{price}</h3>
          </div>
        )}

        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions ? (
          <CustomizedProducts
            productId={product._id!}
            variants={product.variants}
            options={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-000000-000000-000000000000"
            stock={product.stock?.quantity || 0}
          />
        )}

        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(section.description || ""),
              }}
            />
          </div>
        ))}
        <div className="h-[2px] bg-gray-100" />

        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense>
      </div>
    </div>
  );
};

export default SinglePage;
