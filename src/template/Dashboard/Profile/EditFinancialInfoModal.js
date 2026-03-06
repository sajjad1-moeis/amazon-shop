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
import BankSelector from "./BankSelector";
import { toast } from "sonner";

// Dynamic form fields configuration
const basicFinancialFields = [
  {
    id: "shaba",
    label: "شماره شبا",
    placeholder: "شماره شبا را وارد کنید",
    type: "text",
    validation: (value) => {
      if (!value.trim()) return "شماره شبا الزامی است";
      if (!/^IR\d{24}$/.test(value.replace(/\s/g, ""))) return "شماره شبا معتبر نیست";
      return null;
    },
  },
  {
    id: "bankAccount",
    label: "شماره حساب بانکی",
    placeholder: "شماره حساب معتبر...",
    type: "text",
    validation: (value) => {
      if (!value.trim()) return "شماره حساب الزامی است";
      return null;
    },
  },
  {
    id: "accountHolderName",
    label: "نام صاحب حساب",
    placeholder: "نام دقیق مطابق اطلاعات بانکی",
    type: "text",
    validation: (value) => {
      if (!value.trim()) return "نام صاحب حساب الزامی است";
      return null;
    },
  },
];

const cardFields = [
  {
    id: "cardNumber",
    label: "شماره کارت",
    placeholder: "۴۰۳۷-۰۰۰۰۰۰۰۰۰۰۰۰",
    type: "text",
    format: (value) => {
      const cleaned = value.replace(/\s/g, "").replace(/-/g, "");
      return cleaned.match(/.{1,4}/g)?.join("-") || cleaned;
    },
    maxLength: 19,
    dir: "ltr",
    validation: (value) => {
      if (value && value.replace(/-/g, "").length < 16) return "شماره کارت معتبر نیست";
      return null;
    },
  },
  {
    id: "cvv2",
    label: "CVV2",
    placeholder: "چهار رقم",
    type: "text",
    format: (value) => value.replace(/\D/g, "").substring(0, 4),
    maxLength: 4,
    dir: "ltr",
    validation: (value, formData) => {
      if (formData.cardNumber && !value) return "CVV2 الزامی است";
      return null;
    },
  },
  {
    id: "expiryDate",
    label: "تاریخ انقضا",
    placeholder: "MM/YY",
    type: "text",
    format: (value) => {
      let cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 2) {
        cleaned = cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
      }
      return cleaned;
    },
    maxLength: 5,
    dir: "ltr",
    validation: (value, formData) => {
      if (formData.cardNumber && !value) return "تاریخ انقضا الزامی است";
      return null;
    },
  },
  {
    id: "cardHolderName",
    label: "نام صاحب کارت",
    placeholder: "نام روی کارت",
    type: "text",
    dir: "rtl",
    validation: (value, formData) => {
      if (formData.cardNumber && !value.trim()) return "نام صاحب کارت الزامی است";
      return null;
    },
  },
];

export default function EditFinancialInfoModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    shaba: initialData?.shaba || "",
    bankAccount: initialData?.bankAccount || "",
    bank: initialData?.bank || "",
    accountHolderName: initialData?.accountHolderName || "",
    cardNumber: initialData?.cardNumber || "",
    cvv2: initialData?.cvv2 || "",
    expiryDate: initialData?.expiryDate || "",
    cardHolderName: initialData?.cardHolderName || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFieldChange = (field, value, formatFn) => {
    const formattedValue = formatFn ? formatFn(value) : value;
    handleChange(field, formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate basic financial fields
    basicFinancialFields.forEach((field) => {
      const error = field.validation(formData[field.id]);
      if (error) newErrors[field.id] = error;
    });

    // Validate bank
    if (!formData.bank) {
      newErrors.bank = "لطفا بانک را انتخاب کنید";
    }

    // Validate card fields if card number is provided
    if (formData.cardNumber) {
      cardFields.forEach((field) => {
        const error = field.validation(formData[field.id], formData);
        if (error) newErrors[field.id] = error;
      });
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

  const handleClose = () => {
    setFormData({
      shaba: initialData?.shaba || "",
      bankAccount: initialData?.bankAccount || "",
      bank: initialData?.bank || "",
      accountHolderName: initialData?.accountHolderName || "",
      cardNumber: initialData?.cardNumber || "",
      cvv2: initialData?.cvv2 || "",
      expiryDate: initialData?.expiryDate || "",
      cardHolderName: initialData?.cardHolderName || "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} dir="rtl">
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">ویرایش اطلاعات مالی</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            اطلاعات بانکی و کارت خود را مدیریت کنید
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Basic Financial Information */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                اطلاعات مالی پایه
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                برای واریز وجه، برداشت، بازگشت پول، خدمات ارزی
              </p>
            </div>

            {/* Dynamic Basic Fields */}
            {basicFinancialFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-sm font-semibold">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={(e) => handleFieldChange(field.id, e.target.value, field.format)}
                  placeholder={field.placeholder}
                  className={errors[field.id] ? "border-red-500" : ""}
                  dir={field.dir || "rtl"}
                  maxLength={field.maxLength}
                />
                {errors[field.id] && <p className="text-sm text-red-500">{errors[field.id]}</p>}
              </div>
            ))}

            {/* Bank Selector */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">بانک</Label>
              <BankSelector value={formData.bank} onChange={(value) => handleChange("bank", value)} />
              {errors.bank && <p className="text-sm text-red-500">{errors.bank}</p>}
            </div>
          </div>

          {/* Bank Card Section */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">کارت بانکی</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                برای خرید، پرداخت ریالی، شارژ کیف پول
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dynamic Card Fields */}
              {cardFields.map((field) => (
                <div
                  key={field.id}
                  className={field.id === "cardNumber" || field.id === "cardHolderName" ? "md:col-span-2" : ""}
                >
                  <div className="space-y-2">
                    <Label htmlFor={field.id} className="text-sm font-semibold">
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      type={field.type}
                      value={formData[field.id]}
                      onChange={(e) => handleFieldChange(field.id, e.target.value, field.format)}
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                      className={errors[field.id] ? "border-red-500" : ""}
                      dir={field.dir || "rtl"}
                    />
                    {errors[field.id] && <p className="text-sm text-red-500">{errors[field.id]}</p>}
                  </div>
                </div>
              ))}
            </div>
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
