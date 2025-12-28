"use client";

import React from "react";
import { Add } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function AddProductColumn({ onAdd }) {
  return (
    <button
      onClick={onAdd}
      className="bg-white dark:bg-dark-box rounded-2xl border-2 border-dashed border-gray-300 dark:border-dark-stroke p-8 flex flex-col items-center justify-center gap-3 hover:border-primary-500 dark:hover:border-primary-500 transition-colors min-h-[400px]"
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-field flex items-center justify-center">
        <Add size={32} className="text-gray-400 dark:text-dark-text" />
      </div>
      <span className="text-sm font-medium text-gray-600 dark:text-dark-text">افزودن کالا به مقایسه</span>
    </button>
  );
}


