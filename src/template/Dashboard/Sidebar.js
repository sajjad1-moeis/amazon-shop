"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Wallet,
  ArrowLeft2,
  Cup,
  Element4,
  BitcoinConvert,
  Bag,
  Heart,
  Headphone,
  DocumentText,
  Eye,
  Profile,
  ArrowDown2,
  LogoutCurve,
  CloseCircle,
  Lock,
  SearchNormal1,
} from "iconsax-reactjs";
import SwitchButton from "@/components/SwitchButton";

const items = [
  { id: "dashboard", label: "داشبورد", href: "/dashboard", icon: Element4 },

  {
    id: "currency",
    label: "خدمات ارزی",
    href: "/dashboard/currency-services",
    icon: BitcoinConvert,
  },

  {
    id: "orders",
    label: "خرید و سفارش‌ها",
    icon: Bag,
    children: [
      { label: "خریدهای من", href: "/dashboard/purchases" },
      { label: "سفارش‌های من", href: "/dashboard/orders" },
      { label: "فاکتورها", href: "/dashboard/invoices" },
      { label: "درخواست‌های مرجوعی", href: "/dashboard/return-requests" },
      { label: "خرید اختصاصی از آمازون", href: "/dashboard/exclusive-amazon" },
    ],
  },

  { id: "favorites", label: "علاقه‌مندی‌ها", href: "/dashboard/favorites", icon: Heart },
  { id: "price-lock", label: "قفل قیمت", href: "/dashboard/price-lock", icon: Lock },
  { id: "support", label: "تیکت و پشتیبانی", href: "/dashboard/support", icon: Headphone },
  { id: "comparisons", label: "مقایسه‌های ذخیره شده", href: "/dashboard/comparisons", icon: DocumentText },
  { id: "recent", label: "بازدیدهای اخیر", href: "/dashboard/recent-views", icon: Eye },

  {
    id: "account",
    label: "حساب کاربری من",
    icon: Profile,
    children: [
      { label: "پروفایل کاربری", href: "/dashboard/account/profile" },
      { label: "آدرس‌های من", href: "/dashboard/account/addresses" },
      { label: "نظرات و سوالات", href: "/dashboard/account/comments" },
      { label: "دعوت دوستان", href: "/dashboard/account/invite" },
      { label: "مرکز پیامک ها", href: "/dashboard/account/messages" },
    ],
  },
];

