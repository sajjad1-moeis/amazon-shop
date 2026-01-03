"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, CloseCircle } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import ConfirmDialog from "@/components/ConfirmDialog";
import OrderDocumentsCard from "./OrderDocumentsCard";
import PriceLockCard from "./PriceLockCard";
import { ACTIVE_LOCKS } from "@/app/dashboard/price-lock/page";

export default function PriceLockDetailModal({ lock, open, onOpenChange, onCancelLock }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!lock) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} dir="rtl">
      <DialogContent
        className="max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl dark:bg-dark-box px-4 sm:px-6"
        dir="rtl"
      >
        <DialogHeader className="relative px-0">
          <DialogTitle className="text-lg sm:text-xl font-bold text-primary-700 dark:text-dark-title text-center mb-0">
            جزئیات قفل قیمت
          </DialogTitle>
        </DialogHeader>
        <PriceLockCard removeBorder removeHandler />

        {/* Action Buttons */}
        <div className="border p-2 rounded-xl border-gray-200  dark:bg-dark-field dark:border-dark-stroke">
          <h4 className="text-sm sm:text-base  text-gray-900 dark:text-dark-titre mb-4">جزئیات بیشتر</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* First Row */}
            <div className="flex flex-col md:flex-row gap-1">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">قیمت نهایی</span>
              <span className="text-xs sm:text-sm  text-primary-600 dark:text-dark-title">
                {lock.finalPrice || "۷۲,۵۰۰,۰۰۰ تومان"}
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-1">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">هزینه حمل</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-dark-titre">
                {lock.shippingCost || "۱,۲۰۰,۰۰۰ تومان"}
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-1">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">قیمت پایه</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-dark-titre">
                {lock.basePrice || "۱,۲۹۹ AED"}
              </span>
            </div>

            {/* Second Row */}
            <div className="flex flex-col md:flex-row gap-1">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">نرخ تبدیل</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-dark-titre">
                {lock.conversionRate || "۱۸,۴۰۰"}
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-1">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">تاریخ ایجاد</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-dark-titre">
                {lock.creationDate || "۱۳:۰۹ - ۱۴۰۳/۱۰/۰۱"}
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-1">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">تاریخ پرداخت</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-dark-titre">
                {lock.paymentDate || "۱۳:۰۹ - ۱۴۰۳/۱۰/۰۱"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-dark-stroke">
          <Button
            variant="ghost"
            className="flex-1 bg-gray-100 dark:bg-dark-field hover:bg-gray-200 dark:hover:bg-dark-field/80 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 border-red-200 dark:border-red-800 text-sm sm:text-base h-10 sm:h-11"
            onClick={() => setDeleteDialogOpen(true)}
          >
            لغو قفل
          </Button>
          <Button
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900  font-medium text-sm sm:text-base h-10 sm:h-11"
            onClick={() => {
              // Handle continue purchase
              console.log("Continue purchase with locked price");
            }}
          >
            ادامه خرید با قیمت قفل شده
          </Button>
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
