"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RewardConditionsModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-dark-box px-4 sm:px-6" dir="rtl">
        <DialogHeader className="px-0">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-primary-700 dark:text-dark-title">
            چطور از دعوت دوستان امتیاز بگیرم؟
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-4">
          {/* Introduction */}
          <p className="text-sm sm:text-base text-gray-700 dark:text-dark-text text-right">
            با دعوت از دوستانتان به میکرولس امتیاز دریافت کنید.
          </p>

          {/* Section 1 */}
          <div className="bg-gray-50 dark:bg-dark-field rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-dark-titre mb-2 text-right">
              ۱. ثبت نام موفق دوست شما
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm dark:text-dark-text text-right leading-relaxed">
              هر دوست وقتی با لینک دعوت شما ثبت نام کند، شما ۵۰ امتیاز می‌گیرید.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-gray-50 dark:bg-dark-field rounded-xl p-3 sm:p-4 md:p-5 border border-gray-200 dark:border-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-dark-titre mb-2 text-right">
              ۲. اولین خرید دوست شما
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm dark:text-dark-text text-right leading-relaxed">
              اگر او اولین خرید خود را انجام دهد، ۳٪ مبلغ اولین سفارش به عنوان پاداش به شما تعلق می‌گیرد.
            </p>
          </div>

          {/* Conclusion */}
          <p className="text-sm sm:text-base text-gray-700 dark:text-primary-300 text-right leading-relaxed">
            هرچه دوستان بیشتری دعوت کنید، امتیاز بیشتری جمع میکنید و میتوانید از این امتیازها برای تخفیف خرید با مزایای
            ویژه استفاده کنید.
          </p>

          {/* Guide Link */}
          <div className="text-center sm:text-right">
            <Button
              variant="link"
              className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 p-0 h-auto font-medium text-xs sm:text-sm"
              onClick={() => {
                // Navigate to points guide page
                window.location.href = "/dashboard/points-guide";
              }}
            >
              راهنمای استفاده از امتیازات
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
