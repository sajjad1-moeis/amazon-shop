"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { Notification, SearchNormal1, User } from "iconsax-reactjs";
import SwitchButton from "@/components/SwitchButton";
import { notificationService } from "@/services/notification/notificationService";
import { unwrapApiData } from "@/services/api/client";
import { useRouter } from "next/navigation";
import { DASHBOARD_NAV_ITEMS } from "@/template/Dashboard/Sidebar";

export default function DashboardHeader({ onMenuClick }) {
  const { user } = useAuth();
  const router = useRouter();
  const userName = user?.fullName || user?.firstName || "کاربر";
  const userId = user?.id ?? user?.userId;
  const [unreadCount, setUnreadCount] = useState(0);
  const [query, setQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (userId == null) return;
    notificationService
      .getUnreadCount(userId)
      .then((res) => {
        const data = unwrapApiData(res);
        setUnreadCount(typeof data === "number" ? data : (data?.unreadCount ?? data?.count ?? 0));
      })
      .catch(() => setUnreadCount(0));
  }, [userId]);

  const routes = useMemo(() => {
    /** @type {{label: string; href: string; parentLabel?: string}[]} */
    const out = [];
    for (const item of DASHBOARD_NAV_ITEMS) {
      if (item?.href && item?.label) out.push({ label: item.label, href: item.href });
      if (Array.isArray(item?.children)) {
        for (const child of item.children) {
          if (child?.href && child?.label) out.push({ label: child.label, href: child.href, parentLabel: item.label });
        }
      }
    }
    // remove dup hrefs
    const seen = new Set();
    return out.filter((r) => (seen.has(r.href) ? false : (seen.add(r.href), true)));
  }, []);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored = routes
      .map((r) => {
        const hay = `${r.label} ${r.parentLabel ?? ""} ${r.href}`.toLowerCase();
        const idx = hay.indexOf(q);
        return { r, idx };
      })
      .filter((x) => x.idx !== -1)
      .sort((a, b) => a.idx - b.idx || a.r.label.length - b.r.label.length)
      .slice(0, 8)
      .map((x) => x.r);
    return scored;
  }, [query, routes]);

  const goToRoute = (href) => {
    router.push(href);
    setShowSuggestions(false);
    setMobileSearchOpen(false);
  };

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
        </div>

        {/* Center: Search Bar (Desktop) */}
        <div className="flex-1 max-md:hidden flex items-center justify-center mx-2 md:mx-4 relative">
          <div className="bg-white dark:bg-[#8989893D] dark:border-dark-stroke dark:border w-full rounded-lg p-1 flex-between">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // allow click on suggestion
                setTimeout(() => setShowSuggestions(false), 120);
              }}
              className="px-2 outline-none placeholder:max-md:text-xs bg-transparent"
              placeholder="جستجو در داشبورد"
              dir="rtl"
              aria-label="جستجو در داشبورد"
            />
            <button
              type="button"
              onClick={() => setShowSuggestions(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 gap-2 flex-between rounded-lg p-2 md:px-3 py-2"
              aria-label="نمایش نتایج جستجو"
              title="جستجو"
            >
              <SearchNormal1 className="max-lg:size-6" /> <span className="max-lg:hidden">جستجو</span>
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full rounded-xl bg-white dark:bg-dark-box border border-gray-200 dark:border-dark-stroke shadow-xl z-50 overflow-hidden">
              {suggestions.map((s) => (
                <button
                  key={s.href}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToRoute(s.href)}
                  className="w-full text-right px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-dark-field transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-dark-title">{s.label}</div>
                  <div className="text-xs text-gray-500 dark:text-dark-text flex items-center gap-2">
                    {s.parentLabel && <span className="truncate">{s.parentLabel}</span>}
                    <span className="truncate">{s.href}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
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

            <Link href="/dashboard/account/profile" className="inline-flex items-center gap-2" title="پروفایل">
              <User className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm lg:text-base font-medium hidden md:inline">{userName}</span>
            </Link>
          </div>

          {/* Mobile: Only Icons + Search */}
          <div className="sm:hidden flex items-center gap-2 text-white dark:text-primary-100 relative">
            <Link href="/dashboard/notifications" className="relative inline-flex">
              <Notification />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileSearchOpen((v) => !v)}
              className="inline-flex"
              aria-label="باز کردن جستجو"
              title="جستجو"
            >
              <SearchNormal1 />
            </button>
            <Link href="/dashboard/account/profile" className="inline-flex" title="پروفایل">
              <User />
            </Link>

            {mobileSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-[min(92vw,380px)] rounded-xl bg-white dark:bg-dark-box border border-gray-200 dark:border-dark-stroke shadow-xl p-2 z-50">
                <form
                  className="flex items-center gap-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    className="flex-1 bg-transparent outline-none px-2 py-2 text-sm"
                    placeholder="جستجو در داشبورد"
                    dir="rtl"
                    autoFocus
                  />
                  <button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 rounded-lg px-3 py-2 text-sm font-medium">
                    جستجو
                  </button>
                </form>

                {suggestions.length > 0 && (
                  <div className="mt-2 border-t border-gray-200 dark:border-dark-stroke pt-2 max-h-[50vh] overflow-auto">
                    {suggestions.map((s) => (
                      <button
                        key={s.href}
                        type="button"
                        onClick={() => goToRoute(s.href)}
                        className="w-full text-right px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-field transition-colors"
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-dark-title">{s.label}</div>
                        <div className="text-xs text-gray-500 dark:text-dark-text truncate">
                          {s.parentLabel ? `${s.parentLabel} • ${s.href}` : s.href}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
