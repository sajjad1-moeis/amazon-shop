"use client";

import React, { useState } from "react";
import { DocumentText } from "iconsax-reactjs";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const blogPages = [
  { title: "صفحه اصلی", href: "/" },
  { title: "وبلاگ‌ها", href: "/blogs" },
  { title: "محصولات", href: "/products" },
  { title: "دسته‌بندی‌ها", href: "/categories" },
  { title: "داشبورد", href: "/dashboard" },
  { title: "گیفت کارت", href: "/gift-cart" },
  { title: "خدمات ارزی", href: "/currency-services" },
  { title: "درباره ما", href: "/about-us" },
  { title: "ارتباط با ما", href: "/contact-us" },
  { title: "سوالات متداول", href: "/faqs" },
  { title: "راهنما", href: "/guide" },
  { title: "نقشه سایت", href: "/site-map" },
];

export default function DrawerMobile() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-xl px-3 py-1 text-white lg:hidden hover:bg-white/10"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[400px] dark:bg-dark-box" dir="rtl">
        <SheetHeader className="border-b border-gray-200 dark:border-dark-stroke pb-4">
          <SheetTitle className="text-lg font-semibold text-gray-900 dark:text-dark-titre text-right flex items-center gap-2">
            <DocumentText size={20} />
            صفحات سایت
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto p-0 mt-4">
          <div className="space-y-2">
            {blogPages.map((page, index) => (
              <Link
                key={index}
                href={page.href}
                onClick={() => setSheetOpen(false)}
                className="block w-full p-3 rounded-lg bg-white dark:bg-dark-field border border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-box transition-colors"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">{page.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
