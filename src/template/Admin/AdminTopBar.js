"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Logout, User, CloseCircle } from "iconsax-reactjs";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { SideBarContent } from "./AdminSidebar";

// تابع ساده برای نمایش تاریخ شمسی (بدون moment-jalali)
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
      <header className="bg-gray-900 flex items-center justify-between gap-2 p-4 border-b border-gray-800">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-gray-800">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-gray-900 text-white w-[280px] sm:w-[320px] p-0 overflow-y-auto border-l border-gray-700 [&>button]:hidden"
            dir="rtl"
          >
            <div className="p-4">
              <div className="flex items-center justify-end mb-4">
                <SheetClose asChild>
                  <button className="text-white hover:text-gray-300 transition-colors p-1">
                    <CloseCircle size={24} />
                  </button>
                </SheetClose>
              </div>
              <SideBarContent onLinkClick={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center justify-between w-full text-white">
          <div className="rounded-lg flex items-center overflow-hidden bg-gray-800">
            <div className="p-2 px-3 text-sm">{getPersianDate()}</div>
            <div className="bg-blue-600 p-2 px-4 text-sm font-medium">امروز</div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="border border-gray-700 rounded-full hover:bg-gray-800 text-white"
              title="خروج"
            >
              <Logout size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="border border-gray-700 rounded-full hover:bg-gray-800 text-white"
              title="پروفایل"
            >
              <User size={20} />
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
