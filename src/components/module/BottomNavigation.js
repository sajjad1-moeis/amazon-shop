"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BitcoinConvert, BoxTick, Home, Profile, ShoppingCart } from "iconsax-reactjs";

const navigationItems = [
  { id: "home", label: "خانه", icon: Home, href: "/" },
  { id: "tracking", label: "پیگیری سفارش", icon: BoxTick, href: "/tracking" },
  { id: "cart", label: "سبد خرید", icon: ShoppingCart, href: "/cart" },
  { id: "login", label: "ورود", icon: Profile, href: "/login" },
  { id: "currency", label: "خدمات ارزی", icon: BitcoinConvert, href: "/currency" },
];

export default function BottomNavigation({ activeItem = "home" }) {
  const [activeId, setActiveId] = useState(activeItem);
  const [offset, setOffset] = useState({ ofsset: 0, width: 0 });

  // ساختن ref برای هر دکمه
  const itemRefs = useRef({});

  useEffect(() => {
    // هنگام لود صفحه، دکمه Active را پیدا کن
    const activeBtn = itemRefs.current[activeId];
    if (activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      setOffset({ ofsset: rect.left, width: rect.width });
    }
  }, [activeId]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-header z-50 md:hidden ">
      <div
        className="absolute top-0 transition-all duration-300 ease-out z-[99999] h-1 bg-[#386BF6]"
        style={{
          left: offset.ofsset + "px",
          width: offset.width,
        }}
      ></div>

      <div className="relative flex items-center justify-around py-2 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              ref={(el) => (itemRefs.current[item.id] = el)}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setOffset({ ofsset: rect.left, width: rect.width });
                setActiveId(item.id);
              }}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1.5 flex-1 py-2 transition-all duration-300 z-10",
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
