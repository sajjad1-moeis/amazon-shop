"use client";

import React, { useState } from "react";
import { Logout, ArrowDown2, Wallet3, ArrowLeft2, Cup } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { navigationItems } from "@/data";

export default function DashboardSidebar({ isMobileOpen = false, onMobileClose }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [openItems, setOpenItems] = useState([]);

  const handleLogout = async () => {
    await logout();
  };

  const toggleItem = (itemId) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative right-0 top-16 md:top-0 h-[calc(100vh-4rem)] md:h-full w-64 md:w-56 lg:w-[238px] z-40 transition-transform duration-300",
          "md:translate-x-0 md:block",
          isMobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}
        dir="rtl"
      >
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl border-2 border-primary-200 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Wallet & Score Section */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            {/* Wallet */}
            <Link href="/dashboard/wallet" className="block">
              <div className="gap-3 mb-4 p-2 rounded-xl bg-[#DCE1FC] border-b-2 border-primary-200 dark:bg-gray-700/50 cursor-pointer hover:bg-[#C8D0F5] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-primary-600">
                    <Wallet3 variant="Bold" size={20} />
                    <p className="text-sm dark:text-gray-400 mb-1">موجودی کیف پول</p>
                  </div>
                  <ArrowLeft2 size={20} />
                </div>
                <div className="mt-1 bg-[#B6BCDF66] p-2 rounded">
                  <p className="text-base font-bold text-gray-900 dark:text-white">۲,۵۰۰,۰۰۰ تومان</p>
                </div>
              </div>
            </Link>

            {/* Score */}
            <div className="gap-3 mb-4 p-2 rounded-xl bg-[#EEA8261A] border-b-2 border-[#EEA82699] dark:bg-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-warning-500">
                  <div className="-mt-4">
                    <div className="bg-warning-500 text-white rounded-full text-[10px] py-px px-1">طلایی</div>
                    <Cup variant="Bold" size={20} className="mx-auto" />
                  </div>
                  <p className="text-sm dark:text-gray-400 mb-1">امتیاز شما</p>
                </div>
                <ArrowLeft2 size={20} />
              </div>
              <div className="mt-1 bg-[#EEA82629] p-2 rounded">
                <p className="text-base font-bold text-[#C27803] dark:text-white">240 امتیاز</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto min-h-0">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const isOpen = openItems.includes(item.id);

              return (
                <div key={item.id}>
                  {item.hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={cn(
                          "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-right transition-colors",
                          "text-sm font-medium",
                          isActive
                            ? "bg-[#E3E5F2] dark:bg-blue-900/30 text-primary-500 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} variant={isActive ? "Bold" : "Outline"} />
                          <span>{item.label}</span>
                        </div>
                        <ArrowDown2
                          size={16}
                          className={cn("transition-transform text-gray-400", isOpen ? "rotate-180" : "")}
                        />
                      </button>
                      {/* Children Menu */}
                      {isOpen && item.children && item.children.length > 0 && (
                        <div className="mr-8 mt-1 space-y-1">
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href || pathname.startsWith(child.href + "/");
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={onMobileClose}
                                className={cn(
                                  "block px-4 py-2 rounded-lg text-right text-sm transition-colors",
                                  isChildActive
                                    ? "bg-[#E3E5F2] dark:bg-blue-900/30 text-primary-500 dark:text-blue-400 font-medium"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                )}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onMobileClose}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors",
                        "text-sm font-medium",
                        isActive
                          ? "bg-[#E3E5F2] dark:bg-blue-900/30 text-primary-500 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      )}
                    >
                      <Icon size={20} variant={isActive ? "Bold" : "Outline"} />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <Logout size={20} variant="Outline" />
              <span>خروج از حساب کاربری</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onMobileClose} />}
    </>
  );
}
