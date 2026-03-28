"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  DocumentText,
  DollarCircle,
  Chart2,
  Home2,
  Wallet3,
  ShoppingBag,
  TicketDiscount,
  Category2,
  Element4,
  Gift,
  Message,
  MessageText,
  MessageQuestion,
  Book1,
  Location,
  ShoppingCart,
} from "iconsax-reactjs";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "صفحه اصلی", href: "/", icon: Home2 },
  { title: "وبلاگ‌ها", href: "/blogs", icon: DocumentText },
  { title: "پی‌پال", href: "/paypal-cashout", icon: Wallet3 },
  { title: "محصولات", href: "/products", icon: ShoppingBag },
  { title: "تخفیف‌های آمازون", href: "/outlet", icon: TicketDiscount },
  { title: "دسته‌بندی‌ها", href: "/categories", icon: Category2, openCategoriesSheet: true },
  { title: "داشبورد", href: "/dashboard", icon: Element4 },
  { title: "گیفت کارت", href: "/gift-cart", icon: Gift },
  { title: "خدمات ارزی", href: "/currency-services", icon: DollarCircle },
  { title: "نرخ ارز", href: "/currency-rates", icon: Chart2 },
  { title: "درباره ما", href: "/about-us", icon: Message },
  { title: "ارتباط با ما", href: "/contact-us", icon: MessageText },
  { title: "سوالات متداول", href: "/faqs", icon: MessageQuestion },
  { title: "راهنما", href: "/guide", icon: Book1 },
  { title: "نقشه سایت", href: "/site-map", icon: Location },
  { title: "خرید از آمازون", href: "/shops/amazon", icon: ShoppingCart },
  { title: "خرید اختصاصی آمازون", href: "/dashboard/exclusive-amazon", icon: ShoppingCart },
  { title: "خرید از ایبی", href: "/shops/ebay", icon: ShoppingCart },
  { title: "خرید از علی اکسپرس", href: "/shops/ali-express", icon: ShoppingCart },
  { title: "خرید از شین", href: "/shops/shein", icon: ShoppingCart },
  { title: "خرید از نون", href: "/shops/noon", icon: ShoppingCart },
  { title: "خرید از ایکیا", href: "/shops/ikea", icon: ShoppingCart },
];

export default function DrawerMobile({ onOpenCategoriesMega }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleItemClick = (item) => {
    if (item.openCategoriesSheet) {
      setSheetOpen(false);
      onOpenCategoriesMega?.();
      return;
    }
    setSheetOpen(false);
  };

  return (
    <>
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-xl px-3 py-1 text-white lg:hidden hover:bg-white/10"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[320px] bg-white dark:bg-dark-box border-r border-gray-200 dark:border-dark-stroke shadow-xl overflow-hidden flex flex-col p-0"
        style={{
          height: "100dvh",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        dir="rtl"
      >
        <SheetHeader className="shrink-0 px-5 pt-5 pb-4 border-b border-gray-100 dark:border-dark-stroke">
          <SheetTitle className="text-base font-semibold text-gray-800 dark:text-dark-titre text-right flex items-center gap-2">
            <DocumentText size={20} className="text-primary-500" />
            منوی سایت
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <ul className="space-y-0.5">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              const isCategories = !!item.openCategoriesSheet;
              return (
                <li key={item.href + (isCategories ? "-cat" : "")}>
                  {isCategories ? (
                    <button
                      type="button"
                      onClick={() => handleItemClick(item)}
                      className={cn(
                        "flex items-center gap-3 w-full py-2.5 px-3 rounded-lg text-sm font-medium transition-colors text-right",
                        "text-gray-700 dark:text-dark-titre hover:bg-gray-100 dark:hover:bg-dark-field"
                      )}
                    >
                      <Icon size={20} className="shrink-0 text-gray-500 dark:text-gray-400" />
                      <span>{item.title}</span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        "flex items-center gap-3 w-full py-2.5 px-3 rounded-lg text-sm font-medium transition-colors",
                        active
                          ? "bg-primary-500/15 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300"
                          : "text-gray-700 dark:text-dark-titre hover:bg-gray-100 dark:hover:bg-dark-field"
                      )}
                    >
                      <Icon size={20} className={cn("shrink-0", active ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400")} />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
    </>
  );
}
