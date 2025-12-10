"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, Logout, User } from "iconsax-reactjs";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SideBarContent } from "./AdminSidebar";

// تابع ساده برای نمایش تاریخ شمسی
const getPersianDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}/${month}/${day}`;
};

export default function AdminTopBar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="relative">
      <header className="bg-gray-800 bg-opacity-50 border-0 !border-b border-gray-700 shadow-lg flex items-center justify-end max-md:justify-between gap-2 p-5">
        <div className="lg:hidden text-2xl text-white cursor-pointer" onClick={() => setOpen(!open)}>
          <Menu />
        </div>

        <div className="flex items-center justify-between w-full text-white">
          <div className="rounded-lg flex items-center overflow-hidden bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg">
            <div className="p-2 px-3 text-sm">{getPersianDate()}</div>
            <div className="bg-primary-700 p-2 px-4 text-sm font-medium">امروز</div>
          </div>

          <div className="flex items-center text-3xl">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className="mr-2 relative border border-gray-600 p-1.5 rounded-full text-red-500 hover:text-red-400"
                  >
                    <Logout size={28} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>خروج</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="border border-gray-600 p-1.5 rounded-full text-white hover:text-gray-300">
                    <User size={28} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>پروفایل</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent
          closeRowClassName="bg-gray-700"
          className="bg-gray-800 border border-gray-700 shadow-lg lg:hidden max-h-[85vh] flex flex-col overflow-hidden"
        >
          <div className="overflow-y-auto flex-1 px-5 py-4 min-h-0">
            <SideBarContent />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
