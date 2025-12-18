"use client";

import React from "react";
import { ShoppingBag, Wallet3, Location, Star, Ticket, Gift, Profile2User } from "iconsax-reactjs";
import UserStatsCard from "./UserStatsCard";

export default function UserStatsSection({ user }) {
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "0 ریال";
    return `${Number(amount).toLocaleString("fa-IR")} ریال`;
  };

  const getLoyaltyLevelBadge = () => {
    const levels = {
      1: { name: "برنزی", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
      2: { name: "نقره‌ای", color: "bg-gray-400/20 text-gray-300 border-gray-400/30" },
      3: { name: "طلایی", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      4: { name: "پلاتینیوم", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    };
    const level = levels[user.loyaltyLevel] || levels[1];
    return { name: user.loyaltyLevelName || level.name, className: level.color };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UserStatsCard icon={ShoppingBag} label="کل سفارشات" value={user.totalOrders || 0} />
      <UserStatsCard icon={ShoppingBag} label="سفارشات در انتظار" value={user.pendingOrders || 0} variant="warning" />
      <UserStatsCard icon={ShoppingBag} label="سفارشات تکمیل شده" value={user.completedOrders || 0} variant="success" />
      <UserStatsCard icon={ShoppingBag} label="سفارشات لغو شده" value={user.cancelledOrders || 0} variant="danger" />

      <UserStatsCard icon={Wallet3} label="موجودی کیف پول" value={formatCurrency(user.walletBalance)} />
      <UserStatsCard icon={ShoppingBag} label="مجموع خرید" value={formatCurrency(user.totalSpent)} />
      <UserStatsCard icon={Star} label="امتیاز وفاداری" value={user.points || 0} />
      {user.loyaltyLevel && (
        <UserStatsCard
          icon={Gift}
          label="سطح وفاداری"
          value={getLoyaltyLevelBadge().name}
          badgeClassName={getLoyaltyLevelBadge().className}
        />
      )}

      <UserStatsCard icon={Location} label="تعداد آدرس‌ها" value={user.addressCount || 0} />
      <UserStatsCard icon={Star} label="تعداد علاقه‌مندی‌ها" value={user.wishlistCount || 0} />
      <UserStatsCard icon={Ticket} label="کل تیکت‌ها" value={user.ticketCount || 0} />
      <UserStatsCard icon={Ticket} label="تیکت‌های باز" value={user.openTicketCount || 0} variant="warning" />

      {user.referralCode && (
        <>
          <UserStatsCard icon={Profile2User} label="کد معرف" value={user.referralCode} />
          {user.referredByUserName && (
            <UserStatsCard icon={Profile2User} label="معرف شده توسط" value={user.referredByUserName} />
          )}
          <UserStatsCard icon={Profile2User} label="تعداد معرفی شده" value={user.referralCount || 0} />
        </>
      )}
    </div>
  );
}


