"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RequestDocumentModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("درخواست مستند با موفقیت ثبت شد");
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto dark:bg-dark-box" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary-700 dark:text-dark-title">
            درخواست مستند خرید
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Introductory Paragraph */}
          <p className="text-sm text-gray-700 dark:text-dark-text leading-relaxed text-right">
            با ثبت این درخواست، پس از خرید نهایی کالا، یک اسکرین‌شات از صفحه ثبت سفارش در وبسایت فروشنده (مثلا Amazon)
            در بخش مستندات همین سفارش برای شما نمایش داده می‌شود. این تصویر نشان می‌دهد که کالا مستقیماً از آمازون
            خریداری شده است.
          </p>

          {/* Highlighted Information Box */}
          <div className="bg-primary-50  border dark:bg-dark-blue border-primary-200 dark:border-primary-800 rounded-lg p-4">
            <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed text-right">
              این اسکرین‌شات شامل اطلاعاتی مانند نام کالا، وضعیت سفارش و مرجع خرید است. اطلاعات حساس مانند نام حساب،
              آدرس، اطلاعات پرداخت و جزئیات شخصی به صورت ایمن مخفی یا محو شده‌اند.
            </p>
          </div>

          {/* Concluding Paragraph */}
          <p className="text-sm text-gray-500 dark:text-dark-text leading-relaxed text-right">
            مستند خرید پس از تکمیل فرآیند خرید از آمازون تهیه می‌شود و به محض آماده شدن، در بخش مستندات سفارش در دسترس
            شما قرار خواهد گرفت.
          </p>
        </div>

        <DialogFooter className="flex-row gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="w-full dark:border-primary-400 border-2 dark:text-primary-400"
          >
            لغو
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary-600 w-full dark:bg-dark-primary hover:bg-primary-700 text-white  dark:hover:bg-primary-600"
          >
            {loading ? "در حال ثبت..." : "ثبت درخواست مستند خرید"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
