"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BankSelector from "./BankSelector";
import { toast } from "sonner";

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
      <DialogContent className="max-w-[780px] rounded-2xl px-8 py-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary-700 mb-8">
            ویرایش اطلاعات مالی
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ===== اطلاعات مالی پایه ===== */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-primary-700">اطلاعات مالی پایه</h4>
              <p className="text-sm text-gray-500">برای واریز وجه، برداشت، بازگشت پول، خدمات ارزی</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>شماره شبا</Label>
                <Input
                  value={formData.shaba}
                  onChange={(e) => handleChange("shaba", e.target.value)}
                  placeholder="شماره شبا را وارد کنید ..."
                  className="h-10 bg-gray-50"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label>شماره حساب بانکی</Label>
                <Input
                  value={formData.bankAccount}
                  onChange={(e) => handleChange("bankAccount", e.target.value)}
                  placeholder="شماره حساب معتبر ..."
                  className="h-10 bg-gray-50"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label>بانک</Label>
                <BankSelector value={formData.bank} onChange={(value) => handleChange("bank", value)} />
              </div>

              <div className="space-y-2">
                <Label>نام صاحب حساب</Label>
                <Input
                  value={formData.accountHolderName}
                  onChange={(e) => handleChange("accountHolderName", e.target.value)}
                  placeholder="نام دقیق مطابق اطلاعات بانکی"
                  className="h-10 bg-gray-50"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* ===== کارت بانکی ===== */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-primary-700">کارت بانکی</h4>
              <p className="text-sm text-gray-500">برای خرید، پرداخت ریالی، شارژ کیف پول</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>شماره کارت</Label>
                <Input
                  value={formData.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  placeholder="۴۰۳۷-****-****-****"
                  className="h-10 bg-gray-50"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label>نام صاحب کارت</Label>
                <Input
                  value={formData.cardHolderName}
                  onChange={(e) => handleChange("cardHolderName", e.target.value)}
                  placeholder="نام روی کارت"
                  className="h-10 bg-gray-50"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label>CVV2</Label>
                <Input
                  value={formData.cvv2}
                  onChange={(e) => handleChange("cvv2", e.target.value)}
                  placeholder="چهار رقم"
                  className="h-10 bg-gray-50"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label>تاریخ انقضا</Label>
                <Input
                  value={formData.expiryDate}
                  onChange={(e) => handleChange("expiryDate", e.target.value)}
                  placeholder="MM/YY"
                  className="h-10 bg-gray-50"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* ===== دکمه‌ها ===== */}
          <DialogFooter className="grid grid-cols-2 gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-12 border-primary-700 text-primary-700"
            >
              لغو
            </Button>
            <Button type="submit" className="h-12 bg-primary-700 hover:bg-[#2a4a6f]">
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

