"use client";

import React from "react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function OrderItemsList({ order, selectedProductId, onProductSelect }) {
  // Show message if no order is selected
  if (!order) {
    return (
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          لطفاً ابتدا یک سفارش انتخاب کنید
        </p>
      </div>
    );
  }

  // Show message if order has no items
  if (!order.items || order.items.length === 0) {
    return (
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          این سفارش محصولی ندارد
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">انتخاب کالا برای مرجوعی</h3>
      <RadioGroup value={selectedProductId || ""} onValueChange={onProductSelect} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "border-2 rounded-lg p-4 transition-all",
                selectedProductId === item.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem value={item.id} id={item.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={item.id} className="cursor-pointer w-full">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {item.name}
                        </h4>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{item.quantity} عدد</div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">قیمت کالا (تومان) </span>
                          <span className="font-semibold text-gray-900 dark:text-white">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
