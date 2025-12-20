"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, Logout, User } from "iconsax-reactjs";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

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
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-gray-800">
              <Menu size={24} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-gray-900 text-white h-[90vh] p-0">
            <AdminSidebar />
          </DrawerContent>
        </Drawer>

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
