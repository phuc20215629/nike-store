import Image from "next/image";
import Link from "next/link";

const CategoryList = () => {
  return (
    <div className="px-10 overflow-x-scroll h-[600px]">
      <div className="flex gap-4 md:gap-8 h-[500px]">
        <Link
          href="/list?cat=test"
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/3"
        >
          <div className="relative bg-slate-100 w-full h-full">
            <Image
              src="https://static.nike.com/a/images/w_960,c_limit/37d3cd53-38b1-42ab-a2a3-d116ff67d79d/image.jpg"
              alt="not showing"
              fill
              sizes="30"
              className="object-cover"
            />
          </div>
          <h1 className="mt-6 font-medium tracking-wide ">Category Name</h1>
        </Link>
        <Link
          href="/list?cat=test"
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/3"
        >
          <div className="relative bg-slate-100 w-full h-full">
            <Image
              src="https://static.nike.com/a/images/w_960,c_limit/37d3cd53-38b1-42ab-a2a3-d116ff67d79d/image.jpg"
              alt="not showing"
              fill
              sizes="30"
              className="object-cover"
            />
          </div>
          <h1 className="mt-6 font-medium tracking-wide ">Category Name</h1>
        </Link>
        <Link
          href="/list?cat=test"
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/3"
        >
          <div className="relative bg-slate-100 w-full h-full">
            <Image
              src="https://static.nike.com/a/images/w_960,c_limit/37d3cd53-38b1-42ab-a2a3-d116ff67d79d/image.jpg"
              alt="not showing"
              fill
              sizes="30"
              className="object-cover"
            />
          </div>
          <h1 className="mt-6 font-medium tracking-wide ">Category Name</h1>
        </Link>
        <Link
          href="/list?cat=test"
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/3"
        >
          <div className="relative bg-slate-100 w-full h-full">
            <Image
              src="https://static.nike.com/a/images/w_960,c_limit/37d3cd53-38b1-42ab-a2a3-d116ff67d79d/image.jpg"
              alt="not showing"
              fill
              sizes="30"
              className="object-cover"
            />
          </div>
          <h1 className="mt-6 font-medium tracking-wide ">Category Name</h1>
        </Link>
        <Link
          href="/list?cat=test"
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/3"
        >
          <div className="relative bg-slate-100 w-full h-full">
            <Image
              src="https://static.nike.com/a/images/w_960,c_limit/37d3cd53-38b1-42ab-a2a3-d116ff67d79d/image.jpg"
              alt="not showing"
              fill
              sizes="30"
              className="object-cover"
            />
          </div>
          <h1 className="mt-6 font-medium tracking-wide ">Category Name</h1>
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
