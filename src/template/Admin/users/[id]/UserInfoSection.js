"use client";

import React from "react";
import { User, Sms, Call, Calendar, TickCircle, CloseCircle, Image as ImageIcon, SecuritySafe } from "iconsax-reactjs";
import { formatDateFa } from "@/utils/adminDateUtils";
import { Badge } from "@/components/ui/badge";
import { resolveApiMediaUrl } from "@/services/api/client";
import UserInfoCard from "./UserInfoCard";

function isPlaceholderEmail(email) {
  const e = (email ?? "").toString().trim().toLowerCase();
  return !!e && e.endsWith("@placeholder.local");
}

function fullNameOrFallback(user) {
  const fn = user.firstName ?? user.FirstName;
  const ln = user.lastName ?? user.LastName;
  const email = user.email ?? user.Email;
  const userName = user.userName ?? user.UserName;
  const safeUserName = isPlaceholderEmail(userName) ? "" : userName;

  const name =
    user.fullName ||
    user.FullName ||
    [fn, ln].filter(Boolean).join(" ").trim();

  // اگر دیتابیس به هر دلیل ایمیل placeholder را در نام/نام خانوادگی نگه داشته
  // یا اگر نام خالی است، به جای ایمیل پیش‌فرض، چیزی نمایش نده.
  if (name && !isPlaceholderEmail(name)) return name;
  if (isPlaceholderEmail(fn) || isPlaceholderEmail(ln)) return "-";
  if (isPlaceholderEmail(email)) return "-";

  return name || email || safeUserName || "بدون نام";
}

export default function UserInfoSection({ user }) {
  const rawRoles = user.roles ?? user.Roles;
  const roles = Array.isArray(rawRoles)
    ? rawRoles
    : typeof rawRoles === "string"
      ? rawRoles.split(/[،,]/).map((r) => r.trim()).filter(Boolean)
      : [];

  const email = user.email ?? user.Email;
  const phone = user.phoneNumber ?? user.PhoneNumber;
  const createdAt = user.createdAt ?? user.CreatedAt;
  const lastLogin = user.lastLogin ?? user.LastLogin;
  const isEmailVerified = user.isEmailVerified ?? user.IsEmailVerified ?? false;
  const isPhoneVerified = user.isPhoneVerified ?? user.IsPhoneVerified ?? false;
  const profileImage = user.profileImage ?? user.ProfileImage ?? "";
  const profileImageHref = profileImage ? resolveApiMediaUrl(profileImage) : "";
  const isBanned = user.isBanned ?? user.IsBanned ?? false;
  const bannedAt = user.bannedAt ?? user.BannedAt;
  const banReason = user.banReason ?? user.BanReason;

  const emailDisplay = (() => {
    if (!email) return "فاقد ایمیل";
    if (isPlaceholderEmail(email)) return "فاقد ایمیل";
    return email;
  })();

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
        <UserInfoCard
          icon={Sms}
          label="ایمیل"
          value={emailDisplay}
          isLink
          href={emailDisplay === "فاقد ایمیل" ? undefined : `mailto:${email}`}
        />
        <UserInfoCard
          icon={Call}
          label="شماره تماس"
          value={phone || "-"}
          isLink
          href={phone ? `tel:${phone}` : undefined}
        />
        <UserInfoCard icon={Calendar} label="تاریخ ثبت‌نام" value={formatDateFa(createdAt)} />
        <UserInfoCard icon={Calendar} label="آخرین ورود" value={lastLogin ? formatDateFa(lastLogin) : "هرگز"} />
        <UserInfoCard
          icon={TickCircle}
          label="وضعیت ایمیل"
          value={isEmailVerified ? "تایید شده" : "تایید نشده"}
          status={isEmailVerified ? "success" : "warning"}
        />
        <UserInfoCard
          icon={TickCircle}
          label="وضعیت شماره تلفن"
          value={isPhoneVerified ? "تایید شده" : "تایید نشده"}
          status={isPhoneVerified ? "success" : "warning"}
        />
        {profileImageHref && (
          <UserInfoCard
            icon={ImageIcon}
            label="تصویر پروفایل"
            value="مشاهده تصویر"
            isLink
            href={profileImageHref}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        {isBanned && (
          <>
            {bannedAt && <UserInfoCard icon={CloseCircle} label="تاریخ بن" value={formatDateFa(bannedAt)} />}
            {banReason && <UserInfoCard icon={CloseCircle} label="دلیل بن" value={banReason} />}
          </>
        )}
      </div>
    </div>
  );
}
