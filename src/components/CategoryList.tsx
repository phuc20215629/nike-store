import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  const wixClient = await wixClientServer();
  const categories = await wixClient.collections.queryCollections().find();

  return (
    <div className="px-10 overflow-x-scroll h-[600px]">
      <div className="flex gap-4 md:gap-8 h-[500px]">
        {categories.items.map((category) => (
          <Link
            href={"/list?category=" + category.slug}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/3"
            key={category._id}
          >
            <div className="relative bg-slate-100 w-full h-full">
              <Image
                src={category.media?.mainMedia?.image?.url || "/nike-logo.png"}
                alt="not showing"
                fill
                sizes="30"
                className="object-cover"
              />
            </div>
            <h1 className="mt-6 font-medium tracking-wide ">{category.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
