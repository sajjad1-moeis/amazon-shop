"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileImageUpload from "./ProfileImageUpload";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { filterInputStyles } from "@/utils/filterStyles";

// Dynamic form fields configuration - Order: fullName, phone, email, nationalId
const formFields = [
  {
    id: "fullName",
    label: "نام و نام خانوادگی",
    placeholder: "نام و نام خانوادگی را وارد کنید",
    type: "text",
    required: true,
    validation: (value) => {
      if (!value.trim()) return "نام و نام خانوادگی الزامی است";
      return null;
    },
  },
  {
    id: "phone",
    label: "شماره تماس",
    placeholder: "09123456789",
    type: "tel",
    required: true,
    validation: (value) => {
      if (!value.trim()) return "شماره تماس الزامی است";
      if (!/^09\d{9}$/.test(value.replace(/[\s-]/g, ""))) return "شماره تماس معتبر نیست";
      return null;
    },
  },
  {
    id: "email",
    label: "ایمیل (اختیاری)",
    placeholder: "ایمیل خود را وارد کنید ...",
    type: "email",
    required: false,
    validation: (value) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "ایمیل معتبر نیست";
      return null;
    },
  },
  {
    id: "nationalId",
    label: "کد ملی",
    placeholder: "کد ملی را وارد کنید",
    type: "text",
    required: true,
    maxLength: 10,
    validation: (value) => {
      if (!value.trim()) return "کد ملی الزامی است";
      if (!/^\d{10}$/.test(value.replace(/\s/g, ""))) return "کد ملی معتبر نیست";
      return null;
    },
  },
];

export default function EditBasicInfoModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    nationalId: initialData?.nationalId || "",
    profileImage: initialData?.avatar || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate all fields dynamically
    formFields.forEach((field) => {
      const error = field.validation(formData[field.id]);
      if (error) newErrors[field.id] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSave) {
      onSave(formData);
    }

    toast.success("اطلاعات با موفقیت به‌روزرسانی شد");
    onClose();
  };

  const handleClose = () => {
    setFormData({
      fullName: initialData?.fullName || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      nationalId: initialData?.nationalId || "",
      profileImage: initialData?.avatar || "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} dir="rtl">
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto dark:bg-dark-box" dir="rtl">
        <DialogHeader>
          <div className={"flex-between mt-7"}>
            <DialogTitle className="text-2xl font-bold text-center text-primary-700 dark:text-dark-title">
              ویرایش اطلاعات اصلی
            </DialogTitle>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-dark-text">وضعیت احراز هویت</span>
                <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  تکمیل شده
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Main Content: Profile Image + Form Fields */}
          <div className="flex gap-4 ">
            {/* Right Column: Profile Image - 50% */}
            <div className="flex flex-col items-center md:items-start max-w-[176px]">
              <ProfileImageUpload
                image={formData.profileImage}
                onImageChange={(image) => handleChange("profileImage", image)}
              />
            </div>

            {/* Left Column: Form Fields - 50% with 2x2 grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {formFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="text-sm font-semibold text-gray-700 dark:text-dark-text">
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={cn(errors[field.id] ? "border-red-500" : "", filterInputStyles)}
                    dir="rtl"
                    maxLength={field.maxLength}
                  />
                  {errors[field.id] && <p className="text-sm text-red-500">{errors[field.id]}</p>}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="flex-row gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full dark:border-primary-400 border-2 dark:text-primary-400"
            >
              لغو
            </Button>
            <Button type="submit" className="bg-primary-600 w-full hover:bg-primary-700 text-white">
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
