"use client";

import React from "react";

export default function ContactStats({ totalCount, currentPage, totalPages }) {
  return (
    <div className="mb-4 text-sm text-gray-400">
      تعداد کل: {totalCount} | صفحه {currentPage} از {totalPages}
    </div>
  );
}

