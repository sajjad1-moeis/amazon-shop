"use client";

import { AuthModal } from "@/template/Auth/AuthModal";
import { User, LogoutCurve, ArrowDown2, Wallet3 } from "iconsax-reactjs";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { userWalletService } from "@/services/userWallet/userWalletService";
import { USER_MENU_ITEMS } from "@/data/userMenuItems";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function formatBalance(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "۰";
  return Math.floor(num).toLocaleString("fa-IR");
}

function useWalletBalance(userId, enabled) {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    if (!enabled || !userId) return;
    let cancelled = false;
    userWalletService
      .getBalance(userId)
      .then((res) => {
        if (cancelled) return;
        const value = typeof res === "number" ? res : (res?.balance ?? res?.data ?? 0);
        setBalance(value);
      })
      .catch(() => {
        if (!cancelled) setBalance(0);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, userId]);
  return balance;
}

export default function BtnShowLoginModal() {
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const displayName = user?.userName || user?.fullName || user?.firstName || user?.name || user?.phoneNumber || "کاربر";
  const userId = user?.id ?? user?.userId;
  const balance = useWalletBalance(userId, popoverOpen && isAuthenticated);

  const handleLogout = async () => {
    setPopoverOpen(false);
    await logout();
  };

  const triggerClassName =
    "flex flex-col items-center gap-0 p-2 rounded-lg border-2 border-white dark:border-[#898989] " +
    "text-white dark:text-[#E9F0FF] hover:opacity-90 transition-opacity min-w-0";

  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "p-3 rounded-lg border-2 border-white dark:border-[#898989]",
            "text-white dark:text-[#898989] hover:opacity-90 transition-opacity",
          )}
          aria-label="ورود"
        >
          <User />
        </button>
        <AuthModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <button className={triggerClassName} aria-expanded={popoverOpen} aria-haspopup="true">
          <span className="flex items-center gap-1 font-medium text-sm sm:text-base">
            {displayName}
            <ArrowDown2 size={18} className="text-amber-400 flex-shrink-0" />
          </span>
          <span className="text-xs text-white/90 dark:text-[#E9F0FF]/90">خوش آمدید!</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className={cn(
          "w-[280px] p-0 rounded-xl border bg-popover text-popover-foreground shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        )}
      >
        <div className="px-4 pt-3 pb-2 flex-between text-dark-primary dark:text-dark-title">
          <p className="flex items-center gap-2  text-sm mb-1">
            <Wallet3 size={18} />
            موجودی:
          </p>
          <p className="">
            {balance != null ? formatBalance(balance) : "..."}
            <span className=" font-normal mr-1"> تومان</span>
          </p>
        </div>
        <Separator />
        <div className="py-1">
          {USER_MENU_ITEMS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setPopoverOpen(false)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm text-foreground",
                "hover:bg-accent hover:text-accent-foreground transition-colors",
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              {label}
            </Link>
          ))}
        </div>
        <Separator />
        <div className="py-1">
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive",
              "hover:bg-accent hover:text-destructive transition-colors",
            )}
          >
            <LogoutCurve size={18} className="flex-shrink-0" />
            خروج
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
