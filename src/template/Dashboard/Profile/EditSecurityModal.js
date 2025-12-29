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
      <DialogContent className="max-w-[720px] rounded-2xl px-8 py-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#1e3a5f] mb-8">ویرایش امنیت حساب</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current password */}
          <div className="space-y-2">
            <Label>رمز فعلی</Label>
            <div className="relative">
              <Input
                type={show.current ? "text" : "password"}
                placeholder="رمز عبور فعلی خود را وارد کنید ..."
                className="h-12 bg-gray-50 pr-4 pl-10"
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
                  className="h-12 bg-gray-50 pr-4 pl-10"
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
                  className="h-12 bg-gray-50 pr-4 pl-10"
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
          <DialogFooter className="grid grid-cols-2 gap-4 pt-6">
            <Button className="h-12 bg-[#1e3a5f] hover:bg-[#2a4a6f]">ذخیره تغییرات</Button>
            <Button variant="outline" className="h-12 border-[#1e3a5f] text-[#1e3a5f]">
              لغو
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
