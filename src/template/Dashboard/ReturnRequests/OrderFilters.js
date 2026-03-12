"use client";

import React, { useState, useCallback } from "react";
import ReturnRequestsFilter from "./ReturnRequestsFilter";

const initialFilters = {
  searchQuery: "",
  category: "all",
  status: "all",
  sortBy: "all",
};

function OrderFilters() {
  const [filters, setFilters] = useState(initialFilters);
  const onFiltersChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <ReturnRequestsFilter
      filters={filters}
      onFiltersChange={onFiltersChange}
      placeholder="جستجو بر اساس شماره درخواست یا نام کالا..."
    />
  );
}

export default OrderFilters;
