"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, CardPos } from "iconsax-reactjs";
import EditFinancialInfoModal from "./EditFinancialInfoModal";

const financialData = {
  shaba: "IR۸۲۰۵۴۰۱۰۲۶۸۰۰۲۰۸۱۷۹۰۹۰۰۲",
  cardNumber: "۶۰۳۷ **** **** ۱۸۲۴",
};

export default function FinancialInfoCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [financialInfo, setFinancialInfo] = useState(financialData);

  const handleSave = (data) => {
    setFinancialInfo((prev) => ({
      ...prev,
      ...data,
      cardNumber: data.cardNumber
        ? `${data.cardNumber.substring(0, 4)} **** **** ${data.cardNumber.substring(data.cardNumber.length - 4)}`
        : prev.cardNumber,
    }));
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <CardPos size={24} className="text-primary-600 dark:text-primary-400" variant="Bold" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">اطلاعات مالی</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="gap-2"
        >
          <Edit2 size={16} />
          ویرایش
        </Button>
      </div>

      {/* Card Content */}
      <div className="space-y-4">
        {/* Shaba Number */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">شماره شبا</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white font-mono">
            {financialInfo.shaba}
          </p>
        </div>

        {/* Bank Card */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">کارت بانکی جهت پرداخت</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white font-mono">
            {financialInfo.cardNumber}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditFinancialInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={financialInfo}
        onSave={handleSave}
      />
    </div>
  );
}
