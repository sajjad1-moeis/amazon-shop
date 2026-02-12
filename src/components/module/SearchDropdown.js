"use client";

import React, { useState } from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// لیست فروشگاه‌ها
const shops = [
  {
    id: "amazon",
    name: "آمازون",
    placeholder: "جستجو در آمازون امارات و آمریکا",
    image: "/image/amazonLogo.png",
  },
  {
    id: "ebay",
    name: "ایبی",
    placeholder: "جستجو در ایبی",
    image: "/image/Header/ebay.png",
  },
  {
    id: "ali-express",
    name: "علی اکسپرس",
    placeholder: "جستجو در علی اکسپرس",
    image: "/image/Header/aliEx.png",
  },
  {
    id: "shein",
    name: "شین",
    placeholder: "جستجو در شین",
    image: "/image/Header/Shein.png",
  },
  {
    id: "noon",
    name: "نون",
    placeholder: "جستجو در نون",
    image: "/image/Shops/noonStore.svg",
  },
  {
    id: "ikea",
    name: "ایکیا",
    placeholder: "جستجو در ایکیا",
    image: "/image/Shops/ikeaStore.svg",
  },
];

export default function SearchDropdown() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShopId, setSelectedShopId] = useState(shops[0].id);
  const router = useRouter();

  const selectedShop = shops.find((shop) => shop.id === selectedShopId) || shops[0];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex w-full md:w-1/2 relative">
      {/* Shop Select - استفاده از کامپوننت Select از shadcn */}
      <Select value={selectedShopId} onValueChange={setSelectedShopId}>
        <SelectTrigger className="bg-gray-100 w-max gap-4 flex-none dark:bg-[#6F6F6F3D] dark:text-white rounded-l-none rounded-r-lg text-gray-500 text-base  border-0 h-auto py-2 px-2">
          <SelectValue>
            <div className="flex items-center gap-2">
            
              <span className="text-sm">{selectedShop.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {shops.map((shop) => (
            <SelectItem key={shop.id} value={shop.id}>
              <div className="flex items-center gap-3">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  width={24}
                  height={24}
                  className="object-contain shadow-md"
                />
                <span>{shop.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="bg-white dark:bg-[#8989893D] w-full rounded-l-lg p-1 flex-between min-w-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="px-2 outline-none placeholder:max-md:text-xs bg-transparent max-sm:max-w-40 text-base w-full min-w-0"
          placeholder={selectedShop.placeholder}
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 gap-2 flex-between rounded-lg p-2 md:px-3 py-2 flex-shrink-0"
        >
          <SearchNormal1 className="max-lg:size-6" />{" "}
          <span className="max-lg:hidden">جستجو</span>
        </button>
      </div>
    </div>
  );
}
