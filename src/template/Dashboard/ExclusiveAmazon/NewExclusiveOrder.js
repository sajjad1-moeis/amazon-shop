"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, Card, Wallet3 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function NewExclusiveOrder() {
  const router = useRouter();
  const [productLink, setProductLink] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("normal");
  const [paymentMethod, setPaymentMethod] = useState("two-stage");

  // Mock product data - در واقع باید از API بیاید
  const mockProduct = {
    id: 1,
    name: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    brand: "SONY",
    image: "/image/Home/product.png",
    available: true,
    seller: "Amazon.ae",
    weight: "۴۲۰ g",
    currentPrice: "AED ۹۴۹.۰۰",
    amazonPrice: "۱,۲۹۹ AED",
    shippingCost: "۱,۲۹۹ AED",
    customsFee: "۱,۲۰۰,۰۰۰",
    serviceFee: "۱,۲۰۰,۰۰۰",
    estimatedTotal: "۱,۴۴۴,۰۰۰",
  };

  const handleProductSearch = () => {
    if (productLink.trim()) {
      // در واقع باید API call شود
      setSelectedProduct(mockProduct);
    }
  };

  const handleSubmit = () => {
    if (!selectedProduct) {
      alert("لطفاً محصول را وارد کنید");
      return;
    }
    // Handle order submission
    console.log("Order submitted:", {
      product: selectedProduct,
      shippingMethod,
      paymentMethod,
    });
    // Redirect to orders list
    router.push("/dashboard/exclusive-amazon");
  };

  return (
    <div dir="rtl">
      {/* Header Section */}
      <PageHeader
        title="ثبت سفارش جدید"
        description="برای ثبت سفارش خرید اختصاصی از آمازون اطلاعات زیر را وارد کنید"
      />

      <div className="mt-6 space-y-6">
        {/* Product Input Section */}
        <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
          <div className="space-y-4">
            <Label htmlFor="product-link" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              محصول
            </Label>
            <div className="flex gap-2">
              <Input
                id="product-link"
                type="text"
                placeholder="لینک کامل آمازون یا ASIN را وارد کنید"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleProductSearch();
                  }
                }}
                className="flex-1"
                dir="rtl"
              />
              <Button
                type="button"
                onClick={handleProductSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                جستجو
              </Button>
            </div>
          </div>
        </div>

        {/* Selected Product Card */}
        {selectedProduct && (
          <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
            <Label className="text-sm font-medium text-gray-700 dark:text-dark-text mb-4 block">
              محصول وارد شده
            </Label>
            <div className="flex gap-4">
              <div className="flex-1 space-y-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title">{selectedProduct.name}</h3>
                <div className="space-y-1.5 text-sm text-gray-600 dark:text-dark-text">
                  <p>برند: {selectedProduct.brand}</p>
                  {selectedProduct.available && (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      موجود در آمازون امارات
                    </span>
                  )}
                  <p>فروشنده: {selectedProduct.seller}</p>
                  <p>وزن: {selectedProduct.weight}</p>
                  <p>قیمت فعلی: {selectedProduct.currentPrice}</p>
                </div>
              </div>
              <div className="w-32 h-32 relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-field">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Price Calculation Details */}
        {selectedProduct && (
          <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-4">جزئیات محاسبه قیمت</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-dark-text">قیمت کالا در آمازون:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title dark:text-dark-title">{selectedProduct.amazonPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-dark-text">هزینه حمل بین المللی:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title dark:text-dark-title">
                  {selectedProduct.shippingCost}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-dark-text">هزینه گمرک و ترخیص:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title dark:text-dark-title">
                  {selectedProduct.customsFee} تومان
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-dark-text">کارمزد خدمات خرید اختصاصی:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title dark:text-dark-title">
                  {selectedProduct.serviceFee} تومان
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-dark-stroke pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title">مبلغ نهایی تخمینی:</span>
                  <span className="text-base font-bold text-primary-700 dark:text-primary-400">
                    {selectedProduct.estimatedTotal} AED
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-dark-text mt-3 leading-relaxed">
                مبلغ نهایی پس از بررسی ادمین و خرید کالا ممکن است تغییر جزئی داشته باشد. هرگونه تغییر قبل از پرداخت
                نهایی به شما اطلاع داده می‌شود.
              </p>
            </div>
          </div>
        )}

        {/* Shipping Method */}
        {selectedProduct && (
          <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
            <h3 className="text-xl text-gray-700 dark:text-dark-title mb-4">روش ارسال به ایران</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Normal Shipping */}
              <div
                onClick={() => setShippingMethod("normal")}
                className={cn(
                  "border-2 rounded-xl p-4 cursor-pointer transition-all",
                  shippingMethod === "normal"
                    ? "bg-primary-50 dark:bg-[#8893BF3D] border-primary-300 dark:border-primary-400"
                    : "bg-white dark:bg-white/10 border-gray-200 dark:border-dark-stroke hover:border-gray-300"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Radio Button */}
                  <div className="flex items-center pt-1 shrink-0">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 bg-white dark:bg-transparent flex items-center justify-center transition-all",
                        shippingMethod === "normal"
                          ? "border-primary-500 dark:border-primary-400"
                          : "border-gray-300 dark:border-dark-stroke"
                      )}
                    >
                      {shippingMethod === "normal" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 text-white p-2 rounded-md",
                      shippingMethod === "normal" ? "bg-primary-400" : "bg-gray-500"
                    )}
                  >
                    <Truck size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4
                      className={cn(
                        "font-semibold mb-1",
                        shippingMethod === "normal"
                          ? "text-primary-500 dark:text-dark-title"
                          : "text-gray-900 dark:text-dark-titre"
                      )}
                    >
                      ارسال عادی
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-dark-text">تحویل ۲۵ تا ۳۰ روز</p>
                  </div>
                </div>
              </div>

              {/* Express Shipping */}
              <div
                onClick={() => setShippingMethod("express")}
                className={cn(
                  "border-2 rounded-xl p-4 cursor-pointer transition-all",
                  shippingMethod === "express"
                    ? "bg-primary-50 dark:bg-[#8893BF3D] border-primary-300 dark:border-primary-400"
                    : "bg-white dark:bg-white/10 border-gray-200 dark:border-dark-stroke hover:border-gray-300"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Radio Button */}
                  <div className="flex items-center pt-1 shrink-0">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 bg-white dark:bg-transparent flex items-center justify-center transition-all",
                        shippingMethod === "express"
                          ? "border-primary-500 dark:border-primary-400"
                          : "border-gray-300 dark:border-dark-stroke"
                      )}
                    >
                      {shippingMethod === "express" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 text-white p-2 rounded-md",
                      shippingMethod === "express" ? "bg-green-500" : "bg-gray-500"
                    )}
                  >
                    <Truck size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4
                      className={cn(
                        "font-semibold mb-1",
                        shippingMethod === "express"
                          ? "text-primary-500 dark:text-dark-title"
                          : "text-gray-900 dark:text-dark-titre"
                      )}
                    >
                      ارسال اکسپرس
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-dark-text">تحویل ۱۸ تا ۲۲ روز</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Method */}
        {selectedProduct && (
          <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
            <h3 className="text-xl text-gray-700 dark:text-dark-title mb-4">نحوه پرداخت</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Two-stage Payment */}
              <div
                onClick={() => setPaymentMethod("two-stage")}
                className={cn(
                  "border-2 rounded-xl p-4 cursor-pointer transition-all relative",
                  paymentMethod === "two-stage"
                    ? "bg-primary-50 dark:bg-[#8893BF3D] border-primary-300 dark:border-primary-400"
                    : "bg-white dark:bg-white/10 border-gray-200 dark:border-dark-stroke hover:border-gray-300"
                )}
              >
                {/* Suggested Badge */}
                <span className="absolute top-2 left-2 text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded">
                  پیشنهادی
                </span>
                <div className="flex items-start gap-4">
                  {/* Radio Button */}
                  <div className="flex items-center pt-1 shrink-0">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 bg-white dark:bg-transparent flex items-center justify-center transition-all",
                        paymentMethod === "two-stage"
                          ? "border-primary-500 dark:border-primary-400"
                          : "border-gray-300 dark:border-dark-stroke"
                      )}
                    >
                      {paymentMethod === "two-stage" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 text-white p-2 rounded-md",
                      paymentMethod === "two-stage" ? "bg-primary-400" : "bg-gray-500"
                    )}
                  >
                    <Wallet3 size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4
                      className={cn(
                        "font-semibold mb-1",
                        paymentMethod === "two-stage"
                          ? "text-primary-500 dark:text-dark-title"
                          : "text-gray-900 dark:text-dark-titre"
                      )}
                    >
                      پرداخت دو مرحله ای
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-dark-text">
                      پرداخت اولیه برای ثبت سفارش، پرداخت نهایی پس از خرید کالا
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Payment */}
              <div
                onClick={() => setPaymentMethod("full")}
                className={cn(
                  "border-2 rounded-xl p-4 cursor-pointer transition-all",
                  paymentMethod === "full"
                    ? "bg-primary-50 dark:bg-[#8893BF3D] border-primary-300 dark:border-primary-400"
                    : "bg-white dark:bg-white/10 border-gray-200 dark:border-dark-stroke hover:border-gray-300"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Radio Button */}
                  <div className="flex items-center pt-1 shrink-0">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 bg-white dark:bg-transparent flex items-center justify-center transition-all",
                        paymentMethod === "full"
                          ? "border-primary-500 dark:border-primary-400"
                          : "border-gray-300 dark:border-dark-stroke"
                      )}
                    >
                      {paymentMethod === "full" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 text-white p-2 rounded-md",
                      paymentMethod === "full" ? "bg-primary-400" : "bg-gray-500"
                    )}
                  >
                    <Card size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4
                      className={cn(
                        "font-semibold mb-1",
                        paymentMethod === "full"
                          ? "text-primary-500 dark:text-dark-title"
                          : "text-gray-900 dark:text-dark-titre"
                      )}
                    >
                      پرداخت کامل
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-dark-text">
                      پرداخت کل مبلغ به صورت یکجا (در صورت تأیید ادمین)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedProduct && (
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 dark:text-dark-title font-medium px-8 py-3 rounded-lg"
            >
              ثبت سفارش اختصاصی
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


