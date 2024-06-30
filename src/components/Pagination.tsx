"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between w-full">
      <Button
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
