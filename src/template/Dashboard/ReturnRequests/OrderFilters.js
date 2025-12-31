"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchNormal1, InfoCircle } from "iconsax-reactjs";
import { mockOrders } from "@/data";
import { filterInputStyles, filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";

export default function OrderFilters({ orders = mockOrders, selectedOrder, onOrderSelect, onFiltersChange }) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    sortBy: "",
    status: "",
    category: "",
  });

  const handleOrderClick = (order) => {
    onOrderSelect(order);
  };

  // Filter and sort orders based on filters
  const filteredOrders = React.useMemo(() => {
    let filtered = [...orders];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) || order.date.includes(query) || order.totalAmount.includes(query)
      );
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    // Sort
    if (filters.sortBy === "newest") {
      filtered.sort((a, b) => {
        // Simple date comparison (assuming Persian date format)
        return b.date.localeCompare(a.date);
      });
    } else if (filters.sortBy === "oldest") {
      filtered.sort((a, b) => {
        return a.date.localeCompare(b.date);
      });
    }

    return filtered;
  }, [filters, orders]);

  // Notify parent component about filter changes
  React.useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filteredOrders);
    }
  }, [filteredOrders, onFiltersChange]);

  return (
    <div>
      <h3 className="text-lg  text-gray-900 dark:text-dark-titre mb-4">انتخاب سفارش</h3>

      {/* Info Banner */}
      <div className="bg-primary-50 w-fit text-sm text-primary-400 dark:bg-dark-blue dark:text-dark-title  rounded-lg p-2 mb-4">
        فقط محصولاتی را میتوانید مرجوع کنید که{" "}
        <span className="text-primary-500 font-bold dark:text-dark-title">شرایط مرجوعی</span> را داشته باشند
      </div>

      {/* Filters */}
      <div className="flex-between  gap-4 mb-4">
        {/* Search */}
        <div className="w-1/3 relative">
          <SearchNormal1 size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="جستجو در سفارشها..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className={`pr-10 ${filterInputStyles}`}
          />
        </div>

        <div className="flex gap-2">
          {/* Category */}
          <Select
            value={filters.category || undefined}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger className={filterSelectTriggerStyles}>
              <SelectValue placeholder="دسته بندی" />
            </SelectTrigger>
            <SelectContent className={filterSelectContentStyles}>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="electronics">الکترونیک</SelectItem>
              <SelectItem value="clothing">پوشاک</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={filters.status || undefined}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
          >
            <SelectTrigger className={filterSelectTriggerStyles}>
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent className={filterSelectContentStyles}>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="delivered">تحویل شده</SelectItem>
              <SelectItem value="shipped">ارسال شده</SelectItem>
            </SelectContent>
          </Select>
          {/* Sort By */}
          <Select
            value={filters.sortBy || undefined}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
          >
            <SelectTrigger className={filterSelectTriggerStyles}>
              <SelectValue placeholder="مرتب سازی" />
            </SelectTrigger>
            <SelectContent className={filterSelectContentStyles}>
              <SelectItem value="newest">جدیدترین</SelectItem>
              <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
