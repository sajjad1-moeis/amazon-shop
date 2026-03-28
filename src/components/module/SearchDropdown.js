"use client";

import React, { useState } from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Select, SelectContent, SelectItemRadio, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

// لیست فروشگاه‌ها — متن وسط جستجوگر با لوگو به سبک مالتینا (آیکون وسط متن).
// نکته برای فیگما (آقای اشرفی): این بخش طبق سبک مالتینا طراحی شود؛ آیکون‌ها بزرگ و شکیل باشند.
const shops = [
  { id: "microless", name: "میکرولس", placeholder: "جستجو در محصولات سایت", image: "/image/logo.png", lightLogo: true },
  { id: "amazon", name: "آمازون", placeholder: "جستجو در آمازون امارات و آمریکا", image: "/image/amazonLogo.png" },
  { id: "ebay", name: "ایبی", placeholder: "جستجو در ایبی", image: "/image/Header/ebay.png" },
  { id: "ali-express", name: "علی اکسپرس", placeholder: "جستجو در علی اکسپرس", image: "/image/Header/aliEx.png" },
  { id: "shein", name: "شین", placeholder: "جستجو در شین", image: "/image/Header/Shein.png", lightLogo: true },
  { id: "noon", name: "نون", placeholder: "جستجو در نون", image: "/image/Shops/noonStore.svg" },
  { id: "ikea", name: "ایکیا", placeholder: "جستجو در ایکیا", image: "/image/Shops/ikeaStore.svg" },
];

const PLACEHOLDER_PREFIX = "جستجو یا وارد کردن لینک کالای : ";

