"use client";

import { Button } from "@/components/ui/button";
import { InfoCircle } from "iconsax-reactjs";

export default function ActionButtonsSection({
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  loading,
}) {
  return (
    <>
      {/* Buttons */}
      <div className="space-y-2 mt-3">
        <Button
          onClick={onAddToCart}
          disabled={loading}
          variant="ghost"
          className="w-full bg-yellow-400 text-black rounded-lg"
        >
          {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
        </Button>

        <Button
          onClick={onToggleFavorite}
          variant="ghost"
          className="w-full rounded-lg bg-gray-200 dark:bg-dark-stroke dark:text-dark-titre text-gray-600"
        >
          {isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        </Button>
      </div>

      <button className="text-[10px] text-gray-400 flex gap-1 mt-4 items-center">
        <InfoCircle size={16} variant="Bold" />
        شامل هزینه حمل و گمرک
      </button>
    </>
  );
}














