"use client";

import React from "react";
import { Input } from "@/components/ui/input";

export default function AmountInput({ value, onChange, currency }) {
  return (
    <div>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="مبلغ را وارد کنید"
        min="1"
        className="mb-2"
      />
      {value && currency && (
        <p className="text-sm text-gray-500 dark:text-dark-text">
          معادل: {parseInt(value) * 50000} تومان (نرخ تقریبی)
        </p>
      )}
    </div>
  );
}

