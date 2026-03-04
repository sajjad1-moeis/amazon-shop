"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Box, Heart, Sms, Wallet } from "iconsax-reactjs";
import { userDashboardService } from "@/services/userDashboard/userDashboardService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const cardConfig = [
  { id: "wallet", title: "موجودی کیف پول", key: "walletBalance", type: "تومان", icon: Wallet, iconColor: "text-yellow-500", bgColor: "bg-yellow-50 dark:bg-yellow-950/20", link: "/dashboard/wallet" },
  { id: "orders", title: "سفارش های فعال", key: "activeOrdersCount", type: "سفارش", icon: Box, iconColor: "text-green-500", bgColor: "bg-green-50 dark:bg-green-950/20", link: "/dashboard/orders" },
  { id: "tickets", title: "تیکت های باز", key: "openTicketsCount", type: "تیکت", icon: Sms, iconColor: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-950/20", link: "/dashboard/support" },
  { id: "wishlist", title: "علاقه مندی ها", key: "wishlistCount", type: "کالا", icon: Heart, iconColor: "text-red-500", bgColor: "bg-red-50 dark:bg-red-950/20", link: "/dashboard/favorites" },
];

export default function OverviewCards() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    userDashboardService
      .getSummary()
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        setSummary(data || {});
      })
      .catch(() => {
        if (!cancelled) setSummary({});
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const formatValue = (val) => {
    if (val == null) return "۰";
    if (typeof val === "number") return val.toLocaleString("fa-IR");
    return String(val);
  };

  const getValue = (key) => {
    const s = summary || {};
    switch (key) {
      case "walletBalance":
        return s.walletBalance ?? s.wallet?.balance ?? s.wallet?.amount ?? s.balance ?? 0;
      case "activeOrdersCount":
        return s.activeOrdersCount ?? s.orders?.activeCount ?? s.orders?.active ?? s.activeOrders ?? 0;
      case "openTicketsCount":
        return s.openTicketsCount ?? s.tickets?.openCount ?? s.tickets?.open ?? s.openTickets ?? 0;
      case "wishlistCount":
        return s.wishlistCount ?? s.favoritesCount ?? s.wishlist?.count ?? 0;
      default:
        return s[key] ?? 0;
    }
  };

  if (loading) {
    return (
      <div className="my-8 flex justify-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cardConfig.map((card) => {
          const Icon = card.icon;
          const value = getValue(card.key);
          const content = (
            <div
              className={cn(
                "bg-white dark:bg-dark-box gap-2 flex items-center rounded-xl shadow-md p-2 md:p-4 hover:shadow-md transition-shadow w-full",
                card.link && "cursor-pointer"
              )}
            >
              <div className="flex items-center justify-between">
                <div className={cn("p-2.5 md:p-3 rounded-lg bg-primary-700 dark:bg-dark-title")}>
                  <Icon size={32} className={cn("max-md:size-6 text-primary-50 dark:text-dark-box")} variant="Bold" />
                </div>
              </div>
              <div>
                <p className="text-lg md:text-xl text-primary-700 dark:text-dark-title mb-2">
                  {formatValue(value)} <span className="text-xs md:text-sm">{card.type}</span>
                </p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">{card.title}</p>
              </div>
            </div>
          );
          return card.link ? (
            <Link key={card.id} href={card.link}>
              {content}
            </Link>
          ) : (
            <div key={card.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
