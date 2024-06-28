import Add from "@/components/Add";
import CustomizedProducts from "@/components/CustomizedProducts";
import ProductImages from "@/components/ProductImages";

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMAGE */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>
      {/* DESCRIPTION */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Let your design shine in satin, keep it classic in canvas and get luxe
          with leather. No matter what you choose, these AF-1s are all about
          you. 12 classic colour choices and an additional Gum option for the
          sole mean your shoe is destined to be one of a kind, just like you.
        </p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$249</h3>
          <h2 className="text-2xl font-medium">$249</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomizedProducts />
        <Add />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">
            Let your design shine in satin, keep it classic in canvas and get
            luxe with leather. No matter what you choose, these AF-1s are all
            about you. 12 classic colour choices and an additional Gum option
            for the sole mean your shoe is destined to be one of a kind, just
            like you.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
