"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchNormal1, InfoCircle } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

// Mock orders data
const mockOrders = [
  {
    id: "A-45219",
    date: "۱۴۰۳/۱۰/۱۸",
    totalAmount: "۴,۲۸۰,۰۰۰",
    status: "delivered",
    statusText: "تحویل شده",
    items: [
      {
        id: "p1",
        name: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
        image: "/image/Home/product.png",
        quantity: 1,
        price: "۲۷,۴۵۰,۰۰۰",
      },
      {
        id: "p2",
        name: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
        image: "/image/Home/product.png",
        quantity: 1,
        price: "۲۷,۴۵۰,۰۰۰",
      },
    ],
  },
];

export default function OrderSelector({ selectedOrder, onOrderSelect }) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    sortBy: "",
    status: "",
    category: "",
  });

  const handleOrderClick = (order) => {
    onOrderSelect(order);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">انتخاب سفارش</h3>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <InfoCircle size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            فقط محصولاتی را میتوانید مرجوع کنید که شرایط مرجوعی را داشته باشند
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 relative">
          <SearchNormal1
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input
            type="text"
            placeholder="جستجو در سفارشها..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="pr-10"
          />
        </div>

        {/* Sort By */}
        <Select
          value={filters.sortBy || undefined}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
        >
          <SelectTrigger className="w-full md:w-[160px]">
            <SelectValue placeholder="مرتب سازی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select
          value={filters.status || undefined}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
        >
          <SelectTrigger className="w-full md:w-[160px]">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="delivered">تحویل شده</SelectItem>
            <SelectItem value="shipped">ارسال شده</SelectItem>
          </SelectContent>
        </Select>

        {/* Category */}
        <Select
          value={filters.category || undefined}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
        >
          <SelectTrigger className="w-full md:w-[160px]">
            <SelectValue placeholder="دسته بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="electronics">الکترونیک</SelectItem>
            <SelectItem value="clothing">پوشاک</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Order Card */}
      {mockOrders.map((order) => (
        <div
          key={order.id}
          onClick={() => handleOrderClick(order)}
          className={cn(
            "border-2 rounded-lg p-4 cursor-pointer transition-all",
            selectedOrder?.id === order.id
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          )}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">شماره سفارش : </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">#{order.id}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">تاریخ سفارش : </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.date}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ کل </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.totalAmount} تومان</span>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ کل تحویل شده </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {order.statusText}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