// Sidebar Content Component
function SidebarContent({ onLinkClick }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState([]);

  // Auto-expand if a child is active
  useEffect(() => {
    items.forEach((item) => {
      if (item.children) {
        const activeChild = item.children.find((c) => c.href === pathname);
        if (activeChild && !expanded.includes(item.id)) {
          setExpanded((prev) => [...prev, item.id]);
        }
      }
    });
  }, [pathname]);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const isActive = (item) => {
    if (item.children) return item.children.some((c) => pathname === c.href);
    return pathname === item.href;
  };

  const handleLinkClick = () => {
    if (onLinkClick) onLinkClick();
  };

  return (
    <div
      dir="rtl"
      className=" lg:w-60 bg-white dark:bg-dark-box lg:border-2 lg:sticky top-0 border-primary-200 dark:border-dark-stroke p-2 md:p-3 rounded-2xl max-lg:h-full overflow-y-auto"
    >
      <Link href={"/dashboard/wallet"} onClick={handleLinkClick}>
        {/* Wallet Card */}
        <div className="bg-[#DCE1FC] dark:bg-dark-primary/35 p-2 rounded-xl mb-3 border-b-2 dark:border-primary-200/15 border-primary-200">
          <div className="flex justify-between items-center text-[#3F51B5] dark:text-dark-title pb-2">
            <div className="flex gap-2 items-center">
              <Wallet size={20} />
              <span className="text-sm">موجودی کیف‌پول</span>
            </div>
            <ArrowLeft2 size={18} />
          </div>
          <div className="bg-[#B6BCDF66] dark:bg-primary-200/15  dark:text-dark-titre p-2 rounded-lg font-medium">
            ۲,۵۰۰,۰۰۰ تومان
          </div>
        </div>
      </Link>

      {/* Score Card */}
      <div className="bg-[#FFF1D8] dark:bg-[#EEA8263D] p-2 rounded-xl mb-6 border-b-2 border-[#EEA82699] dark:border-[#EEA82629]">
        <div className="flex justify-between items-center pb-1">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] bg-[#EEA826] text-white px-1 rounded">طلایی</span>
              <Cup size={20} color="#EEA826" variant="Bold" />
            </div>
            <span className="text-sm text-[#C27803]">امتیاز شما</span>
          </div>
          <ArrowLeft2 size={18} color="#C27803" />
        </div>
        <div className="bg-[#FFE9C7] dark:bg-[#EEA82629] dark:text-white/80 p-2 rounded-lg text-[#C27803]">
          ۲۴۰ امتیاز
        </div>
      </div>

      <div className="my-4 border-b dark:border-dark-stroke border-gray-200" />

      {/* Navigation */}
      <nav className="space-y-2">
        {items.map((item) => {
          const Active = isActive(item);
          const Icon = item.icon;

          if (!item.children)
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  Active
                    ? "text-[#3F51B5] dark:text-dark-title bg-[#E3E7FF] dark:bg-[#E3E5F21F] font-medium"
                    : "text-gray-700 dark:text-dark-titre hover:bg-gray-50 dark:hover:bg-dark-field"
                )}
              >
                <Icon size={22} variant={Active ? "Bold" : "Outline"} />
                <span>{item.label}</span>
              </Link>
            );

          return (
            <div key={item.id}>
              {/* Parent */}
              <button
                onClick={() => toggleExpand(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 rounded-lg transition-all justify-between",
                  Active
                    ? "text-[#3F51B5] dark:text-dark-title bg-[#E3E7FF] dark:bg-[#E3E5F21F] font-medium"
                    : "text-gray-700 dark:text-dark-titre hover:bg-gray-50 dark:hover:bg-dark-field"
                )}
              >
                <div className="flex gap-2">
                  <Icon size={22} variant={Active ? "Bold" : "Outline"} />
                  <span className="flex-1">{item.label}</span>
                </div>

                <ArrowDown2
                  size={16}
                  className={cn("transition-transform", expanded.includes(item.id) && "rotate-180")}
                />
              </button>

              {expanded.includes(item.id) && (
                <div className="pl-8 mt-1 space-y-1">
                  {item.children.map((child) => {
                    const CActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                          CActive
                            ? "text-[#3F51B5] dark:text-dark-title bg-[#E3E7FF] dark:bg-[#E3E5F21F] font-medium"
                            : "text-gray-600 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-field"
                        )}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="mt-8 w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-dark-titre hover:bg-gray-50 dark:hover:bg-dark-field rounded-lg">
        <LogoutCurve size={22} />
        خروج از حساب کاربری
      </button>
    </div>
  );
}

export default function DashboardSidebar({ isMobileOpen, setIsMobileOpen }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:static">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        dir="rtl"
        className={cn(
          "fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-dark-box border-l-2 border-primary-200 dark:border-dark-stroke z-50 lg:hidden transition-transform duration-300 ease-in-out shadow-xl",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="relative h-full overflow-y-auto">
          <div className="flex-between px-2 mt-1">
            <SwitchButton clssBtn={"max-sm:text-gray-800"} />
            <button onClick={() => setIsMobileOpen(false)}>
              <CloseCircle />
            </button>
          </div>

          <div className="flex-1 my-2  flex items-center justify-center px-2">
            <div className="bg-gray-100 dark:bg-[#8989893D] dark:border-dark-stroke dark:border w-full rounded-lg p-1 flex-between">
              <input
                type="text"
                className="px-2 outline-none placeholder:max-md:text-xs bg-transparent"
                placeholder="جستجو در داشبورد"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 py-1.5 text-primary-800 gap-2 flex-between rounded-lg p-2 ">
                <SearchNormal1 className="max-lg:size-6" /> <span className="max-lg:hidden">جستجو</span>
              </button>
            </div>
          </div>
          <SidebarContent onLinkClick={() => setIsMobileOpen(false)} />
        </div>
      </aside>
    </>
  );
}
