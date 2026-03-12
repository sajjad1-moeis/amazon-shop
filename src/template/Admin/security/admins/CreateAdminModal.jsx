"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { securityService } from "@/services/security/securityService";
import { unwrapApiData } from "@/services/api/client";

export default function CreateAdminModal({ open, onOpenChange, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.phoneNumber || !form.password || !form.firstName || !form.lastName) {
      toast.error("تمام فیلدهای الزامی را پر کنید");
      return;
    }
    if (form.password.length < 6) {
      toast.error("رمز عبور حداقل ۶ کاراکتر باشد");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        password: form.password,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
      };
      const res = await securityService.createAdmin(payload);
      unwrapApiData(res);
      toast.success("ادمین با موفقیت ایجاد شد");
      setForm({ email: "", phoneNumber: "", password: "", firstName: "", lastName: "" });
      onSuccess?.();
    } catch (err) {
      toast.error(err.message || "خطا در ایجاد ادمین");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">افزودن ادمین جدید</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-gray-400">نام</Label>
              <Input name="firstName" value={form.firstName} onChange={handleChange} className="bg-gray-700 border-gray-600 mt-1" required />
            </div>
            <div>
              <Label className="text-gray-400">نام خانوادگی</Label>
              <Input name="lastName" value={form.lastName} onChange={handleChange} className="bg-gray-700 border-gray-600 mt-1" required />
            </div>
          </div>
          <div>
            <Label className="text-gray-400">ایمیل</Label>
            <Input name="email" type="email" value={form.email} onChange={handleChange} className="bg-gray-700 border-gray-600 mt-1" required />
          </div>
          <div>
            <Label className="text-gray-400">شماره تلفن</Label>
            <Input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="bg-gray-700 border-gray-600 mt-1" required />
          </div>
          <div>
            <Label className="text-gray-400">رمز عبور (حداقل ۶ کاراکتر)</Label>
            <Input name="password" type="password" value={form.password} onChange={handleChange} className="bg-gray-700 border-gray-600 mt-1" required minLength={6} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-gray-600">
              انصراف
            </Button>
            <Button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-gray-900">
              {loading ? "در حال ایجاد..." : "ایجاد ادمین"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
