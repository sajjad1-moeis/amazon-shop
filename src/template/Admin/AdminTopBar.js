"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Logout, User, CloseCircle, Home2 } from "iconsax-reactjs";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SideBarContentWithSuspense } from "./AdminSidebar";
import { formatDateFa } from "@/utils/adminDateUtils";

export default function AdminTopBar() {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const router = useRouter();
  const location = usePathname();
  const profileId = user?.id ?? user?.userId;
  const profileHref = profileId ? `/admin/users/${profileId}` : "/admin/users";

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const closeDrawer = () => setOpen(false);

  return (
    <div className="relative z-40 shrink-0">
      <header
        className="sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-gray-800/90 bg-gray-900/95 px-2 py-2.5 pt-[max(0.625rem,env(safe-area-inset-top))] shadow-sm shadow-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-gray-900/90 sm:gap-3 sm:px-3 sm:py-3 lg:px-4"
        dir="rtl"
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 shrink-0 text-white hover:bg-gray-800 lg:hidden"
              aria-label="باز کردن منوی پنل"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(100vw-0.5rem,20.5rem)] border-l border-gray-700/80 bg-gray-950 p-0 text-white shadow-2xl sm:w-[min(100vw-1rem,22rem)] [&>button]:hidden"
            dir="rtl"
          >
            <div className="relative flex h-full flex-col">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800/80 bg-gray-950/95 px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-sm">
                <span className="text-sm font-semibold text-gray-200">منوی پنل</span>
                <SheetClose asChild>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                    aria-label="بستن منو"
                  >
                    <CloseCircle size={22} />
                  </button>
                </SheetClose>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
                <SideBarContentWithSuspense variant="drawer" onLinkClick={closeDrawer} />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-2 text-white">
          <div
            className="hidden min-w-0 items-center overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/80 sm:flex"
            dir="rtl"
          >
            <div className="truncate px-3 py-2 text-xs md:text-sm">{formatDateFa(new Date())}</div>
            <div className="bg-gradient-to-l from-blue-600 to-blue-500 px-3 py-2 text-xs font-semibold md:text-sm">
              امروز
            </div>
          </div>

          {/* تاریخ فشرده فقط موبایل */}
          <div
            className="flex max-w-[42vw] items-center truncate rounded-lg border border-gray-700/60 bg-gray-800/70 px-2 py-1.5 text-[10px] text-gray-300 sm:hidden"
            dir="rtl"
            title={formatDateFa(new Date())}
          >
            <span className="truncate">{formatDateFa(new Date())}</span>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 gap-1 rounded-full border border-gray-700/80 px-2.5 text-white hover:bg-gray-800 sm:h-9 sm:px-3"
                title="صفحه اصلی"
              >
                <Home2 size={20} className="shrink-0" />
                <span className="hidden sm:inline">صفحه اصلی</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-10 w-10 rounded-full border border-gray-700/80 hover:bg-gray-800 sm:h-9 sm:w-9"
              title="خروج"
            >
              <Logout size={20} />
            </Button>

            <Link href={profileHref} title="پروفایل">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full border border-gray-700/80 hover:bg-gray-800 sm:h-9 sm:w-9"
              >
                <User size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
