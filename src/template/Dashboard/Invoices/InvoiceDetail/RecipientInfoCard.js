"use client";

import React from "react";

export default function RecipientInfoCard({ recipient }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4">اطلاعات گیرنده</h3>

      <div className="divide-y divide-gray-200">
        {/* Name */}
        <div className="flex justify-between items-center py-4">
          <span className="text-sm text-gray-500">نام گیرنده:</span>
          <span className="text-sm font-medium text-gray-900">{recipient.name}</span>
        </div>

        {/* Phone */}
        <div className="flex justify-between items-center py-4">
          <span className="text-sm text-gray-500">شماره تماس:</span>
          <span className="text-sm font-medium text-gray-900">{recipient.phone}</span>
        </div>

        {/* Address */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 py-4">
          <span className="text-sm text-gray-500">آدرس:</span>
          <span className="text-sm font-medium text-gray-900 text-right sm:text-left sm:max-w-[70%]">{recipient.address}</span>
        </div>

        {/* Delivery Type */}
        <div className="flex justify-between items-center py-4">
          <span className="text-sm text-gray-500">نوع تحویل:</span>
          <span className="text-sm font-medium text-gray-900">{recipient.deliveryType}</span>
        </div>
      </div>
    </div>
  );
}




