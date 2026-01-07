"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";

export default function CurrencyServiceCard() {
  return (
    <div className="max-md:hidden p-2.5 dark:bg-dark-box dark:border-dark-stroke text-sm relative bg-white border text-gray-500 border-gray-200 rounded-xl">
      <div className="flex items-center gap-2 mb-1">
        <span className="bg-yellow-400 text-secondary-700 absolute -rotate-[25deg] top-0 -left-2 text-xs p-2 py-1 rounded-md">
          جدید
        </span>
        <div className="flex gap-2">
          <img src="/image/coins.png" className="w-5 h-max" alt="Currency Service" />
          <span className="text-sm text-primary-700 dark:text-dark-title">خدمات ارزی میکرولس پی</span>
        </div>
      </div>

      <p className="text-xs text-gray-500 my-2 dark:text-caption">
        پرداخت‌های ارزی شما با ویزا، مسترکارت و پی‌پال
      </p>

      <Link href="/currency-services">
        <Button variant="ghost" className="text-white px-3 rounded-lg h-8 text-xs bg-primary-700">
          مشاهده
          <ArrowLeft2 />
        </Button>
      </Link>
    </div>
  );
}

