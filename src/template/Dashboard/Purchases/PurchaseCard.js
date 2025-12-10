"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PurchaseCard({ product }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-3 mb-4">
        {/* Purchase Date and Amount in one box */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">تاریخ خرید</span>
            <span className="font-medium text-gray-900 dark:text-white">{product.purchaseDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">مبلغ (تومان)</span>
            <span className="font-bold text-gray-900 dark:text-white">{product.amount}</span>
          </div>
        </div>

        {/* Number */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">شماره</span>
          <span className="font-medium text-gray-900 dark:text-white">{product.id}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2"
        >
          ثبت نظر
        </Button>
        <Button
          variant="outline"
          className="w-full border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20 text-sm font-medium py-2"
        >
          مشاهده
        </Button>
      </div>
    </div>
  );
}

