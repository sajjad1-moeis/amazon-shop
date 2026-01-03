"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

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
          <div className="text-center text-gray-500 dark:text-dark-titre  py-8">
            {search.trim() ? "کالایی با این جستجو یافت نشد" : "سفارشی یافت نشد"}
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-4  bg-gray-50 dark:bg-dark-field dark:border-dark-stroke  border-gray-300 "
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <span className="text-sm text-gray-600 dark:text-dark-text">شماره سفارش : </span>
                  <span className="text-sm  text-gray-900 dark:text-dark-titre">#{order.id}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-dark-text">تاریخ سفارش : </span>
                  <span className="text-sm  text-gray-900 dark:text-dark-titre">{order.date}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-dark-text">مبلغ کل : </span>
                  <span className="text-sm  text-gray-900 dark:text-dark-titre">{order.totalAmount} تومان</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-dark-text">وضعیت : </span>
                  <StatusBadge status={order.status} />
                </div>
              </div>

              <div className="my-5  border-b border-gray-300 dark:border-dark-stroke"></div>

              <div class="flex-between mb-3">
                <p className="dark:text-dark-titre text-primary-700">کالاهای داخل سفارش</p>
                <p className="text-yellow-600">2 کالا</p>
              </div>

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
                              ? "border-primary-300 bg-[#E5E8F599] dark:bg-dark-gray-primary"
                              : "border-gray-200 dark:border-dark-box hover:border-gray-300 bg-white dark:bg-dark-box"
                          )}
                        >
                          <RadioGroupItem
                            value={item.id}
                            id={item.id}
                            className={cn(
                              "mt-1 border-2 transition-all accent-transparent",
                              isSelected
                                ? "border-primary-500 text-primary-500 focus:ring-primary-500 focus:ring-offset-2 accent-primary-500 dark:accent-primary-300"
                                : "border-gray-300 text-gray-300 hover:border-primary-400 focus:ring-primary-500"
                            )}
                          />
                          <div class="w-full">
                            <div class="flex gap-2">
                              {/* Image */}
                              <div className="relative size-10  md:size-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-field flex-shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                              </div>

                              {/* Info */}
                              <div className="flex-1 space-y-1">
                                <h4 className="text-sm  line-clamp-2">{item.name}</h4>
                              </div>
                            </div>
                            <div class="grid lg:grid-cols-2 mt-2 gap-3">
                              <div
                                className={cn(
                                  "text-xs flex-between text-gray-500 dark:text-dark-titre p-2 rounded-lg",
                                  isSelected
                                    ? "bg-[#B6BCDF66] dark:bg-primary-200/40"
                                    : "bg-gray-100 dark:bg-dark-field"
                                )}
                              >
                                <p className="text-gray-600 dark:text-dark-text">تعداد</p>
                                <div>{item.quantity} عدد</div>
                              </div>
                              <div
                                className={cn(
                                  "text-xs flex-between text-gray-500 dark:text-dark-titre p-2 rounded-lg",
                                  isSelected
                                    ? "bg-[#B6BCDF66] dark:bg-primary-200/40"
                                    : "bg-gray-100 dark:bg-dark-field"
                                )}
                              >
                                <p className="text-gray-600 dark:text-dark-text">قیمت کالا (تومان)</p>
                                <div>{item.price} </div>
                              </div>
                            </div>
                          </div>
                        </Label>
                      );
                    })
                ) : (
                  <div className="col-span-2 text-center text-gray-500 dark:text-dark-titre  py-4">
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
