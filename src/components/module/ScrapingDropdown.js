"use client";

import React, { useState } from "react";
import { ArrowDown2 } from "iconsax-reactjs";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const STORES = [
  { id: "amazon", label: "amazon", href: "/shops/amazon", icon: "/image/amazonLogo.png" },
  { id: "noon", label: "Noon", href: "/shops/noon", icon: "/image/Shops/noonStore.svg" },
  { id: "ikea", label: "IKEA", href: "/shops/ikea", icon: "/image/Shops/ikeaStore.svg" },
  { id: "ebay", label: "ebay", href: "/shops/ebay", icon: "/image/Header/ebay.png" },
  { id: "ali-express", label: "AliExpress", href: "/shops/ali-express", icon: "/image/Header/aliEx.png" },
  { id: "shein", label: "SHEIN", href: "/shops/shein", icon: "/image/Header/Shein.png", lightLogo: true },
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
          {STORES.map((store) => (
            <Link
              key={store.id}
              href={store.href}
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-field transition-colors"
            >
              <Image
                src={store.icon}
                alt={store.label}
                width={48}
                height={48}
                className={cn("object-contain", store.lightLogo && "brightness-0 dark:brightness-100")}
              />
              <span className="text-xs font-medium text-gray-700 dark:text-dark-titre">{store.label}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/products"
          onClick={() => setIsOpen(false)}
          className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-100 dark:bg-dark-field hover:bg-gray-200 dark:hover:bg-dark-stroke transition-colors"
        >
          <Globe className="size-5 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-dark-titre">همه فروشگاه</span>
        </Link>
      </PopoverContent>
    </Popover>
  );
}
