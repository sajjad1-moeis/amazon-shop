"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, User } from "iconsax-reactjs";
import EditBasicInfoModal from "./EditBasicInfoModal";
import ProfileImageUpload from "./ProfileImageUpload";

const basicData = {
  fullName: "علی احمدی",
  phone: "۰۹۱۲۳۴۵۶۷۸۹",
  email: "ali.ahmadi@example.com",
  nationalId: "۱۲۳۴۵۶۷۸۹۰",
  avatar: "/images/default-avatar.jpg",
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
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">اطلاعات پایه</h3>
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

      {/* Profile Image */}
      <div className="mb-6">
        <ProfileImageUpload image={basicInfo.avatar} onImageChange={() => {}} />
      </div>

      {/* Card Content */}
      <div className="space-y-4">
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
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">ایمیل</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
            {basicInfo.email || "-"}
          </p>
        </div>

        {/* National ID */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">کد ملی</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white font-mono">
            {basicInfo.nationalId}
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

