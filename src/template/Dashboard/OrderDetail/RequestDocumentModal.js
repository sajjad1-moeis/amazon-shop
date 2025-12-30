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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary-700 dark:text-dark-title dark:text-primary-600">
            درخواست مستند خرید
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Introductory Paragraph */}
          <p className="text-sm text-gray-700 dark:text-dark-text dark:bg-white/5 leading-relaxed text-right">
            با ثبت این درخواست، پس از خرید نهایی کالا، یک اسکرین‌شات از صفحه ثبت سفارش در وبسایت فروشنده (مثلا Amazon)
            در بخش مستندات همین سفارش برای شما نمایش داده می‌شود. این تصویر نشان می‌دهد که کالا مستقیماً از آمازون
            خریداری شده است.
          </p>

          {/* Highlighted Information Box */}
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 text-primary-400">
            <p className="leading-relaxed text-right">
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

        <DialogFooter className="grid grid-cols-2 gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="border-primary-700 text-primary-700 hover:bg-primary-50 dark:border-primary-600 dark:text-primary-400 dark:hover:bg-primary-900/20 flex-1 sm:flex-initial"
          >
            لغو
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary-700 hover:bg-primary-800 text-white flex-1 sm:flex-initial"
          >
            {loading ? "در حال ثبت..." : "ثبت درخواست مستند خرید"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
