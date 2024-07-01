"use client";

import { useRouter } from "next/navigation";
import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formData.get("input") as string;

    if (input) {
      router.push(`/list?name=${input}`);
    }
  };

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 px-3 py-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="input"
        placeholder="Search for products here..."
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <GoSearch />
      </button>
    </form>
  );
};

export default SearchBar;
