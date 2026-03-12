"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { securityService } from "@/services/security/securityService";
import { userService } from "@/services/user/userService";
import { unwrapApiData } from "@/services/api/client";

export default function EditAdminModal({ open, onOpenChange, admin, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    isActive: true,
    isEmailVerified: false,
    isPhoneVerified: false,
  });

  useEffect(() => {
    if (admin) {
      setForm({
        email: admin.email ?? "",
        phoneNumber: admin.phoneNumber ?? "",
        firstName: admin.firstName ?? "",
        lastName: admin.lastName ?? "",
        isActive: admin.isActive !== false,
        isEmailVerified: admin.isEmailVerified === true,
        isPhoneVerified: admin.isPhoneVerified === true,
      });
      setProfileImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileImageFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin?.id) return;
    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        isActive: form.isActive,
        isEmailVerified: form.isEmailVerified,
        isPhoneVerified: form.isPhoneVerified,
      };
      const res = await securityService.updateAdmin(admin.id, payload);
      unwrapApiData(res);
      if (profileImageFile) {
        try {
          await userService.uploadProfileImage(admin.id, profileImageFile);
        } catch (uploadErr) {
          console.error("Upload profile image:", uploadErr);
          toast.warning("اطلاعات ذخیره شد ولی آپلود تصویر پروفایل با خطا مواجه شد.");
        }
      }
      toast.success("ادمین با موفقیت به‌روزرسانی شد");
      setProfileImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onSuccess?.();
    } catch (err) {
      toast.error(err.message || "خطا در به‌روزرسانی ادمین");
    } finally {
      setLoading(false);
    }
  };

  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">ویرایش ادمین</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-gray-400">نام</Label>
              <Input name="firstName" value={form.firstName} onChange={handleChange} className="bg-gray-700 border-gray-600 mt-1" />
            </div>
            <div>
              <Label className="text-gray-400">نام خانوادگی</Label>
              <Input name="lastName" value={form.lastName} onChange={handleChange} className="bg-gray-700 border-gray-600 mt-1" />
            </div>
          </div>
          <div>
            <Label className="text-gray-400">ایمیل</Label>
            <Input name="email" type="email" value={form.email} onChange={handleChange} className="bg-gray-700 border-gray-600 mt-1" />
          </div>
          <div>
            <Label className="text-gray-400">شماره تلفن</Label>
            <Input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="bg-gray-700 border-gray-600 mt-1" />
          </div>
          <div>
            <Label className="text-gray-400">تصویر پروفایل (اختیاری)</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="edit-admin-profile-image"
            />
            <label
              htmlFor="edit-admin-profile-image"
              className="mt-1 flex items-center gap-2 cursor-pointer bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-600"
            >
              {profileImageFile ? profileImageFile.name : "انتخاب فایل تصویر"}
            </label>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-400">فعال</Label>
            <Switch  dir="ltr"   checked={form.isActive} onCheckedChange={(v) => setForm((p) => ({ ...p, isActive: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-400">ایمیل تأیید شده</Label>
            <Switch  dir="ltr"  checked={form.isEmailVerified} onCheckedChange={(v) => setForm((p) => ({ ...p, isEmailVerified: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-400">موبایل تأیید شده</Label>
            <Switch dir="ltr"   checked={form.isPhoneVerified} onCheckedChange={(v) => setForm((p) => ({ ...p, isPhoneVerified: v }))} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-gray-600">
              انصراف
            </Button>
            <Button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-gray-900">
              {loading ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
