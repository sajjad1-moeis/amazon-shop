"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BankSelector from "./BankSelector";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { filterInputStyles } from "@/utils/filterStyles";

export default function EditFinancialInfoModal({ isOpen, onClose, initialData }) {
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

  const handleChange = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("اطلاعات مالی با موفقیت ذخیره شد");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="max-w-[780px] rounded-2xl px-4 sm:px-6 md:px-8 py-4 sm:py-6 dark:bg-dark-box max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-0">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center sm:text-right text-primary-700 dark:text-dark-title mb-4 sm:mb-8">
            ویرایش اطلاعات مالی
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* ===== اطلاعات مالی پایه ===== */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-primary-700 dark:text-dark-title">
                اطلاعات مالی پایه
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-caption">
                برای واریز وجه، برداشت، بازگشت پول، خدمات ارزی
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">شماره شبا</Label>
                <Input
                  value={formData.shaba}
                  onChange={(e) => handleChange("shaba", e.target.value)}
                  placeholder="شماره شبا را وارد کنید ..."
                  className={cn("h-10 sm:h-11 bg-gray-50 text-sm", filterInputStyles)}
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">شماره حساب بانکی</Label>
                <Input
                  value={formData.bankAccount}
                  onChange={(e) => handleChange("bankAccount", e.target.value)}
                  placeholder="شماره حساب معتبر ..."
                  className={cn("h-10 sm:h-11 bg-gray-50 text-sm", filterInputStyles)}
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">بانک</Label>
                <BankSelector value={formData.bank} onChange={(value) => handleChange("bank", value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">نام صاحب حساب</Label>
                <Input
                  value={formData.accountHolderName}
                  onChange={(e) => handleChange("accountHolderName", e.target.value)}
                  placeholder="نام دقیق مطابق اطلاعات بانکی"
                  className={cn("h-10 sm:h-11 bg-gray-50 text-sm", filterInputStyles)}
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-dark-stroke" />

          {/* ===== کارت بانکی ===== */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-primary-700 dark:text-dark-title">
                کارت بانکی
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-caption">
                برای خرید، پرداخت ریالی، شارژ کیف پول
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">شماره کارت</Label>
                <Input
                  value={formData.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  placeholder="۴۰۳۷-****-****-****"
                  className={cn("h-10 sm:h-11 bg-gray-50 text-sm", filterInputStyles)}
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">نام صاحب کارت</Label>
                <Input
                  value={formData.cardHolderName}
                  onChange={(e) => handleChange("cardHolderName", e.target.value)}
                  placeholder="نام روی کارت"
                  className={cn("h-10 sm:h-11 bg-gray-50 text-sm", filterInputStyles)}
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">CVV2</Label>
                <Input
                  value={formData.cvv2}
                  onChange={(e) => handleChange("cvv2", e.target.value)}
                  placeholder="چهار رقم"
                  className={cn("h-10 sm:h-11 bg-gray-50 text-sm", filterInputStyles)}
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">تاریخ انقضا</Label>
                <Input
                  value={formData.expiryDate}
                  onChange={(e) => handleChange("expiryDate", e.target.value)}
                  placeholder="MM/YY"
                  className={cn("h-10 sm:h-11 bg-gray-50 text-sm", filterInputStyles)}
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* ===== دکمه‌ها ===== */}
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6 px-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full dark:border-primary-400 border-2 dark:text-primary-400 text-sm sm:text-base"
            >
              لغو
            </Button>
            <Button
              type="submit"
              className="bg-primary-600 w-full hover:bg-primary-700 text-white text-sm sm:text-base"
            >
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
