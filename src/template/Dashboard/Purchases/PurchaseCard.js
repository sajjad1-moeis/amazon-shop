"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PurchaseCard({ product }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke">
      {/* Product Image */}
      <div className="relative w-full h-40 md:mb-3  overflow-hidden rounded-t-xl bg-gray-100 dark:bg-dark-field">
        <Image src={product.image} alt={product.title} fill className="object-cover" />
      </div>

      <div className="p-2 md:p-3">
        {/* Title */}
        <p className="text-xs md:text-sm text-gray-800 dark:text-dark-titre leading-6 mb-3">{product.title}</p>

        {/* 3 Boxes Row */}
        <div className="flex flex-wrap  gap-1 md:gap-2 mb-3 md:mb-4">
          {/* Purchase Date */}
          {/* ID */}
          <div className="bg-gray-50 dark:bg-dark-field rounded-xl p-2 text-center md:flex-1">
            <div className="text-sm text-gray-900 dark:text-dark-titre">{product.id}</div>
            <div className="text-xs text-gray-500 dark:text-dark-text mt-3 mb-1">شماره</div>
          </div>

          {/* Amount */}
          <div className="bg-gray-50 dark:bg-dark-field rounded-xl p-2 text-center md:flex-1 max-md:flex-auto">
            <div className="text-sm text-gray-900 dark:text-dark-titre">{product.amount}</div>
            <div className="text-xs text-gray-500 dark:text-dark-text mt-3 mb-1">مبلغ (تومان)</div>
          </div>

          <div className="bg-gray-50 dark:bg-dark-field rounded-xl p-2 text-center md:flex-1 max-md:flex-auto">
            <div className="text-sm text-gray-900 dark:text-dark-titre">{product.purchaseDate}</div>
            <div className="text-xs text-gray-500 dark:text-dark-text mt-3 mb-1">تاریخ خرید</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 max-md:hidden border-2 h-9 border-primary-700 dark:border-primary-400 dark:text-primary-400  text-primary-700  text-sm py-2 rounded-lg"
          >
            مشاهده
          </Button>
          <Button className="flex-1 bg-primary-700 dark:bg-dark-primary h-9 text-white text-sm py-2 rounded-lg">
            ثبت نظر
          </Button>
        </div>
      </div>
    </div>
  );
}
