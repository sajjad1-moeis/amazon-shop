"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Edit2, Profile } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import EditBasicInfoModal from "./EditBasicInfoModal";
import { cn } from "@/lib/utils";

const initialData = {
  fullName: "محمد داوری",
  phone: "۰۹۱۲۴۵۲۲۴۵۶",
  email: "",
  nationalId: "۶۶۰۰۳۴۵۶۷۸",
  verificationStatusText: "تکمیل شده",
  membershipDate: "۱۴۰۲/۰۴/۲۱",
  avatar: "",
};

export default function BasicInfoCard() {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      {/* Header */}
      <div className="flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-dark-titre">
          <Profile size={24} className="sm:w-7 sm:h-7" variant="Bold" />
          <span className="text-lg sm:text-xl">اطلاعات اصلی</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="gap-1 sm:gap-2 px-2 sm:px-3 border-2 text-primary-700 rounded-lg border-primary-700 dark:text-dark-title dark:border-dark-title text-xs sm:text-sm"
          onClick={() => setOpen(true)}
        >
          <Edit2 size={14} className="sm:w-4 sm:h-4" />
          ویرایش
        </Button>
      </div>

      {/* Main Info */}
      <div class="mb-3  md:hidden">
        <div className="size-16 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-stroke bg-gray-100 dark:bg-dark-field flex items-center justify-center flex-shrink-0">
          {data.avatar ? (
            <Image src={data.avatar} alt="avatar" width={64} height={64} className="object-cover" />
          ) : (
            <User size={24} className="sm:w-7 sm:h-7 text-gray-400" />
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
          <div className="size-16 max-md:hidden rounded-lg overflow-hidden border border-gray-200 dark:border-dark-stroke bg-gray-100 dark:bg-dark-field flex items-center justify-center flex-shrink-0">
            {data.avatar ? (
              <Image src={data.avatar} alt="avatar" width={64} height={64} className="object-cover" />
            ) : (
              <User size={24} className="sm:w-7 sm:h-7 text-gray-400" />
            )}
          </div>
          {/* Fields */}
          <Row className={"sm:mx-0"} label="نام و نام خانوادگی" value={data.fullName} />
        </div>
        <Row className={"lg:mx-auto sm:mx-0"} label="شماره تماس" value={data.phone} />
        <Row className={"lg:mx-auto sm:mx-0"} label="ایمیل" value={data.email || "---"} />
        <Row className={"xl:mx-auto sm:mx-0"} label="کد ملی" value={data.nationalId} />
        <div className="text-xs sm:text-sm flex flex-col lg:items-center">
          <p className="mb-1 sm:mb-2 px-2 sm:px-3 py-1 w-max rounded-md bg-green-100 dark:bg-green-900/30 dark:text-green-300 text-green-700 text-xs font-medium">
            {data.verificationStatusText}
          </p>
          <p className="text-gray-400 dark:text-caption lg:text-center text-xs">وضعیت احراز هویت</p>
        </div>
        <Row className={"lg:mx-auto sm:mx-0"} label="تاریخ عضویت" value={data.membershipDate} />
      </div>

      {/* Modal */}
      <EditBasicInfoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={data}
        onSave={(values) => setData({ ...data, ...values })}
      />
    </div>
  );
}

/* ---------- Small Component ---------- */
export function Row({ label, value, mono, className }) {
  return (
    <div className={cn("flex flex-col text-xs sm:text-sm", className)}>
      <p
        className={`mb-1 sm:mb-2 text-gray-600 dark:text-dark-titre font-medium break-words ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
      <p className="text-gray-400 dark:text-caption text-xs">{label}</p>
    </div>
  );
}
