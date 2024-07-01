import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import Skeleton from "@/components/Skeleton";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = async () => {
  return (
    <div>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link href={"/list?category=new-featured"}>
          <Button
            variant={"ghost"}
            className="text-2xl font-semibold rounded-full"
          >
            Featured Products
          </Button>
        </Link>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.NEW_FEATURED_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12 font-semibold">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link href={"/list?category=sales"}>
          <Button
            variant={"ghost"}
            className="text-2xl font-semibold rounded-full"
          >
            On Sale
          </Button>
        </Link>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.ON_SALE_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
