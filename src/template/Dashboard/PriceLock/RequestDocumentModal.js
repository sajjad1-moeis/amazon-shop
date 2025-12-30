"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Warning2 } from "iconsax-reactjs";
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

  const requiredInfo = [
    "شماره سفارش",
    "تاریخ سفارش",
    "نام محصول",
    "قیمت نهایی محصول",
    "آدرس تحویل",
    "نام و نام خانوادگی گیرنده",
  ];

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
            برای درخواست مستند خرید، لطفا یک اسکرین‌شات از صفحه ثبت سفارش خود در سایت آمازون (یا هر سایت دیگری که از آن
            خرید کرده‌اید) تهیه کنید. این اسکرین‌شات باید شامل اطلاعات زیر باشد:
          </p>

          {/* Warning/Information Box */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Warning2 size={24} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                {requiredInfo.map((info, index) => (
                  <p key={index} className="text-sm text-gray-700 dark:text-dark-text dark:bg-white/5 text-right">
                    {info}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Concluding Paragraph */}
          <p className="text-sm text-gray-700 dark:text-dark-text dark:bg-white/5 leading-relaxed text-right">
            پس از تهیه اسکرین‌شات، آن را در بخش تیکت‌های پشتیبانی برای ما ارسال کنید. مستند خرید شما حداکثر تا ۲۴ ساعت
            کاری آماده و برای شما ارسال خواهد شد.
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
