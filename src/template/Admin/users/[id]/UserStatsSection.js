"use client";

import React from "react";
import { ShoppingBag, Wallet3, Location, Star, Ticket, Gift, Profile2User } from "iconsax-reactjs";
import UserStatsCard from "./UserStatsCard";

function num(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export default function UserStatsSection({ user }) {
  const formatCurrency = (amount) => {
    if (amount == null || amount === "") return "0 ریال";
    const n = Number(amount);
    if (!Number.isFinite(n)) return "0 ریال";
    return `${n.toLocaleString("fa-IR")} ریال`;
  };

  const loyaltyLevel = num(user.loyaltyLevel ?? user.LoyaltyLevel, 1);
  const loyaltyLevelName = user.loyaltyLevelName ?? user.LoyaltyLevelName;

  const getLoyaltyLevelBadge = () => {
    const levels = {
      1: { name: "برنزی", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
      2: { name: "نقره‌ای", color: "bg-gray-400/20 text-gray-300 border-gray-400/30" },
      3: { name: "طلایی", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      4: { name: "پلاتینیوم", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    };
    const level = levels[loyaltyLevel] || levels[1];
    return { name: loyaltyLevelName || level.name, className: level.color };
  };

  const badge = getLoyaltyLevelBadge();

  const totalOrders = num(user.totalOrders ?? user.TotalOrders);
  const pendingOrders = num(user.pendingOrders ?? user.PendingOrders);
  const completedOrders = num(user.completedOrders ?? user.CompletedOrders);
  const cancelledOrders = num(user.cancelledOrders ?? user.CancelledOrders);
  const walletBalance = user.walletBalance ?? user.WalletBalance ?? 0;
  const totalSpent = user.totalSpent ?? user.TotalSpent ?? 0;
  const points = num(user.points ?? user.Points);
  const addressCount = num(user.addressCount ?? user.AddressCount);
  const wishlistCount = num(user.wishlistCount ?? user.WishlistCount);
  const ticketCount = num(user.ticketCount ?? user.TicketCount);
  const openTicketCount = num(user.openTicketCount ?? user.OpenTicketCount);
  const referralCode = user.referralCode ?? user.ReferralCode;
  const referredByUserName = user.referredByUserName ?? user.ReferredByUserName;
  const referralCount = num(user.referralCount ?? user.ReferralCount);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4" dir="rtl">
      <UserStatsCard icon={ShoppingBag} label="کل سفارشات" value={totalOrders} />
      <UserStatsCard icon={ShoppingBag} label="سفارشات در انتظار" value={pendingOrders} variant="warning" />
      <UserStatsCard icon={ShoppingBag} label="سفارشات تکمیل شده" value={completedOrders} variant="success" />
      <UserStatsCard icon={ShoppingBag} label="سفارشات لغو شده" value={cancelledOrders} variant="danger" />

      <UserStatsCard icon={Wallet3} label="موجودی کیف پول" value={formatCurrency(walletBalance)} />
      <UserStatsCard icon={ShoppingBag} label="مجموع خرید" value={formatCurrency(totalSpent)} />
      <UserStatsCard icon={Star} label="امتیاز وفاداری" value={points} />
      <UserStatsCard icon={Gift} label="سطح وفاداری" value={badge.name} badgeClassName={badge.className} />

      <UserStatsCard icon={Location} label="تعداد آدرس‌ها" value={addressCount} />
      <UserStatsCard icon={Star} label="تعداد علاقه‌مندی‌ها" value={wishlistCount} />
      <UserStatsCard icon={Ticket} label="کل تیکت‌ها" value={ticketCount} />
      <UserStatsCard icon={Ticket} label="تیکت‌های باز" value={openTicketCount} variant="warning" />

      {referralCode && (
        <>
          <UserStatsCard icon={Profile2User} label="کد معرف" value={referralCode} />
          {referredByUserName && (
            <UserStatsCard icon={Profile2User} label="معرف شده توسط" value={referredByUserName} />
          )}
          <UserStatsCard icon={Profile2User} label="تعداد معرفی شده" value={referralCount} />
        </>
      )}
    </div>
  );
}
