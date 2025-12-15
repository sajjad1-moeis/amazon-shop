"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

/**
 * خروجی onSelect:
 * {
 *   orderId,
 *   productId
 * }
 */

export default function OrderProductSelector({ orders = [], selectedItem, onSelect }) {
  const [search, setSearch] = useState("");

  // Filter orders that have items matching the search query
  const filteredOrders = React.useMemo(() => {
    if (!search.trim()) {
      return orders.filter((order) => order.items && order.items.length > 0);
    }

    const searchLower = search.toLowerCase();
    return orders.filter(
      (order) =>
        order.items &&
        order.items.length > 0 &&
        order.items.some((item) => item.name.toLowerCase().includes(searchLower))
    );
  }, [orders, search]);

  return (
    <div>
      <RadioGroup
        value={selectedItem?.productId || ""}
        onValueChange={(productId) => {
          const order = orders.find((o) => o.items && o.items.some((i) => i.id === productId));
          if (order && onSelect) {
            onSelect({ orderId: order.id, productId });
          }
        }}
        className="space-y-4"
      >
        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            {search.trim() ? "کالایی با این جستجو یافت نشد" : "سفارشی یافت نشد"}
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="border rounded-xl p-4  bg-gray-50  border-gray-300 dark:bg-gray-800">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">شماره سفارش : </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">#{order.id}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">تاریخ سفارش : </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.date}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ کل : </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.totalAmount} تومان</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">وضعیت : </span>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {order.statusText}
                  </span>
                </div>
              </div>

              <div className="my-5  border-b border-gray-300"></div>

              {/* Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {order.items && order.items.length > 0 ? (
                  order.items
                    .filter((item) => (search.trim() ? item.name.toLowerCase().includes(search.toLowerCase()) : true))
                    .map((item) => {
                      const isSelected = selectedItem?.productId === item.id;

                      return (
                        <Label
                          key={item.id}
                          htmlFor={item.id}
                          className={cn(
                            "cursor-pointer border rounded-lg p-4 transition-all flex gap-4",
                            isSelected
                              ? "border-primary-300 bg-[#E5E8F599]"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          )}
                        >
                          <RadioGroupItem
                            value={item.id}
                            id={item.id}
                            className={cn(
                              "mt-1 border-2 transition-all accent-transparent",
                              isSelected
                                ? "border-primary-500 text-primary-500 focus:ring-primary-500 focus:ring-offset-2 accent-primary-500"
                                : "border-gray-300 text-gray-300 hover:border-primary-400 focus:ring-primary-500"
                            )}
                          />

                          {/* Image */}
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-semibold line-clamp-2">{item.name}</h4>
                            <div className="text-xs text-gray-500">{item.quantity} عدد</div>
                            <div className="text-sm">
                              <span className="text-gray-500">قیمت: </span>
                              <span className="font-semibold">{item.price}</span>
                            </div>
                          </div>
                        </Label>
                      );
                    })
                ) : (
                  <div className="col-span-2 text-center text-gray-500 dark:text-gray-400 py-4">
                    این سفارش محصولی ندارد
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </RadioGroup>
    </div>
  );
}
