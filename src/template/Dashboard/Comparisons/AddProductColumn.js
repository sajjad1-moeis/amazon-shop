"use client";

import React from "react";
import { Add } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function AddProductColumn({ onAdd }) {
  return (
    <button
      onClick={onAdd}
      className="bg-[#0968F60A] max-md:h-20 w-full h-full dark:bg-[#0968F614] rounded-2xl border-2 border-dashed border-primary-200 dark:border-dark-title/40 p-8 flex flex-col items-center justify-center md:gap-3 hover:border-primary-500 dark:hover:border-primary-500 transition-colors md:min-h-[400px]"
    >
      <Add size={32} className="text-primary-400 dark:text-dark-title flex-none" />
      <span className="text-sm font-medium text-primary-400 dark:text-dark-title">افزودن کالا به مقایسه</span>
    </button>
  );
}
