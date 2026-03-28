"use client";

import React, { useState } from "react";
import { ArrowDown2, DollarCircle, Chart2, ShoppingBag } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const STORES = [
  { id: "amazon", label: "amazon", href: "/shops/amazon", icon: "/image/amazonLogo.png" },
  { id: "noon", label: "Noon", href: "/shops/noon", icon: "/image/Shops/noonStore.svg" },
  { id: "ikea", label: "IKEA", href: "/shops/ikea", icon: "/image/Shops/ikeaStore.svg" },
  { id: "shein", label: "SHEIN", href: "/shops/shein", icon: "/image/Header/Shein.png", lightLogo: true },
  { id: "currency-services", label: "خدمات ارزی", href: "/currency-services", iconComponent: DollarCircle },
  { id: "currency-rates", label: "نرخ ارز", href: "/currency-rates", iconComponent: Chart2 },
];

export default function ScrapingDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-xl px-3 py-1 gap-0 flex-between max-md:px-1 max-md:text-xs"
        >
          مشاهده همه
          <ArrowDown2 size={16} className={cn("transition-transform mr-1", isOpen && "rotate-180")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[320px] p-4 bg-white dark:bg-dark-box rounded-2xl shadow-xl border border-gray-200 dark:border-dark-stroke relative z-50 max-h-[min(80vh,400px)] overflow-y-auto"
        align="start"
        dir="rtl"
      >
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4 text-right">انتخاب فروشگاه</h3>
        <div className="grid grid-cols-2 gap-3">
          {STORES.map((store) => {
            const IconComponent = store.iconComponent;
            return (
              <Link
                key={store.id}
                href={store.href}
                onClick={() => setIsOpen(false)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-field transition-colors"
              >
                {IconComponent ? (
                  <span className="flex items-center justify-center size-12 text-primary-600 dark:text-primary-400">
                    <IconComponent size={32} />
                  </span>
                ) : (
                  <Image
                    src={store.icon}
                    alt={store.label}
                    width={48}
                    height={48}
                    className={cn("object-contain", store.lightLogo && "brightness-0 dark:brightness-100")}
                  />
                )}
                <span className="text-xs font-medium text-gray-700 dark:text-dark-titre">{store.label}</span>
              </Link>
            );
          })}
        </div>
        <Link
          href="/products"
          onClick={() => setIsOpen(false)}
          className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-100 dark:bg-dark-field hover:bg-gray-200 dark:hover:bg-dark-stroke transition-colors"
        >
          <ShoppingBag size={20} className="text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-dark-titre">همه محصولات</span>
        </Link>
      </PopoverContent>
    </Popover>
  );
}
