"use client";

import { Button } from "@/components/ui/button";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";
import { useState } from "react";
import { getDisplayPriceToman, formatPriceToman, parseProductNum } from "@/utils/productHelpers";

export default function PurchaseSection({ selectedDelivery, setSelectedDelivery, productId, product, quantity = 1 }) {
  const [loading, setLoading] = useState(false);

  const productIdStr = String(productId ?? "");
  const isScraperProduct = /^[A-Z0-9]{10}$/i.test(productIdStr);
  const displayPrice = product ? getDisplayPriceToman(product) : 0;
  const rawOriginalAed = product ? parseProductNum(product?.original_price ?? product?.originalPrice) : 0;
  const rawCurrentAed = product
    ? parseProductNum(product?.current_price ?? product?.currentPrice ?? product?.basePriceAed)
    : 0;
  const isPlausibleAed = (v) => Number.isFinite(v) && v > 0 && v <= 100_000;
  const originalPriceAed = isPlausibleAed(rawOriginalAed) ? rawOriginalAed : 0;
  const currentPriceAed = isPlausibleAed(rawCurrentAed) ? rawCurrentAed : 0;
  const discountPctFromProduct = product ? parseProductNum(product?.discount_percentage ?? product?.discountPercentage) : 0;
  const hasScraperDiscount =
    isScraperProduct &&
    ((discountPctFromProduct > 0 && discountPctFromProduct <= 99) ||
      (originalPriceAed > 0 && currentPriceAed > 0 && currentPriceAed < originalPriceAed));
  const hasDbDiscount =
    !isScraperProduct &&
    originalPriceAed > 0 &&
    (discountPctFromProduct > 0 || (currentPriceAed > 0 && currentPriceAed < originalPriceAed));
  const listPrice = product ? parseProductNum(product?.original_price ?? product?.price ?? product?.discountPrice) || displayPrice : displayPrice;
  const hasDiscount = isScraperProduct
    ? hasScraperDiscount
    : hasDbDiscount || (displayPrice > 0 && listPrice > displayPrice && listPrice > 0);
  const discountPercentRaw = hasDiscount
    ? isScraperProduct && (discountPctFromProduct > 0 || originalPriceAed > 0)
      ? discountPctFromProduct > 0
        ? Math.round(Number(discountPctFromProduct))
        : originalPriceAed > 0 && currentPriceAed > 0 && currentPriceAed < originalPriceAed
          ? Math.round(((originalPriceAed - currentPriceAed) / originalPriceAed) * 100)
          : 0
      : hasDbDiscount && (discountPctFromProduct > 0 || (originalPriceAed > 0 && currentPriceAed < originalPriceAed))
        ? discountPctFromProduct > 0
          ? Math.round(Number(discountPctFromProduct))
          : Math.round(((originalPriceAed - currentPriceAed) / originalPriceAed) * 100)
        : listPrice > 0
          ? Math.round(((listPrice - displayPrice) / listPrice) * 100)
          : 0
    : 0;
  const discountPercent = Math.min(99, Math.max(0, discountPercentRaw));
  const strikethroughAed =
    (isScraperProduct || hasDbDiscount) && originalPriceAed > 0 && hasDiscount
      ? `${Number(originalPriceAed).toLocaleString("fa-IR", { maximumFractionDigits: 2 })} درهم`
      : null;
  const priceDisplay = displayPrice > 0 ? formatPriceToman(displayPrice) : "قیمت نامشخص";
  const listPriceDisplay = listPrice > 0 ? formatPriceToman(listPrice) : "";

  const handleAddToCart = async () => {
    if (!productId) {
      toast.error("شناسه محصول یافت نشد");
      return;
    }

    try {
      setLoading(true);
      await shoppingCartService.addItem({
        productId,
        quantity,
      });
      toast.success("محصول به سبد خرید اضافه شد");
    } catch (error) {
      toast.error(error.message || "خطا در افزودن به سبد خرید");
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" space-y-4">
      {/* Delivery Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 text-right">نوع ارسال</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="delivery"
              value="express"
              checked={selectedDelivery === "express"}
              onChange={(e) => setSelectedDelivery(e.target.value)}
              className="w-4 h-4 text-blue-600 dark:text-blue-500"
            />
            <div className="flex-1 flex justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">ارسال اکسپرس</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">۲۰ روز کاری</span>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="delivery"
              value="standard"
              checked={selectedDelivery === "standard"}
              onChange={(e) => setSelectedDelivery(e.target.value)}
              className="w-4 h-4 text-blue-600 dark:text-blue-500"
            />
            <div className="flex-1 flex justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">ارسال عادی</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">۳۰ روز کاری</span>
            </div>
          </label>
        </div>
      </div>

      {/* Price — هم‌سو با کارت محصول و باکس قیمت صفحه: تومان + در صورت تخفیف اسکرپر خط‌خورده درهم */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{priceDisplay}</span>
        </div>
        {hasDiscount && (strikethroughAed ?? listPriceDisplay) && (
          <div className="flex items-center gap-2 mb-3">
            {discountPercent > 0 && (
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-1 rounded">
                {discountPercent}٪
              </span>
            )}
            <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
              {strikethroughAed ?? listPriceDisplay}
            </span>
          </div>
        )}
      </div>

      {/* Seller */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 text-right">فروشگاه</h3>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded flex items-center justify-center">
            <span className="text-orange-600 dark:text-orange-400 text-xs font-bold">amazon</span>
          </div>
          <div className="flex-1 text-right">
            <div className="text-sm font-medium text-gray-900 dark:text-white">امازون امارات</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">amazon</div>
          </div>
          <div className="w-6 h-4 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <span className="text-xs">🇦🇪</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 font-bold rounded-lg"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
        </Button>
        <Button
          variant="outline"
          className="w-full h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg"
        >
          افزودن به علاقه مندی ها
        </Button>
      </div>

      {/* Shipping Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 text-right">
          <span className="mt-0.5">ℹ️</span>
          <span>شامل هزینه حمل و گمرک</span>
        </div>
      </div>

      {/* Pricing Process */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 text-right">فرایند قیمت گذاری محصولات</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed text-right">
          قیمت‌های نمایش داده شده شامل تمام هزینه‌های حمل و نقل و گمرکی می‌باشد.
        </p>
      </div>

      {/* Payment Services */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-200 dark:border-blue-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded">
            جدید
          </span>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white text-right">خدمات ارزی میکرولس پی</h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 text-right">
          پرداخت های ارزی شما با ویزا و مستر کارت و پیبال
        </p>
        <Button variant="outline" className="w-full h-8 text-xs">
          مشاهده
        </Button>
      </div>

      {/* Report Issue */}
      <div className="text-center">
        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          گزارش مشکل
        </button>
      </div>
    </div>
  );
}
