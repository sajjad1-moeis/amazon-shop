"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "iconsax-reactjs";

export default function StickyAddToCart({ onAddToCart, loading, price, className }) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-dark-box border-t border-gray-200 dark:border-dark-stroke p-2 shadow-lg md:hidden",
        className
      )}
    >
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400">قیمت نهایی</span>
          <span className="text-lg font-bold text-gray-900 dark:text-dark-titre">
            {price ? `${Number(price).toLocaleString("fa-IR")} تومان` : "قیمت نامشخص"}
          </span>
        </div>
        <div class="flex gap-2">
          <Button>
            <Heart />
          </Button>

          <Button
            onClick={onAddToCart}
            disabled={loading}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg"
          >
            {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
          </Button>
        </div>
      </div>
    </div>
  );
}


















