"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PurchaseCard({ product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Product Image */}
      <div className="relative w-full h-40 mb-3  overflow-hidden rounded-xl bg-gray-100">
        <Image src={product.image} alt={product.title} fill className="object-cover" />
      </div>

      <div class=" p-3">
        {/* Title */}
        <p className="text-sm text-gray-800 leading-6 mb-3 ">{product.title}</p>

        {/* 3 Boxes Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Purchase Date */}
          {/* ID */}
          <div className="bg-gray-50 rounded-xl p-2 text-center flex-1">
            <div className="text-sm text-gray-900">{product.id}</div>
            <div className="text-xs text-gray-500 mt-3 mb-1">شماره</div>
          </div>

          {/* Amount */}
          <div className="bg-gray-50 rounded-xl p-2 text-center flex-1">
            <div className="text-sm text-gray-900">{product.amount}</div>
            <div className="text-xs text-gray-500 mt-3 mb-1">مبلغ (تومان)</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-2 text-center flex-1">
            <div className="text-sm text-gray-900">{product.purchaseDate}</div>
            <div className="text-xs text-gray-500 mt-3 mb-1">تاریخ خرید</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 h-9 border-primary-700  text-primary-700  text-sm py-2 rounded-lg"
          >
            مشاهده
          </Button>
          <Button className="flex-1 bg-primary-700 h-9 text-white text-sm py-2 rounded-lg">ثبت نظر</Button>
        </div>
      </div>
    </div>
  );
}
