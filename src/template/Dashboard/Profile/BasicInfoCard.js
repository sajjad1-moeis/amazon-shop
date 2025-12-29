"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Edit2, Profile } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import EditBasicInfoModal from "./EditBasicInfoModal";

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-[#292D32CC]">
          <Profile size={28} variant="Bold" />
          <span className=" text-xl">اطلاعات اصلی</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 px-3 border-2 text-primary-700 rounded-lg border-primary-700"
          onClick={() => setOpen(true)}
        >
          <Edit2 size={16} />
          ویرایش
        </Button>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Avatar */}
        <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 dark:border-dark-stroke bg-gray-100 dark:bg-dark-field flex items-center justify-center flex-shrink-0">
            {data.avatar ? (
              <Image src={data.avatar} alt="avatar" width={64} height={64} className="object-cover" />
            ) : (
              <User size={28} className="text-gray-400" />
            )}
          </div>
          {/* Fields */}
          <Row label="نام و نام خانوادگی" value={data.fullName} />
        </div>
        <Row label="شماره تماس" value={data.phone} />
        <Row label="ایمیل" value={data.email || "---"} />
        <Row label="کد ملی" value={data.nationalId} />
        <div className="text-sm">
          <p className="mb-2 px-3 py-1 w-max mx-auto rounded-full bg-green-100 text-green-700 text-xs font-medium">
            {data.verificationStatusText}
          </p>
          <p className="text-gray-400 text-center">وضعیت احراز هویت</p>
        </div>
        <Row label="تاریخ عضویت" value={data.membershipDate} />
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
export function Row({ label, value, mono }) {
  return (
    <div className=" justify-between text-sm">
      <p className={`mb-2 text-gray-600 dark:text-dark-text font-medium ${mono ? "font-mono" : ""}`}>{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}
