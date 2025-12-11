"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, User } from "iconsax-reactjs";
import EditBasicInfoModal from "./EditBasicInfoModal";
import Image from "next/image";

const basicData = {
  fullName: "محمد داوری",
  phone: "۰۹۱۲۴۵۲۲۴۵۶",
  email: "",
  nationalId: "۶۶۰۰۳۴۵۶۷۸",
  verificationStatus: "completed",
  verificationStatusText: "تکمیل شده",
  membershipDate: "۱۴۰۲/۰۴/۲۱",
  avatar: "",
};

export default function BasicInfoCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [basicInfo, setBasicInfo] = useState(basicData);

  const handleSave = (data) => {
    setBasicInfo((prev) => ({
      ...prev,
      ...data,
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
            <User size={24} className="text-primary-600 dark:text-primary-400" variant="Bold" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">اطلاعات اصلی</h3>
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

      {/* Profile Image & Content */}
      <div className="flex items-start gap-6 mb-6">
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
            {basicInfo.avatar ? (
              <Image
                src={basicInfo.avatar}
                alt="Profile"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={32} className="text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Basic Info Fields */}
        <div className="flex-1 space-y-4">
          {/* Full Name */}
          <div className="flex items-center justify-between py-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">نام و نام خانوادگی</p>
            <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
              {basicInfo.fullName}
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between py-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">شماره تماس</p>
            <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
              {basicInfo.phone}
            </p>
          </div>

          {/* Email */}
          {basicInfo.email && (
            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">ایمیل</p>
              <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                {basicInfo.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        {/* National ID */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">کد ملی</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white font-mono">
            {basicInfo.nationalId}
          </p>
        </div>

        {/* Verification Status */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">وضعیت احراز هویت</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {basicInfo.verificationStatusText}
          </span>
        </div>

        {/* Membership Date */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">تاریخ عضویت</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
            {basicInfo.membershipDate}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditBasicInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={basicInfo}
        onSave={handleSave}
      />
    </div>
  );
}
