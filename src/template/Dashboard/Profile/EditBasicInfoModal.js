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

// Dynamic form fields configuration
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
    placeholder: "ایمیل خود را وارد کنید",
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-2xl font-bold">ویرایش اطلاعات اصلی</DialogTitle>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              تکمیل شده
            </span>
          </div>
          <DialogDescription className="text-sm text-gray-600 dark:text-dark-text">
            اطلاعات شخصی خود را ویرایش کنید
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Profile Image Upload */}
          <ProfileImageUpload
            image={formData.profileImage}
            onImageChange={(image) => handleChange("profileImage", image)}
          />

          {/* Dynamic Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-sm font-semibold">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className={errors[field.id] ? "border-red-500" : ""}
                  dir="rtl"
                  maxLength={field.maxLength}
                />
                {errors[field.id] && <p className="text-sm text-red-500">{errors[field.id]}</p>}
              </div>
            ))}
          </div>

          <DialogFooter className="flex gap-3 sm:gap-0">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1 sm:flex-initial">
              لغو
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white flex-1 sm:flex-initial">
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
