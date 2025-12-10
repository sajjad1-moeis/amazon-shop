"use client";

import React from "react";
import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { Notification, SearchNormal1, User } from "iconsax-reactjs";

export default function DashboardHeader({ onMenuClick }) {
  const { user } = useAuth();
  const userName = user?.fullName || user?.firstName || "محمد داوری";

  return (
    <header className="w-full bg-primary-500 border-b border-[#2a4a6f]">
      <div className="flex items-center justify-between py-4 px-3 sm:px-4 md:px-6 lg:px-8 gap-2 md:gap-20" dir="rtl">
        {/* Left: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10 h-9 w-9"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Image
            alt="لوگو میکروالس"
            src="/image/logo.png"
            width={120}
            height={48}
            className="w-full lg:h-12 h-9 md:min-w-36 lg:min-w-[120px]"
            priority
          />
        </div>

        {/* Center: Search Bar */}
        <div className="bg-white dark:bg-[#8989893D] w-full rounded-lg p-1 flex-between">
          <input
            type="text"
            className="px-2 outline-none placeholder:max-md:text-xs bg-transparent"
            placeholder="جستجو ..."
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 gap-2 flex-between rounded-lg p-2 md:px-3 py-2">
            <SearchNormal1 className="max-lg:size-6" /> <span className="max-lg:hidden">جستجو</span>
          </button>
        </div>

        {/* Right: User Info & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
          {/* User Name & Icons - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1.5 md:gap-2 text-white">
            <Notification size={28} />
            <User size={28} />
            <span className="text-xs md:text-sm lg:text-base font-medium hidden md:inline">{userName}</span>
          </div>

          {/* Mobile: Only Icons */}
          <div className="sm:hidden flex items-center gap-2 text-white">
            <Notification className="h-5 w-5" />
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
