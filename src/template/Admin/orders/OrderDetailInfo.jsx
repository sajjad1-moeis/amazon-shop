"use client";

import React from "react";
import Link from "next/link";
import { User, Sms, Call, Calendar, ReceiptEdit } from "iconsax-reactjs";
import { formatDateTimeFa } from "@/utils/adminDateUtils";

const InfoRow = ({ icon: Icon, label, value, href }) => {
  const content = (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 border border-gray-600">
      <Icon size={20} className="text-gray-300 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="text-gray-400 truncate">{value || "-"}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }
  return content;
};

export default function AdminOrderDetailInfo({ order }) {
  const customerName =
    order?.customerName ??
    order?.userFullName ??
    order?.userName ??
    order?.customerFullName ??
    order?.fullName ??
    "-";
  const customerEmail =
    order?.customerEmail ??
    order?.userEmail ??
    order?.email ??
    "-";
  const customerPhone =
    order?.customerPhone ??
    order?.userPhone ??
    order?.phoneNumber ??
    order?.phone ??
    order?.mobile ??
    "-";
  const userId = order?.userId ?? order?.user?.id;

  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <ReceiptEdit size={20} />
        اطلاعات مشتری و سفارش
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <InfoRow icon={User} label="نام مشتری" value={customerName} />
        <InfoRow
          icon={Sms}
          label="ایمیل"
          value={customerEmail}
          href={customerEmail && customerEmail !== "-" ? `mailto:${customerEmail}` : undefined}
        />
        <InfoRow
          icon={Call}
          label="شماره تماس"
          value={customerPhone}
          href={customerPhone && customerPhone !== "-" ? `tel:${customerPhone}` : undefined}
        />
        <InfoRow icon={Calendar} label="تاریخ ثبت سفارش" value={formatDateTimeFa(order?.createdAt ?? order?.orderDate)} />
        {userId && (
          <InfoRow
            icon={User}
            label="پروفایل کاربر"
            value="مشاهده پروفایل"
            href={`/admin/users/${userId}`}
          />
        )}
      </div>
    </div>
  );
}
