"use client";

import { Button } from "@/components/ui/button";

export default function PurchaseSection({ selectedDelivery, setSelectedDelivery }) {
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

      {/* Price */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">۱۲,۴۵۰,۰۰۰</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">تومان</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-1 rounded">
            ۱۹٪
          </span>
          <span className="text-sm text-gray-400 dark:text-gray-500 line-through">۱۲,۴۵۰,۰۰۰ تومان</span>
        </div>
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
        <Button className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 font-bold rounded-lg">
          افزودن به سبد خرید
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
