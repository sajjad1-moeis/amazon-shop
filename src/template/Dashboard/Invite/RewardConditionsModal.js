"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RewardConditionsModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-transparent border-0">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-right">
              چطور از دعوت دوستان امتیاز بگیرم؟
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Introduction */}
            <p className="text-gray-700 dark:text-gray-300 text-right">
              با دعوت از دوستانتان به میکرولس امتیاز دریافت کنید.
            </p>

            {/* Section 1 */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-right">
                ۱. ثبت نام موفق دوست شما
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-right leading-relaxed">
                هر دوست وقتی با لینک دعوت شما ثبت نام کند، شما ۵۰ امتیاز می‌گیرید.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-right">
                ۲. اولین خرید دوست شما
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-right leading-relaxed">
                اگر او اولین خرید خود را انجام دهد، ۳٪ مبلغ اولین سفارش به عنوان پاداش به شما تعلق می‌گیرد.
              </p>
            </div>

            {/* Conclusion */}
            <p className="text-gray-700 dark:text-gray-300 text-right leading-relaxed">
              هرچه دوستان بیشتری دعوت کنید، امتیاز بیشتری جمع می‌کنید و می‌توانید از این امتیازها برای تخفیف، خرید یا مزایای ویژه استفاده کنید.
            </p>

            {/* Guide Link */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="link"
                className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 p-0 h-auto font-medium"
                onClick={() => {
                  // Navigate to points guide page
                  window.location.href = "/dashboard/points-guide";
                }}
              >
                راهنمای استفاده از امتیازات
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}




