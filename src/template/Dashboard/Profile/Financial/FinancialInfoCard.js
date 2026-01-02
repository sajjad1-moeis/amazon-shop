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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-gray-700 dark:text-dark-titre">
          <Cards size={28} variant="Bold" />
          <span className=" text-xl">اطلاعات مالی</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 px-3 border-2 text-primary-700 rounded-lg border-primary-700 dark:text-dark-title dark:border-dark-title"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit2 size={16} />
          ویرایش
        </Button>
      </div>

      {/* Card Content */}
      <div className="flex-between">
        <Row label="شماره شبا" value={financialInfo.shaba} />
        <Row label="کارت بانکی جهت پرداخت" value={financialInfo.cardNumber} />
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
