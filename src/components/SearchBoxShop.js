import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { SearchNormal1 } from "iconsax-reactjs";

function SearchBoxShop({ type }) {
  return (
    <div
      className="relative rounded-2xl bg-white dark:bg-dark-bg -mt-[10%] md:-mt-[3%] p-4 max-w-4xl mx-auto"
      style={{ boxShadow: "0px 1px 8px 0px #0000001F" }}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mt-2">
          🟩
          <Image src="/image/amazonLogo.png" alt={`عکس آمازون`} width={67} height={17} />
        </div>
        <p className="text-lg text-gray-800 dark:text-dark-text">جستجو در {type}</p>
      </div>

      <div className="bg-gray-50 border border-gray-300 dark:bg-dark-field dark:border-dark-stroke w-full rounded-lg p-2 flex-between mt-4">
        <input
          type="text"
          className="px-2 outline-none bg-transparent placeholder:text-sm dark:placeholder:text-gray-400"
          placeholder="لینک یا نام کالا را وارد کنید ..."
        />
        <Button variant="ghost" className="bg-yellow-500 text-primary-800 flex-flex-between rounded-xl">
          <SearchNormal1 /> جستجو
        </Button>
      </div>
    </div>
  );
}

export default SearchBoxShop;
