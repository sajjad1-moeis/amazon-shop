"use client";

import React from "react";
import HistoryFilter from "./HistoryFilter";
import HistoryTable from "./HistoryTable";
import ViewAllTable from "@/components/ViewAllTable";

export default function HistoryTab({ filteredHistory, historyFilters, onFiltersChange }) {
  return (
    <div className="bg-white dark:bg-dark-box shadow-box rounded-2xl shadow-sm p-3">
      <div className="flex-between gap-4 mb-6">
        <h2 className="md:text-lg text-gray-900 dark:text-dark-titre">لیست محصولات</h2>
        <div className="text-sm text-gray-700 dark:text-dark-text">
          تعداد کل :
          <span className="font-semibold text-yellow-600 dark:text-yellow-400 mr-1">{filteredHistory.length} عدد</span>
        </div>
      </div>

      <HistoryFilter filters={historyFilters} onFiltersChange={onFiltersChange} />

      <div className="mt-6 space-y-6">
        <HistoryTable locks={filteredHistory} />
        <ViewAllTable className={"lg:hidden"} />
      </div>
    </div>
  );
}
