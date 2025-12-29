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
import TwoFactorToggle from "./TwoFactorToggle";
import { Eye, EyeSlash } from "iconsax-reactjs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function EditSecurityModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "رمز عبور فعلی الزامی است";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "رمز عبور جدید الزامی است";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "رمز عبور باید حداقل ۸ کاراکتر باشد";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "تکرار رمز عبور الزامی است";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن مطابقت ندارند";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSave) {
      onSave({
        twoFactorEnabled: formData.twoFactorEnabled,
        // In real app, you would send password change request to server
      });
    }

    toast.success("تنظیمات امنیتی با موفقیت به‌روزرسانی شد");

    // Reset form
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: formData.twoFactorEnabled,
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: true,
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} dir="rtl">
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl">ویرایش امنیت حساب</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-dark-text dark:text-dark-text">
            رمز عبور و تنظیمات امنیتی خود را تغییر دهید
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-sm font-semibold">
              رمز فعلی
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => handleChange("currentPassword", e.target.value)}
                placeholder="رمز عبور فعلی خود را وارد کنید ..."
                className={cn(errors.currentPassword ? "border-red-500" : "")}
                dir="rtl"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-dark-text"
              >
                {showPasswords.current ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword}</p>}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-sm font-semibold">
              رمز عبور جدید
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                placeholder="رمز عبور جدید را وارد کنید ..."
                className={cn(errors.newPassword ? "border-red-500" : "")}
                dir="rtl"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-dark-text"
              >
                {showPasswords.new ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-semibold">
              تکرار رمز عبور جدید
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                placeholder="تکرار رمز عبور جدید را وارد کنید ..."
                className={cn(errors.confirmPassword ? "border-red-500" : "")}
                dir="rtl"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-dark-text"
              >
                {showPasswords.confirm ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* Two-Factor Authentication */}
          <TwoFactorToggle
            enabled={formData.twoFactorEnabled}
            onToggle={(enabled) => handleChange("twoFactorEnabled", enabled)}
          />

          <DialogFooter className="flex gap-3 ">
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
