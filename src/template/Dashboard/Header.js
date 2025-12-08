"use client";

import React from "react";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();
  const userName = user?.fullName || user?.firstName || "کاربر";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1e3a5f] dark:bg-[#1a2f4a] border-b border-[#2a4a6f] dark:border-[#2a4a6f]/50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8" dir="rtl">
        {/* Left: Page Title */}
        <div className="flex items-center">
          <h1 className="text-sm md:text-base font-medium text-white/90">my favnote page</h1>
        </div>

        {/* Center: User Info & Search */}
        <div className="flex items-center gap-3 md:gap-4 flex-1 justify-center max-w-2xl mx-4">
          {/* User Name */}
          <div className="hidden sm:flex items-center gap-2 text-white">
            <span className="text-sm md:text-base font-medium">{userName}</span>
            <User className="h-5 w-5" />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 dark:hover:bg-white/5 h-9 w-9">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="جستجو..."
                className="w-full pr-10 pl-4 bg-white/10 dark:bg-white/5 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/20 h-9 text-sm"
                dir="rtl"
              />
              <Button className="absolute left-2 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white h-7 px-3 text-xs font-medium">
                جستجو
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Logo */}
        <div className="flex items-center">
          <Image src="/image/logo.png" alt="میکرو لس" width={120} height={40} className="h-8 w-auto" priority />
        </div>
      </div>
    </header>
  );
}
