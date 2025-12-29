"use client";

import React from "react";
import HistoryFilter from "./HistoryFilter";
import HistoryTable from "./HistoryTable";

export default function HistoryTab({ filteredHistory, historyFilters, onFiltersChange }) {
  return (
    <div className="bg-white dark:bg-dark-box shadow-box rounded-2xl shadow-sm p-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-lg text-gray-900 dark:text-dark-title">لیست محصولات</h2>
        <div className="text-sm text-gray-700 dark:text-dark-text">
          تعداد کل :
          <span className="font-semibold text-yellow-600 dark:text-yellow-400 mr-1">{filteredHistory.length} عدد</span>
        </div>
      </div>

      <HistoryFilter filters={historyFilters} onFiltersChange={onFiltersChange} />

      <div className="mt-6">
        <HistoryTable locks={filteredHistory} />
      </div>
    </div>
  );
}

