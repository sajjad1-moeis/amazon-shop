"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { Notification, SearchNormal1, User, Home2 } from "iconsax-reactjs";
import SwitchButton from "@/components/SwitchButton";
import { notificationService } from "@/services/notification/notificationService";
import { unwrapApiData } from "@/services/api/client";

export default function DashboardHeader({ onMenuClick }) {
  const { user } = useAuth();
  const userName = user?.fullName || user?.firstName || "کاربر";
  const userId = user?.id ?? user?.userId;
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (userId == null) return;
    notificationService
      .getUnreadCount(userId)
      .then((res) => {
        const data = unwrapApiData(res);
        setUnreadCount(
          typeof data === "number" ? data : (data?.unreadCount ?? data?.count ?? 0)
        );
      })
      .catch(() => setUnreadCount(0));
  }, [userId]);

  return (
    <header className="py-2 md:py-4 z-50 w-full bg-primary-500 dark:bg-dark-box/35 border-b dark:border-0 border-[#2a4a6f]">
      <div className="flex items-center justify-between h-16 px-3 sm:px-4 md:px-6 lg:px-8 gap-2 md:gap-10">
        {/* Left: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white dark:bg-dark-box/10 h-9 w-9"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href={"/"}>
            <Image
              alt="لوگو میکرولس"
              src="/image/logo.png"
              width={150}
              height={48}
              className="w-full lg:h-10 h-9 md:min-w-36 lg:min-w-[150px]"
              priority
            />
          </Link>
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 dark:hover:bg-dark-box/20 gap-1.5 h-9"
              title="صفحه اصلی"
            >
              <Home2 className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden md:inline text-sm">صفحه اصلی</span>
            </Button>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-md:hidden flex items-center justify-center mx-2 md:mx-4">
          <div className="bg-white  dark:bg-[#8989893D] dark:border-dark-stroke dark:border w-full rounded-lg p-1 flex-between">
            <input
              type="text"
              className="px-2 outline-none placeholder:max-md:text-xs bg-transparent"
              placeholder="جستجو در داشبورد"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 gap-2 flex-between rounded-lg p-2 md:px-3 py-2">
              <SearchNormal1 className="max-lg:size-6" /> <span className="max-lg:hidden">جستجو</span>
            </button>
          </div>
        </div>

        {/* Right: User Info & Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* User Name & Icons - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1.5 md:gap-2 text-white dark:text-primary-100">
            <Link href="/dashboard/notifications" className="relative inline-flex">
              <Notification className="h-4 w-4 md:h-5 md:w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
            <SwitchButton />

            <User className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-xs md:text-sm lg:text-base font-medium hidden md:inline">{userName}</span>
          </div>

          {/* Mobile: Only Icons */}
          <div className="sm:hidden flex items-center gap-2 text-white dark:text-primary-100">
            <Link href="/dashboard/notifications" className="relative inline-flex">
              <Notification />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
            <User />
          </div>
        </div>
      </div>
    </header>
  );
}
