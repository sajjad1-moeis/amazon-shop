"use client";

import React from "react";
import { User, Sms, Call, Calendar, TickCircle, CloseCircle, Image as ImageIcon } from "iconsax-reactjs";
import { formatDate } from "@/utils/dateFormatter";
import UserInfoCard from "./UserInfoCard";

export default function UserInfoSection({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <UserInfoCard icon={User} label="نام و نام خانوادگی" value={user.fullName || "-"} />
      <UserInfoCard icon={Sms} label="ایمیل" value={user.email || "-"} isLink href={`mailto:${user.email}`} />
      <UserInfoCard
        icon={Call}
        label="شماره تماس"
        value={user.phoneNumber || "-"}
        isLink
        href={`tel:${user.phoneNumber}`}
      />
      <UserInfoCard icon={Calendar} label="تاریخ ثبت‌نام" value={formatDate(user.createdAt)} />
      <UserInfoCard icon={Calendar} label="آخرین ورود" value={user.lastLogin ? formatDate(user.lastLogin) : "هرگز"} />
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
      {user.roles && user.roles.length > 0 && <UserInfoCard icon={User} label="نقش‌ها" value={user.roles.join(", ")} />}
      {user.isBanned && (
        <>
          {user.bannedAt && <UserInfoCard icon={CloseCircle} label="تاریخ بن" value={formatDate(user.bannedAt)} />}
          {user.banReason && <UserInfoCard icon={CloseCircle} label="دلیل بن" value={user.banReason} />}
        </>
      )}
    </div>
  );
}
