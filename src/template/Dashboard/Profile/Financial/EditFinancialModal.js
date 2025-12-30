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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { filterInputStyles } from "@/utils/filterStyles";

const initialData = {
  shaba: "IR۸۲۰۵۴۰۱۰۲۶۸۰۰۲۰۸۱۷۹۰۹۰۰۲",
  cardNumber: "۶۰۳۷ .... .... ۱۸۲۴",
};

export default function EditFinancialModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.shaba.trim()) {
      newErrors.shaba = "شماره شبا الزامی است";
    } else if (!formData.shaba.startsWith("IR")) {
      newErrors.shaba = "شماره شبا باید با IR شروع شود";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "شماره کارت الزامی است";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSave) {
      onSave(formData);
    }

    toast.success("اطلاعات مالی با موفقیت به‌روزرسانی شد");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="sm:max-w-[500px] dark:bg-dark-box" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">ویرایش اطلاعات مالی</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-dark-text">
            اطلاعات حساب بانکی خود را ویرایش کنید
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Shaba Number */}
          <div className="space-y-2">
            <Label htmlFor="shaba" className="text-sm font-semibold">
              شماره شبا
            </Label>
            <Input
              id="shaba"
              value={formData.shaba}
              onChange={(e) => handleChange("shaba", e.target.value)}
              placeholder="IR..."
              className={cn(errors.shaba ? "border-red-500 font-mono" : "font-mono", filterInputStyles)}
              dir="rtl"
            />
            {errors.shaba && <p className="text-sm text-red-500">{errors.shaba}</p>}
          </div>

          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-sm font-semibold">
              کارت بانکی جهت پرداخت
            </Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleChange("cardNumber", e.target.value)}
              placeholder="شماره کارت را وارد کنید"
              className={cn(errors.cardNumber ? "border-red-500 font-mono" : "font-mono", filterInputStyles)}
              dir="rtl"
              maxLength={19}
            />
            {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
          </div>

          <DialogFooter className="flex-row gap-2">
            <Button
              type="button"
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

