"use client";

import React from "react";
import { User, Sms, Call, Calendar, TickCircle, CloseCircle, Image as ImageIcon, SecuritySafe } from "iconsax-reactjs";
import { formatDateFa } from "@/utils/adminDateUtils";
import { Badge } from "@/components/ui/badge";
import UserInfoCard from "./UserInfoCard";

function fullNameOrFallback(user) {
  const name = user.fullName || [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.email || user.userName || "-";
}

export default function UserInfoSection({ user }) {
  const roles = Array.isArray(user.roles)
    ? user.roles
    : typeof user.roles === "string"
      ? user.roles.split(/[،,]/).map((r) => r.trim()).filter(Boolean)
      : [];

  return (
    <div className="space-y-6">
      {/* نقش‌های کاربر */}
      <div className="rounded-xl bg-gray-800/50 border border-gray-600/80 p-3 sm:p-4" dir="rtl">
        <div className="flex items-center gap-2 mb-2 sm:mb-3 justify-end flex-row-reverse">
          <SecuritySafe size={18} className="text-violet-400 shrink-0 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium text-gray-300">نقش‌های کاربر</span>
        </div>
        {roles.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-end">
            {roles.map((role) => (
              <Badge
                key={role}
                variant="outline"
                className="bg-violet-500/15 text-violet-300 border-violet-500/40 font-medium text-xs"
              >
                {role}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs sm:text-sm text-right">بدون نقش</p>
        )}
      </div>

      {/* کارت‌های اطلاعات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4" dir="rtl">
        <UserInfoCard icon={User} label="نام و نام خانوادگی" value={fullNameOrFallback(user)} />
        <UserInfoCard icon={Sms} label="ایمیل" value={user.email || "-"} isLink href={user.email ? `mailto:${user.email}` : undefined} />
        <UserInfoCard
          icon={Call}
          label="شماره تماس"
          value={user.phoneNumber || "-"}
          isLink
          href={user.phoneNumber ? `tel:${user.phoneNumber}` : undefined}
        />
        <UserInfoCard icon={Calendar} label="تاریخ ثبت‌نام" value={formatDateFa(user.createdAt)} />
        <UserInfoCard icon={Calendar} label="آخرین ورود" value={user.lastLogin ? formatDateFa(user.lastLogin) : "هرگز"} />
        <UserInfoCard
          icon={TickCircle}
          label="وضعیت ایمیل"
          value={user.isEmailVerified ? "تایید شده" : "تایید نشده"}
          status={user.isEmailVerified ? "success" : "warning"}
        />
        <UserInfoCard
          icon={TickCircle}
          label="وضعیت شماره تلفن"
          value={user.isPhoneVerified ? "تایید شده" : "تایید نشده"}
          status={user.isPhoneVerified ? "success" : "warning"}
        />
        {user.profileImage && (
          <UserInfoCard
            icon={ImageIcon}
            label="تصویر پروفایل"
            value="مشاهده تصویر"
            isLink
            href={user.profileImage}
            target="_blank"
          />
        )}
        {user.isBanned && (
          <>
            {user.bannedAt && <UserInfoCard icon={CloseCircle} label="تاریخ بن" value={formatDateFa(user.bannedAt)} />}
            {user.banReason && <UserInfoCard icon={CloseCircle} label="دلیل بن" value={user.banReason} />}
          </>
        )}
      </div>
    </div>
  );
}