export default function SearchDropdown({ variant }) {
  const isServices = variant === "services";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShopId, setSelectedShopId] = useState(shops[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const selectedShop = shops.find((shop) => shop.id === selectedShopId) || shops[0];

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    const params = new URLSearchParams({ search: q });
    if (selectedShopId === "amazon") params.set("shop", "uae");
    else if (selectedShopId !== "microless") params.set("shop", selectedShopId);
    router.push(`/products?${params.toString()}`);
  };

  const handleSelectShop = (id) => {
    setSelectedShopId(id);
    setDrawerOpen(false);
  };

  // باکس سرچ فیگما: فیلد آبی روشن + دکمه زرد جستجو (بدون انتخاب فروشگاه). در RTL: دکمه راست، اینپوت چپ.
  if (isServices) {
    return (
      <div className="flex w-full   p-1  items-stretch rounded-xl overflow-hidden bg-white/25 border border-[#D1D5DB7A]">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-yellow-500 hover:bg-yellow-600 text-white gap-2 flex items-center justify-center rounded-xl p-3 flex-shrink-0 h-full font-medium order-2"
        >
          <SearchNormal1 className="size-5" />
          <span className="text-sm">جستجو</span>
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="جستجو ..."
          className="flex-1 min-w-0 px-4  bg-transparent text-white placeholder:text-white/70 outline-none text-base order-1 rounded-e-xl"
        />
      </div>
    );
  }

  return (
    <div className="flex w-full md:w-1/2 relative h-10 md:h-11 items-stretch">
      {/* دسکتاپ: منوی اصلی دست نخورده (Select) */}
      <div className="hidden md:flex md:items-stretch">
        <Select value={selectedShopId} onValueChange={setSelectedShopId}>
          <SelectTrigger className="bg-gray-100 w-max gap-2 flex-none dark:bg-[#6F6F6F3D] rounded-l-none rounded-r-lg text-gray-600 dark:text-gray-300 text-base border-0 h-full min-h-0 py-0 px-3">
            <SelectValue>
              <div className="flex items-center gap-2">
              
                <span className="text-sm font-medium">{selectedShop.name}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            className="w-44 bg-white dark:bg-dark-box rounded-2xl border border-gray-200 p-0 shadow-xl dark:border-dark-stroke max-h-[min(20rem,var(--radix-select-content-available-height,100dvh))] overflow-y-auto"
            position="popper"
            sideOffset={4}
          >
            {shops.map((shop) => (
              <SelectItemRadio key={shop.id} value={shop.id}>
                <div className="flex items-center gap-3 w-full">
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    width={54}
                    height={32}
                    className={`object-contain shrink-0 ${shop.lightLogo ? "brightness-0 dark:brightness-100" : ""}`}
                  />
                </div>
              </SelectItemRadio>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* موبایل: دراور از پایین با عکس و متن */}
      <div className="md:hidden flex items-stretch">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="bg-gray-100 !w-auto gap-2 pe-8 flex-none dark:bg-[#6F6F6F3D] rounded-l-none rounded-r-lg text-gray-600 dark:text-gray-300 text-base border-0 h-full min-h-0 py-0 px-3"
            >
             
              <span className="text-sm font-medium">{selectedShop.name}</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[70vh] dark:bg-dark-box" dir="rtl">
            <DrawerHeader className="border-b border-gray-200 dark:border-dark-stroke pb-4">
              <DrawerTitle className="text-lg font-medium text-gray-900 dark:text-dark-titre text-right">
                انتخاب فروشگاه
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4 overflow-y-auto">
              {shops.map((shop) => (
                <button
                  key={shop.id}
                  type="button"
                  onClick={() => handleSelectShop(shop.id)}
                  className={`flex items-center gap-3 w-full py-3 px-3 rounded-xl text-right transition-colors ${
                    selectedShopId === shop.id
                      ? "bg-gray-100 dark:bg-gray-700/50"
                      : "hover:bg-gray-50 dark:hover:bg-dark-field"
                  }`}
                >
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    width={40}
                    height={40}
                    className={`object-contain shrink-0 ${shop.lightLogo ? "brightness-0 dark:brightness-100" : ""}`}
                  />
                  <span className="flex-1 font-medium text-gray-800 dark:text-white">{shop.name}</span>
                  {selectedShopId === shop.id && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500 dark:bg-primary-400">
                      <span className="text-white text-xs">✓</span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="bg-white dark:bg-[#8989893D] w-full rounded-l-lg p-1 flex-between min-w-0 h-full relative">
        <div className="flex-1 min-w-0 h-full relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="px-2 outline-none bg-transparent max-sm:max-w-40 text-base w-full min-w-0 h-full text-gray-800 dark:text-white placeholder:text-transparent"
            placeholder=" "
            aria-label={selectedShop.placeholder}
          />
          {/* موبایل: فقط «جستجو در» + لوگو */}
          {!searchQuery.trim() && (
            <div
              className="absolute inset-y-0 right-0 flex items-center justify-center gap-1.5 pointer-events-none px-2 md:hidden"
              dir="rtl"
              aria-hidden
            >
              <span className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">جستجو در</span>
              <Image
                src={selectedShop.image}
                alt=""
                width={50}
                height={18}
                className={`object-contain shrink-0 ${selectedShop.lightLogo ? "brightness-0 dark:brightness-100" : ""}`}
              />
            </div>
          )}
          {/* دسکتاپ: متن کامل + آیکون وسط متن به سبک مالتینا + لوگو و نام فروشگاه */}
          {!searchQuery.trim() && (
            <div
              className="absolute inset-y-0 right-0 hidden md:flex items-center justify-center gap-2 pointer-events-none px-2"
              dir="rtl"
              aria-hidden
            >
              <span className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
                {PLACEHOLDER_PREFIX}
              </span>
          
                <Image
                  src={selectedShop.image}
                  alt=""
                  width={40}
                  height={20}
                  className={`object-contain ${selectedShop.lightLogo ? "brightness-0 dark:brightness-100" : ""}`}
                />
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 gap-2 flex-between rounded-lg p-2 md:px-3 flex-shrink-0 h-full"
        >
          <SearchNormal1 className="max-lg:size-6" /> <span className="max-lg:hidden">جستجو</span>
        </button>
      </div>
    </div>
  );
}
