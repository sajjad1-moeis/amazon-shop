"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Logout, User, CloseCircle, Home2 } from "iconsax-reactjs";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SideBarContent } from "./AdminSidebar";
import { formatDateFa } from "@/utils/adminDateUtils";

export default function AdminTopBar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const location = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div className="relative">
      <header className="bg-gray-900 flex items-center justify-between gap-2 p-4 border-b border-gray-800">
        <Sheet open={open} onOpenChange={setOpen} className="relative">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-gray-800">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-gray-900 text-white w-[250px] sm:w-[320px] p-0 overflow-y-auto border-l border-gray-700 [&>button]:hidden"
            dir="rtl"
          >
            <div className="p-2">
              <div className="flex items-center justify-end mb-4 absolute z-50 left-3">
                <SheetClose asChild>
                  <button className="text-white hover:text-gray-300  p-1">
                    <CloseCircle size={24} />
                  </button>
                </SheetClose>
              </div>
              <SideBarContent />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center w-full text-white max-sm:justify-end justify-between">
          <div className="rounded-lg flex items-center overflow-hidden bg-gray-800 max-sm:hidden" dir="rtl">
            <div className="p-2 px-3 text-sm">{formatDateFa(new Date())}</div>
            <div className="bg-blue-600 p-2 px-4 text-sm font-medium">امروز</div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="border border-gray-700 rounded-full hover:bg-gray-800 text-white gap-1.5 px-3"
                title="صفحه اصلی"
              >
                <Home2 size={20} />
                <span className="max-sm:hidden">صفحه اصلی</span>
              </Button>
            </Link>
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
