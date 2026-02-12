"use client";

import React, { useState } from "react";
import { ArrowDown2, ArrowLeft2 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const SCRAPING_OPTIONS = [
  {
    id: "amazon",
    label: "آمازون",
    href: "/shops/amazon",
    icon: "/image/amazonLogo.png",
  },
  {
    id: "ikea",
    label: "ایکیا",
    href: "/shops/ikea",
    icon: "/image/Shops/ikeaStore.svg",
  },
  {
    id: "noon",
    label: "نون",
    href: "/shops/noon",
    icon: "/image/Shops/noonStore.svg",
  },
  {
    id: "all",
    label: "همه محصولات",
    href: "/products",
    icon: null,
  },
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
        className="w-[200px] p-2 bg-white dark:bg-dark-box rounded-xl shadow-xl border border-gray-200 dark:border-dark-stroke relative z-50"
        align="start"
      >
        <div className="space-y-1">
          {SCRAPING_OPTIONS.map((option) => (
            <Link
              key={option.id}
              href={option.href}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-box transition-colors text-right"
            >
              {option.icon && (
                <Image
                  src={option.icon}
                  alt={option.label}
                  width={option.id === "ebay" ? 30 : option.id === "amazon" ? 24 : 20}
                  height={option.id === "ebay" ? 30 : option.id === "amazon" ? 24 : 20}
                  className="object-contain flex-shrink-0"
                />
              )}
              <span className="text-sm flex-1">{option.label}</span>
              <ArrowLeft2 size={16} className="mr-auto flex-shrink-0" />
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
