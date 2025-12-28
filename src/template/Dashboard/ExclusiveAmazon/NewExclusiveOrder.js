"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
                <h3 className="text-base font-bold text-gray-900 dark:text-dark-title">{selectedProduct.name}</h3>
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
              <div className="w-32 h-32 relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
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
            <h3 className="text-base font-bold text-gray-900 dark:text-dark-title mb-4">جزئیات محاسبه قیمت</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-dark-text">قیمت کالا در آمازون:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{selectedProduct.amazonPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-dark-text">هزینه حمل بین المللی:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
                  {selectedProduct.shippingCost}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-dark-text">هزینه گمرک و ترخیص:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
                  {selectedProduct.customsFee} تومان
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-dark-text">کارمزد خدمات خرید اختصاصی:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
                  {selectedProduct.serviceFee} تومان
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-dark-stroke pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900 dark:text-dark-title">مبلغ نهایی تخمینی:</span>
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
            <Label className="text-sm font-medium text-gray-700 dark:text-dark-text mb-4 block">
              روش ارسال به ایران
            </Label>
            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
              <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-dark-stroke rounded-lg hover:bg-gray-50 dark:hover:bg-dark-field">
                <RadioGroupItem value="normal" id="shipping-normal" />
                <Label
                  htmlFor="shipping-normal"
                  className="flex-1 cursor-pointer text-sm text-gray-700 dark:text-dark-text"
                >
                  <span className="font-medium">ارسال عادی</span>
                  <span className="text-gray-500 dark:text-dark-text mr-2">تحویل ۲۵ تا ۳۰ روز</span>
                </Label>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-dark-stroke rounded-lg hover:bg-gray-50 dark:hover:bg-dark-field">
                <RadioGroupItem value="express" id="shipping-express" />
                <Label
                  htmlFor="shipping-express"
                  className="flex-1 cursor-pointer text-sm text-gray-700 dark:text-dark-text"
                >
                  <span className="font-medium">ارسال اکسپرس</span>
                  <span className="text-gray-500 dark:text-dark-text mr-2">تحویل ۱۸ تا ۲۲ روز</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Payment Method */}
        {selectedProduct && (
          <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
            <Label className="text-sm font-medium text-gray-700 dark:text-dark-text mb-4 block">
              نحوه پرداخت
            </Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-dark-stroke rounded-lg hover:bg-gray-50 dark:hover:bg-dark-field">
                <RadioGroupItem value="two-stage" id="payment-two-stage" />
                <Label
                  htmlFor="payment-two-stage"
                  className="flex-1 cursor-pointer text-sm text-gray-700 dark:text-dark-text"
                >
                  <span className="font-medium">پرداخت دو مرحله ای</span>
                  <span className="text-gray-500 dark:text-dark-text mr-2 block text-xs mt-1">
                    پرداخت اولیه برای ثبت سفارش، پرداخت نهایی پس از خرید کالا
                  </span>
                </Label>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-dark-stroke rounded-lg hover:bg-gray-50 dark:hover:bg-dark-field">
                <RadioGroupItem value="full" id="payment-full" />
                <Label
                  htmlFor="payment-full"
                  className="flex-1 cursor-pointer text-sm text-gray-700 dark:text-dark-text"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">پرداخت کامل</span>
                    <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded">
                      پیشنهادی
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-dark-text block text-xs mt-1">
                    پرداخت کل مبلغ به صورت یکجا (در صورت تأیید ادمین)
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Submit Button */}
        {selectedProduct && (
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-8 py-3 rounded-lg"
            >
              ثبت سفارش اختصاصی
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


