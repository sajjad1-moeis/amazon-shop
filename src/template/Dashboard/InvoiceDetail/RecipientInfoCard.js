"use client";

import React from "react";

export default function RecipientInfoCard({ recipient = {} }) {
  const infoItems = [
    { label: "نام گیرنده", value: recipient.name },
    { label: "شماره تماس", value: recipient.phone },
    { label: "کد ملی", value: recipient.nationalId },
    { label: "نوع تحویل", value: recipient.deliveryType },
  ];

  return (
    <div className="bg-white dark:border-dark-stroke h-full dark:bg-dark-box rounded-xl border border-gray-200  p-3">
      <h3 className="text-lg  text-gray-800 dark:text-dark-titre mb-6">اطلاعات گیرنده</h3>

      {/* Main Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center  border-b border-gray-200 dark:border-dark-stroke pb-4"
          >
            <span className="text-sm text-gray-500 dark:text-caption">{item.label}:</span>
            <span className="text-sm text-gray-800 dark:text-dark-titre">{item.value || "-"}</span>
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="flex justify-between items-start py-4">
        <span className="text-sm text-gray-500 dark:text-caption">آدرس:</span>
        <span className="text-sm  text-gray-800 dark:text-dark-titre text-left max-w-[70%]">
          {recipient.address || "-"}
        </span>
      </div>
    </div>
  );
}
