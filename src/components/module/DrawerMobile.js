"use client";

import React, { useState } from "react";
import { DocumentText } from "iconsax-reactjs";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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

const shopLinks = [
  { title: "خرید از آمازون", href: "/shops/amazon" },
  { title: "خرید از ایبی", href: "/shops/ebay" },
  { title: "خرید از علی اکسپرس", href: "/shops/ali-express" },
  { title: "خرید از شین", href: "/shops/shein" },
  { title: "خرید از نون", href: "/shops/noon" },
  { title: "خرید از ایکیا", href: "/shops/ikea" },
];

export default function DrawerMobile() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-xl px-3 py-1 text-white lg:hidden hover:bg-white/10 "
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[320px] sm:w-[400px] dark:bg-dark-box h-screen overflow-auto px-2"
        style={{
          height: "100vh",
          height: "-webkit-fill-available",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        dir="rtl"
      >
        <SheetHeader className="border-b border-gray-200 dark:border-dark-stroke pb-4">
          <SheetTitle className="text-lg font-semibold text-gray-900 dark:text-dark-titre text-right flex items-center gap-2">
            <DocumentText size={20} />
            صفحات سایت
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto p-0 mt-4">
          <div className="space-y-2 px-4">
            {/* Regular Pages */}
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

            {/* Shops Accordion */}
            <Accordion type="single" collapsible defaultValue="shops" className="w-full mt-2">
              <AccordionItem
                value="shops"
                className="border border-gray-200 dark:border-dark-stroke rounded-lg hover:bg-gray-50 dark:hover:bg-dark-box transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-3 px-3 bg-white dark:bg-dark-field rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">صفحات فروشگاه</span>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-1">
                    {shopLinks.map((shop, index) => (
                      <Link
                        key={index}
                        href={shop.href}
                        onClick={() => setSheetOpen(false)}
                        className="block w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-box transition-colors"
                      >
                        <span className="text-sm text-primary-600 dark:text-primary-400">{shop.title}</span>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
