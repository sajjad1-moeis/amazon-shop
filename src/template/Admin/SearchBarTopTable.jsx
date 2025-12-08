"use client";

import { SearchNormal1 } from "iconsax-reactjs";
import React, { memo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default memo(function SearchBarTopTable({ title, onInput, placeholder, inputContainerClass, children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const searchParam = searchParams.get("search") || "";

  useEffect(() => {
    setSearchValue(searchParam);
  }, [searchParam]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    params.delete("page");

    router.push(`?${params.toString()}`);

    onInput && onInput(searchValue);
  };

  return (
    <form onSubmit={submitHandler} className={inputContainerClass || "flex gap-2 flex-row-reverse"}>
      <div className="relative bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg h-[43px]">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder={placeholder}
          className="max-md:w-full bg-transparent lg:max-w-40 text-white h-full placeholder-gray-400 pr-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        />
        <button type="submit" className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400 p-2">
          <SearchNormal1 size={20} />
        </button>
      </div>
      {children}
    </form>
  );
});
