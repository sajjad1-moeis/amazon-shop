"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AddressModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    phone: "",
    address: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        name: initialData.name || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        postalCode: initialData.postalCode || "",
      });
    } else {
      setFormData({
        title: "",
        name: "",
        phone: "",
        address: "",
        postalCode: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "عنوان آدرس الزامی است";
    }
    if (!formData.name.trim()) {
      newErrors.name = "نام گیرنده الزامی است";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "شماره تماس الزامی است";
    } else if (!/^09\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "شماره تماس معتبر نیست";
    }
    if (!formData.address.trim()) {
      newErrors.address = "آدرس الزامی است";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "کد پستی الزامی است";
    } else if (!/^\d{10}$/.test(formData.postalCode.replace(/\s/g, ""))) {
      newErrors.postalCode = "کد پستی باید ۱۰ رقم باشد";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        title: "",
        name: "",
        phone: "",
        address: "",
        postalCode: "",
      });
      setErrors({});
      toast.success(initialData ? "آدرس با موفقیت ویرایش شد" : "آدرس با موفقیت اضافه شد");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "ویرایش آدرس" : "افزودن آدرس جدید"}</DialogTitle>
          <DialogDescription>
            {initialData ? "اطلاعات آدرس را ویرایش کنید" : "آدرس جدید خود را اضافه کنید"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">عنوان آدرس *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="مثال: خانه، اداره،..."
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">نام گیرنده *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="نام و نام خانوادگی"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">شماره تماس *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">آدرس *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="آدرس کامل را وارد کنید"
              rows={4}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
          </div>

          {/* Postal Code */}
          <div>
            <Label htmlFor="postalCode">کد پستی *</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
              placeholder="۱۲۳۴۵۶۷۸۹۰"
              className={errors.postalCode ? "border-red-500" : ""}
            />
            {errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
              {initialData ? "ذخیره تغییرات" : "افزودن آدرس"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

