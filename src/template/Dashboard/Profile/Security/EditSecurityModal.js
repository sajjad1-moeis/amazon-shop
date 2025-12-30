"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeSlash } from "iconsax-reactjs";
import TwoFactorToggle from "./TwoFactorToggle";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { filterInputStyles } from "@/utils/filterStyles";

export default function EditSecurityModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggle = (key) => setShow((p) => ({ ...p, [key]: !p[key] }));

  const handleChange = (key, value) => setFormData((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("تغییرات با موفقیت ذخیره شد");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="max-w-[720px] rounded-2xl px-8 py-6 dark:bg-dark-box">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#1e3a5f] dark:text-dark-title mb-8">
            ویرایش امنیت حساب
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current password */}
          <div className="space-y-2">
            <Label>رمز فعلی</Label>
            <div className="relative">
              <Input
                type={show.current ? "text" : "password"}
                placeholder="رمز عبور فعلی خود را وارد کنید ..."
                className={cn("h-12 bg-gray-50 pr-4 pl-10", filterInputStyles)}
                onChange={(e) => handleChange("currentPassword", e.target.value)}
              />
              <button
                type="button"
                onClick={() => toggle("current")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {show.current ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New + Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>رمز عبور جدید</Label>
              <div className="relative">
                <Input
                  type={show.new ? "text" : "password"}
                  placeholder="رمز عبور جدید را وارد کنید ..."
                  className={cn("h-12 bg-gray-50 pr-4 pl-10", filterInputStyles)}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => toggle("new")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {show.new ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>تکرار رمز عبور جدید</Label>
              <div className="relative">
                <Input
                  type={show.confirm ? "text" : "password"}
                  placeholder="تکرار رمز عبور جدید ..."
                  className={cn("h-12 bg-gray-50 pr-4 pl-10", filterInputStyles)}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => toggle("confirm")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {show.confirm ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-4" />

          {/* Two factor */}
          <TwoFactorToggle enabled={formData.twoFactorEnabled} onToggle={(v) => handleChange("twoFactorEnabled", v)} />

          {/* Footer */}
          <DialogFooter className="flex-row gap-2 pt-6">
            <Button
              variant="outline"
              onClick={onClose}
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
