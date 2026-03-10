"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MenuIcon, Search } from "lucide-react";
import { ArrowDown2 } from "iconsax-reactjs";
import BtnShowLoginModal from "@/components/BtnShowLoginModal";
import SwitchButton from "@/components/SwitchButton";
import SearchDropdown from "./SearchDropdown";
import ServicesMegaMenu from "./ServicesMegaMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export default function ServicesHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const servicesCategoryTrigger = (
    <Button
      variant="gray"
      className="flex items-center gap-2 rounded-xl border border-white/40 px-3 py-0 h-9 text-white hover:bg-white/10 max-md:w-full max-md:justify-between"
    >
      <MenuIcon size={18} />
      <span className="text-sm">دسته بندی خدمات</span>
      <ArrowDown2 size={18} />
    </Button>
  );

  return (
    <header className="w-full">
      {/* Top bar: موبایل = دو دکمه (کاربر، جستجو) + لوگو | دسکتاپ = لوگو + باکس جستجو + کاربر */}
      <div
        className="bg-primary-500 dark:bg-dark-header pt-2 lg:pt-5 pb-2"
        style={{ boxShadow: "0px 0px 0px 1px #FFFFFF40" }}
      >
        <div className="flex-between max-2xl:px-3 xl:container gap-2 md:gap-6 w-full">
          {/* لوگو - سمت راست در RTL */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center min-h-[32px] sm:min-h-[36px]"
            aria-label="میکرولس پی"
          >
            <Image
              src="/image/Header/serviceLogo.png"
              alt="میکرولس پی"
              width={200}
              height={64}
              sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 160px, 180px"
              className="h-7 w-auto max-w-[100px] sm:h-8 sm:max-w-[120px] md:h-9 md:max-w-[150px] lg:h-10 lg:max-w-[180px] xl:h-11 xl:max-w-[300px] object-contain object-center"
            />
          </Link>
          {/* دسکتاپ: باکس جستجو وسط */}
          <div className="flex-1  w-full hidden md:block min-w-0">
            <SearchDropdown variant="services" />
          </div>
          {/* موبایل: دو دکمه مربعی (کاربر، جستجو) سمت چپ | دسکتاپ: فقط دکمه کاربر */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="p-3 rounded-lg border-2 border-white dark:border-[#898989] text-white dark:text-[#898989] hover:opacity-90 transition-opacity"
                    aria-label="جستجو"
                  >
                    <Search size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="top" className="pt-6 bg-primary-500 dark:bg-dark-header border-white/20" dir="rtl">
                  <SheetHeader className="mb-4">
                    <SheetTitle className="text-white text-right">جستجو</SheetTitle>
                  </SheetHeader>
                  <SearchDropdown variant="services" />
                </SheetContent>
              </Sheet>
            </div>
            <BtnShowLoginModal />
          </div>
        </div>
      </div>

      {/* Bottom bar: سوییچ تم + دسته بندی خدمات */}

      <div className="bg-primary-500 dark:bg-dark-header">
        <div className="bg-primary-800/20 dark:bg-white/5">
          <div className="w-full xl:container max-md:px-2 py-3 px-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-1 lg:gap-3 flex-1 min-w-0">
              {/* موبایل: دکمه دسته‌بندی با Sheet تا منو درست نمایش داده بشه */}
              <div className="md:hidden w-full">
                <Sheet open={categoryOpen} onOpenChange={setCategoryOpen}>
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-xl border border-white/40 px-3 py-2 h-9 text-white hover:bg-white/10  justify-between"
                    >
                      <MenuIcon size={18} />
                      <span className="text-sm">دسته بندی خدمات</span>
                      <ArrowDown2 size={18} />
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="h-[85vh] rounded-t-2xl p-0 overflow-hidden flex flex-col"
                    dir="rtl"
                  >
                    <SheetHeader className="px-4 pt-4 pb-2 border-b border-gray-100 dark:border-dark-stroke shrink-0">
                      <SheetTitle className="text-right">دسته بندی خدمات</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto">
                      <ServicesMegaMenu />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              {/* دسکتاپ: دراپ‌داون معمولی */}
              <div className="hidden md:block">
                <NavigationMenu dir="rtl" className="relative z-[100]">
                  <NavigationMenuList className="gap-0">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent h-auto p-0 border-0">
                        {servicesCategoryTrigger}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className="!w-[88vw] max-w-4xl !right-0 !top-full !mt-2 !p-0 !h-auto !z-50 rounded-xl shadow-xl border border-gray-200 dark:border-dark-stroke bg-white dark:bg-dark-box overflow-hidden"
                        dir="rtl"
                      >
                        <ServicesMegaMenu />
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            <div className="flex items-center shrink-0">
              <SwitchButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
