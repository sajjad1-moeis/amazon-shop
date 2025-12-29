"use client";

import React from "react";
import { Add } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function AddProductColumn({ onAdd }) {
  return (
    <button
      onClick={onAdd}
      className="bg-[#0968F60A] h-full dark:bg-dark-box rounded-2xl border-2 border-dashed border-primary-200 dark:border-dark-stroke p-8 flex flex-col items-center justify-center gap-3 hover:border-primary-500 dark:hover:border-primary-500 transition-colors min-h-[400px]"
    >
      <Add size={32} className="text-primary-400 dark:text-dark-text" />
      <span className="text-sm font-medium text-primary-400 dark:text-dark-text">افزودن کالا به مقایسه</span>
    </button>
  );
}
