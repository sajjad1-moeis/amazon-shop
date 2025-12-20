"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LanguagesIcon, MenuIcon } from "lucide-react";
import { ArrowDown2, ArrowLeft2, BitcoinConvert, DiscountShape } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import SwitchButton from "../SwitchButton";
import DiscountAmazonButton from "../DiscountAmazonButton";

export default function TopBar() {
  return (
    <div className="bg-primary-500 dark:bg-dark-header">
      <div className="bg-primary-800/20 dark:bg-white/5">
        <div className="w-full  xl:container max-xl:px-4  py-3 px-4 flex items-center justify-between text-white">
          {/* Center Section */}
          <div className="flex items-center gap-1 lg:gap-3 ">
            <Link href={"/categories"} className="max-xl:hidden">
              <div className="flex items-center gap-3">
                <Button variant="gray" className="flex items-center md:gap-2 gap-0 rounded-xl px-3 py-1">
                  <MenuIcon size={18} variant="Bulk" />
                  <span className="text-sm">دسته بندی</span>
                  <ArrowDown2 size={18} />
                </Button>
              </div>
            </Link>
            <Button
              variant="gray"
              size="sm"
              className="relative rounded-xl px-3 py-1 flex items-center md:gap-2 max-md:hidden"
            >
              <BitcoinConvert size={16} variant="Bulk" />
              <span className="text-sm">خدمات ارزی</span>
              <span className="absolute -top-1 -left-3 -rotate-[35deg] bg-yellow-300 text-black text-xs px-1 py-0.5 rounded">
                جدید
              </span>
            </Button>
            <Link href={"/shops/ebay"}>
              <Button
                variant="gray"
                size="sm"
                className="rounded-xl px-3 py-1  max-md:flex-col-reverse max-md:h-full flex items-center md:gap-2 gap-0 "
              >
                <span className="text-sm ">ایبی</span>
                <Image src="/image/Header/ebay.png" width={50} height={50} alt="ebay" />
              </Button>
            </Link>
            <Link href={"/shops/ali-express"}>
              <Button
                variant="gray"
                size="sm"
                className="rounded-xl px-3 py-1 max-md:flex-col-reverse max-md:h-full flex items-center md:gap-2 gap-0"
              >
                <span className="text-sm">علی اکسپرس</span>
                <Image src="/image/Header/aliEx.png" width={83} height={20} alt="aliEx" />
              </Button>
            </Link>

            <Link href={"/shops/shein"}>
              <Button
                variant="gray"
                size="sm"
                className="rounded-xl px-3 py-1 max-md:flex-col-reverse max-md:h-full flex items-center md:gap-2 gap-0"
              >
                <span className="text-sm">شین</span>
                <Image src="/image/Header/Shein.png" alt="Shein" width={83} height={20} />
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="rounded-xl  px-3 py-1 flex-between max-md:px-0 max-md:text-xs">
              مشاهده همه
              <ArrowLeft2 />
            </Button>
          </div>
          {/* Left Section */}
          <div className="max-lg:hidden">
            <div className="flex items-center xl:gap-3">
              <DiscountAmazonButton />
              <SwitchButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
