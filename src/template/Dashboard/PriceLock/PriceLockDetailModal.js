"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, CloseCircle } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import ConfirmDialog from "@/components/ConfirmDialog";
import OrderDocumentsCard from "./OrderDocumentsCard";

export default function PriceLockDetailModal({ lock, open, onOpenChange, onCancelLock }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!lock) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} dir="rtl">
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-bold text-primary-700 dark:text-dark-title text-center mb-0">
            جزئیات قفل قیمت
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Product Info Section */}
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-field">
              <Image
                src={lock.productImage}
                alt={lock.productName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">
                {lock.productName}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-dark-text">وضعیت</span>
                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-3 py-1 rounded-lg">
                  فعال
                </span>
              </div>
            </div>
          </div>

          {/* Countdown Banner and Amazon Link */}
          <div className="flex items-center justify-between gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg px-4 py-2 flex items-center gap-2">
              <Clock size={20} className="text-blue-700 dark:text-blue-400" />
              <span className="text-lg font-bold text-blue-700 dark:text-blue-400">{lock.countdown}</span>
            </div>
            <Link href="#" className="text-sm font-medium text-orange-600 hover:underline">
              مشاهده در آمازون
            </Link>
          </div>

          {/* Main Price Lock Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600 dark:text-dark-text">زمان باقی مانده</span>
              <span className="text-base font-semibold text-gray-900 dark:text-dark-title dark:text-dark-title">{lock.timeRemaining}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600 dark:text-dark-text">پیش پرداخت</span>
              <span className="text-base font-semibold text-gray-900 dark:text-dark-title dark:text-dark-title">{lock.downPayment}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600 dark:text-dark-text">قیمت قفل شده (تومان)</span>
              <span className="text-base font-semibold text-gray-900 dark:text-dark-title dark:text-dark-title">{lock.lockedPrice}</span>
            </div>
          </div>

          {/* More Details Section */}
          <div className="border-t border-gray-200 dark:border-dark-stroke pt-4">
            <h4 className="text-base font-bold text-gray-900 dark:text-dark-title mb-4">جزئیات بیشتر</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* First Row */}
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 dark:text-dark-text">قیمت نهایی</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {lock.finalPrice || "۷۲,۵۰۰,۰۰۰ تومان"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 dark:text-dark-text">هزینه حمل</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
                  {lock.shippingCost || "۱,۲۰۰,۰۰۰ تومان"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 dark:text-dark-text">قیمت پایه</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
                  {lock.basePrice || "۱,۲۹۹ AED"}
                </span>
              </div>

              {/* Second Row */}
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 dark:text-dark-text">نرخ تبدیل</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
                  {lock.conversionRate || "۱۸,۴۰۰"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 dark:text-dark-text">تاریخ ایجاد</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
                  {lock.creationDate || "۱۳:۰۹ - ۱۴۰۳/۱۰/۰۱"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 dark:text-dark-text">تاریخ پرداخت</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
                  {lock.paymentDate || "۱۳:۰۹ - ۱۴۰۳/۱۰/۰۱"}
                </span>
              </div>
            </div>
          </div>

          {/* Order Documents Section */}
          <div className="border-t border-gray-200 dark:border-dark-stroke pt-4">
            <OrderDocumentsCard documents={lock.documents || []} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-dark-stroke">
            <Button
              variant="outline"
              className="flex-1 bg-gray-100 dark:bg-dark-field hover:bg-gray-200 dark:bg-dark-field text-red-500 hover:text-red-600 border-red-200"
              onClick={() => setDeleteDialogOpen(true)}
            >
              لغو قفل
            </Button>
            <Button
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 dark:text-dark-title font-medium"
              onClick={() => {
                // Handle continue purchase
                console.log("Continue purchase with locked price");
              }}
            >
              ادامه خرید با قیمت قفل شده
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="لغو قفل قیمت"
        description="آیا از لغو قفل قیمت اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={() => {
          onCancelLock?.(lock.id);
          setDeleteDialogOpen(false);
          onOpenChange(false);
        }}
        theme="dashboard"
      />
    </Dialog>
  );
}

