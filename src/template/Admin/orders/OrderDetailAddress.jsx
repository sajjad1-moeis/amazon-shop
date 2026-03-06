"use client";

import React from "react";
import { Location } from "iconsax-reactjs";

export default function AdminOrderDetailAddress({ address = {} }) {
  const addr = address || {};
  const parts = [
    addr.province,
    addr.city,
    addr.address,
    addr.street,
    addr.postalCode ? "کد پستی: " + addr.postalCode : null,
  ].filter(Boolean);
  const fullAddress = addr.fullAddress || addr.completeAddress || (parts.length > 0 ? parts.join("، ") : "-");

  const receiverName = addr.receiverName || addr.fullName || addr.recipientName || "-";
  const phone = addr.phone || addr.mobile || addr.phoneNumber || "-";

  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Location size={20} />
        آدرس تحویل
      </h2>
      <div className="space-y-3">
        <div>
          <p className="text-gray-500 text-xs">گیرنده</p>
          <p className="text-gray-200">{receiverName}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">شماره تماس</p>
          <p className="text-gray-200" dir="ltr">
            {phone}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">آدرس کامل</p>
          <p className="text-gray-200 leading-relaxed">{fullAddress}</p>
        </div>
      </div>
    </div>
  );
}
