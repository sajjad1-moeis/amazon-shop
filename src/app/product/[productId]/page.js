"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Share2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";

export default function ProductDetailPage({ params }) {
  const [selectedColor, setSelectedColor] = useState("navy");
  const [selectedDelivery, setSelectedDelivery] = useState("express");
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const productId = params?.productId;

  const handleAddToCart = async () => {
    if (!productId) {
      toast.error("شناسه محصول یافت نشد");
      return;
    }

    try {
      setAddingToCart(true);
      await shoppingCartService.addItem({
        productId,
        quantity: 1,
      });
      toast.success("محصول به سبد خرید اضافه شد");
    } catch (error) {
      toast.error(error.message || "خطا در افزودن به سبد خرید");
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const productImages = [
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
  ];

  const colors = [
    { id: "navy", label: "سرمه ای", value: "navy" },
    { id: "gold", label: "طلایی", value: "gold" },
    { id: "white", label: "سفید", value: "white" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              خانه
            </a>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              کالای دیجیتال
            </a>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              ساعت هوشمند
            </a>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            <span className="text-gray-900 dark:text-white font-medium">ساعت مچی مردانه Invicta</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Right Side - Product Images */}
          <div className="col-span-12 lg:col-span-3 order-1 lg:order-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
              {/* Share Button */}
              <div className="flex justify-start mb-4">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Main Image */}
              <div className="mb-4">
                <div className="aspect-square bg-white dark:bg-black rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                  <div className="w-full h-full bg-white dark:bg-black flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-orange-500 mb-2">a</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">ساعت Invicta</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="space-y-2">
                {productImages.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-full aspect-square rounded-lg overflow-hidden border-2 transition-colors bg-white dark:bg-gray-900",
                      selectedImage === index
                        ? "border-blue-500 dark:border-blue-400"
                        : "border-gray-200 dark:border-gray-700"
                    )}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-400 dark:text-gray-600 text-xs">{index + 1}</div>
                    </div>
                  </button>
                ))}
                {/* More images indicator */}
                <button className="w-full aspect-square rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-600 text-2xl">⋯</span>
                </button>
              </div>
            </div>
          </div>

          {/* Center - Product Info */}
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-right">
                ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری REC کرونوگراف حرفه ای و لوکس
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-right">
                Invicta Men's Watch, Model 0361, Reserve Series - Professional and Luxury Chronograph
              </p>

              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">۴.۷</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">(۲۳۵)</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    خلاصه نظرات
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    مقایسه کالا
                  </Button>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="text-sm font-bold text-gray-900 dark:text-white mb-3 block text-right">رنگ</label>
                <div className="flex gap-3 justify-end">
                  {colors.map((color) => (
                    <label key={color.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={selectedColor === color.value}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-4 h-4 text-blue-600 dark:text-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{color.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Short Description */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 text-right">معرفی کوتاه</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed text-right">
                  طراحی چشم گیر با موتور سوئیسی و بدنه استیل مقاوم مناسب برای استایل رسمی و اسپرت با دقت بالا و عملکرد
                  کرونوگراف چند حالته.
                </p>
              </div>

              {/* Features Table */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 text-right">ویژگی ها</h3>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 w-1/3 text-right">
                          برند
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-right">Invicta</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 text-right">
                          مدل
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-right">Reserve Chronograph</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 text-right">
                          کشور سازنده
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-right">سوئیس</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 text-right">
                          جنس بدنه
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-right">استیل ضدزنگ</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 text-right">
                          نوع موتور
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-right">کوارتز کرونوگراف</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 text-right">
                          مقاومت در برابر آب
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-right">تا عمق ۲۰۰ متر</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Left Side - Purchase Section */}
          <div className="col-span-12 lg:col-span-3 order-3 lg:order-3 space-y-4">
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
              <Button
                className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 font-bold rounded-lg"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? "در حال افزودن..." : "افزودن به سبد خرید"}
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
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 text-right">
                فرایند قیمت گذاری محصولات
              </h3>
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
        </div>
      </div>
    </div>
  );
}
