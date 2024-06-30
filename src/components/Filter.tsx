"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>("");
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const { replace } = useRouter();

  const handleFilterChange = () => {
    const params = new URLSearchParams(searchParams);

    if (category) params.set("category", category);
    if (min) params.set("min", min);
    if (!min) params.set("min", "0");
    if (max) params.set("max", max);
    if (!max) params.set("max", "99999999");

    replace(`${pathname}?${params.toString()}`);
  };

  const handleSort = (sortType: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortType);
    console.log(params.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <Select onValueChange={(e) => setCategory(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-products">All</SelectItem>
            <SelectItem value="new-featured">New Featured</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="kids">Kids</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          name="min"
          placeholder="Min price"
          className="w-24"
          onChange={(e) => setMin(e.target.value)}
        />
        <Input
          type="text"
          name="max"
          placeholder="Max price"
          className="w-24"
          onChange={(e) => setMax(e.target.value)}
        />

        <Button onClick={handleFilterChange}>Filter</Button>
      </div>

      <div className="">
        <Select onValueChange={(e) => handleSort(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc price">Price (low to high)</SelectItem>
            <SelectItem value="desc price">Price (high to low)</SelectItem>
            <SelectItem value="desc lastUpdated">
              Newest (new to old)
            </SelectItem>
            <SelectItem value="asc lastUpdated">Oldest (old to new)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
