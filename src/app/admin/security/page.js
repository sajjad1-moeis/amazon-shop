"use client";

import React from "react";
import { Lock, DocumentText, Profile2User } from "iconsax-reactjs";
import { AdminPageHeader, AdminCardLink } from "@/components/admin";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="امنیت" subtitle="مدیریت امنیت سیستم" icon={Lock} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminCardLink href="/admin/security/logs" title="لاگ‌های سیستم" description="مشاهده لاگ‌های سیستم" icon={DocumentText} />
        <AdminCardLink href="/admin/security/permissions" title="دسترسی‌ها" description="مدیریت دسترسی‌ها" icon={Lock} />
        <AdminCardLink href="/admin/security/admins" title="کاربران ادمین" description="مدیریت کاربران ادمین" icon={Profile2User} />
      </div>
    </div>
  );
}

