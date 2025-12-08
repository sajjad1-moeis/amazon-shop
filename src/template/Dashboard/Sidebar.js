"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Globe,
  ShoppingCart,
  FileText,
  Heart,
  Headphones,
  MapPin,
  MessageSquare,
  RotateCcw,
  GitCompare,
  User,
  LogOut,
  Wallet,
  Star,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const navigationItems = [
  { id: "dashboard", label: "داشبورد", icon: LayoutDashboard, href: "/dashboard" },
  { id: "currency", label: "خدمات ارزی", icon: Globe, href: "/currency-services" },
  { id: "purchases", label: "خریدهای من", icon: ShoppingCart, href: "/purchases" },
  { id: "orders", label: "سفارش های من", icon: FileText, href: "/orders" },
  { id: "favorites", label: "علاقه مندی ها", icon: Heart, href: "/favorites" },
  { id: "support", label: "تیکت و پشتیبانی", icon: Headphones, href: "/support" },
  { id: "addresses", label: "آدرس های من", icon: MapPin, href: "/addresses" },
  { id: "comments", label: "نظرات و سوالات", icon: MessageSquare, href: "/comments" },
  { id: "returns", label: "درخواست های مرجوعی", icon: RotateCcw, href: "/returns" },
  { id: "comparisons", label: "مقایسه های ذخیره شده", icon: GitCompare, href: "/comparisons" },
  { id: "account", label: "حساب کاربری من", icon: User, href: "/account" },
];

export default function DashboardSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-[#1e3a5f] text-white hover:bg-[#2a4a6f]"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed right-0 top-16 md:top-0 h-[calc(100vh-4rem)] md:h-full w-64 md:w-72 bg-[#1e3a5f] dark:bg-[#1a2f4a] border-l border-[#2a4a6f] dark:border-[#2a4a6f]/50 z-40 transition-transform duration-300",
          "md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}
        dir="rtl"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Wallet & Score Section */}
          <div className="p-4 md:p-6 border-b border-[#2a4a6f] dark:border-[#2a4a6f]/50">
            {/* Wallet */}
            <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-white/5 dark:bg-white/5">
              <Wallet className="h-5 w-5 text-yellow-400 shrink-0" />
              <div className="flex-1 text-right">
                <p className="text-xs text-white/70 mb-1">موجودی کیف پول</p>
                <p className="text-base font-bold text-white">۲,۵۰۰,۰۰۰ تومان</p>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 dark:bg-white/5">
              <Star className="h-5 w-5 text-yellow-400 shrink-0" />
              <div className="flex-1 text-right">
                <p className="text-xs text-white/70 mb-1">امتیاز شما</p>
                <p className="text-base font-bold text-white">۲۴۰ امتیاز</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors",
                    "text-sm font-medium",
                    isActive
                      ? "bg-blue-600 dark:bg-blue-700 text-white"
                      : "text-white/80 hover:bg-white/10 dark:hover:bg-white/5"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[#2a4a6f] dark:border-[#2a4a6f]/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right text-sm font-medium text-white/80 hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span>خروج از حساب کاربری</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  );
}
