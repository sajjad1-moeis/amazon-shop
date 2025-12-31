"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Cards } from "iconsax-reactjs";
import EditFinancialInfoModal from "./EditFinancialInfoModal";
import { Row } from "../BasicInfo/BasicInfoCard";

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
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-dark-titre">
          <Cards size={24} className="sm:w-7 sm:h-7" variant="Bold" />
          <span className="text-lg sm:text-xl">اطلاعات مالی</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 sm:gap-2 px-2 sm:px-3 border-2 text-primary-700 rounded-lg border-primary-700 dark:text-dark-title dark:border-dark-title text-xs sm:text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit2 size={14} className="sm:w-4 sm:h-4" />
          ویرایش
        </Button>
      </div>

      {/* Card Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
        <Row label="شماره شبا" value={financialInfo.shaba} className="w-full sm:w-auto" />
        <Row label="کارت بانکی جهت پرداخت" value={financialInfo.cardNumber} className="w-full sm:w-auto" />
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
