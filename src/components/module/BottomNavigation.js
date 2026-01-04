"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BitcoinConvert, BoxTick, Home, Profile, ShoppingCart } from "iconsax-reactjs";
import Link from "next/link";

const navigationItems = [
  { id: "home", label: "خانه", icon: Home, href: "/" },
  { id: "dashboard", label: "داشبورد", icon: Profile, href: "/dashboard" },
  { id: "cart", label: "سبد خرید", icon: ShoppingCart, href: "/cart" },
  { id: "tracking", label: "پیگیری سفارش", icon: BoxTick, href: "/tracking" },
  { id: "currency", label: "خدمات ارزی", icon: BitcoinConvert, href: "/currency-services" },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const [offset, setOffset] = useState({ left: 0, width: 0 });
  const itemRefs = useRef({});

  // پیدا کردن آیتم فعال بر اساس pathname
  const activeItem = navigationItems.find((item) => {
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(item.href);
  });

  const activeId = activeItem?.id || "home";

  useEffect(() => {
    // هنگام لود صفحه، دکمه Active را پیدا کن
    const activeBtn = itemRefs.current[activeId];
    if (activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      setOffset({ left: rect.left, width: rect.width });
    }
  }, [activeId, pathname]);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-header z-50 md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingLeft: "env(safe-area-inset-left, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      <div
        className="absolute top-0 transition-all duration-300 ease-out z-[99999] h-1 bg-[#386BF6]"
        style={{ left: offset.left + "px", width: offset.width }}
      ></div>

      <div className="relative flex items-center justify-around py-2 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;

          return (
            <Link
              key={item.id}
              href={item.href}
              ref={(el) => (itemRefs.current[item.id] = el)}
              className={cn(
                "relative flex flex-col text-center items-center justify-center gap-1.5 flex-1 py-2 transition-all duration-300 z-10",
                isActive && "text-blue-600"
              )}
            >
              <Icon
                className={cn("transition-all duration-300", isActive ? "text-blue-600" : "text-gray-500")}
                variant={isActive ? "Bold" : "Outline"}
              />

              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isActive ? "text-blue-600" : "text-gray-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
