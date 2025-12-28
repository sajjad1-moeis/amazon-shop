"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewPriceLockModal({ open, onOpenChange, onSubmit }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productSearch, setProductSearch] = useState("");
  const [duration, setDuration] = useState("12");
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  // Mock product data - در واقع باید از API یا props بیاید
  const mockProduct = {
    id: 1,
    name: "Sony PlayStation ۵ Slim – Advanced Edition Gaming Console",
    brand: "SONY",
    currentPrice: "۲۷,۴۵۰,۰۰۰",
    weight: "۲.۵ kg",
    canLock: true,
    image: "/image/Home/product.png",
    downPayment: "۳,۵۰۰,۰۰۰",
  };

  const handleProductSelect = () => {
    // در واقع باید جستجو انجام شود
    if (productSearch.trim()) {
      setSelectedProduct(mockProduct);
    }
  };

  const handleSubmit = () => {
    if (!selectedProduct || !acceptedTerms) {
      alert("لطفاً محصول را انتخاب کنید و قوانین را بپذیرید");
      return;
    }
    onSubmit?.({
      product: selectedProduct,
      duration: parseInt(duration),
      downPayment: mockProduct.downPayment,
    });
    onOpenChange(false);
    // Reset form
    setSelectedProduct(null);
    setProductSearch("");
    setDuration("12");
    setAcceptedTerms(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} dir="rtl">
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary-700 dark:text-dark-title text-center">
            قفل قیمت جدید
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Product Selection */}
          <div className="space-y-2">
            <Label htmlFor="product" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              محصول
            </Label>
            <div className="flex gap-2">
              <Input
                id="product"
                type="text"
                placeholder="Sony PlayStation ۵ Slim – Advanced Edition Gaming Console"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleProductSelect();
                  }
                }}
                className="flex-1"
                dir="rtl"
              />
              <Button
                type="button"
                onClick={handleProductSelect}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                جستجو
              </Button>
            </div>
          </div>

          {/* Selected Product Card */}
          {selectedProduct && (
            <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-4 border border-gray-200 dark:border-dark-stroke">
              <Label className="text-sm font-medium text-gray-700 dark:text-dark-text mb-3 block">
                محصول وارد شده
              </Label>
              <div className="flex gap-4">
                <div className="flex-1 space-y-3">
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title">
                    {selectedProduct.name}
                  </h3>
                  <div className="space-y-1.5 text-sm text-gray-600 dark:text-dark-text">
                    <p>برند: {selectedProduct.brand}</p>
                    <p>
                      قیمت فعلی (تومان){" "}
                      <span className="font-bold text-gray-900 dark:text-dark-title">
                        {selectedProduct.currentPrice}
                      </span>
                    </p>
                    <p>وزن {selectedProduct.weight}</p>
                    <p>
                      امکان قفل دارد:{" "}
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        دارد
                      </span>
                    </p>
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

          {/* Duration Selection */}
          {selectedProduct && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                مدت اعتبار هشدار
              </Label>
              <RadioGroup value={duration} onValueChange={setDuration} className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="12" id="duration-12" />
                  <Label htmlFor="duration-12" className="text-sm text-gray-700 dark:text-dark-text cursor-pointer">
                    ۱۲ ساعت
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="24" id="duration-24" />
                  <Label htmlFor="duration-24" className="text-sm text-gray-700 dark:text-dark-text cursor-pointer">
                    ۲۴ ساعت
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Terms Checkbox */}
          {selectedProduct && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={setAcceptedTerms}
              />
              <Label
                htmlFor="terms"
                className="text-sm text-gray-700 dark:text-dark-text cursor-pointer"
              >
                قوانین قفل قیمت را می‌پذیرم
              </Label>
            </div>
          )}

          {/* Down Payment Summary */}
          {selectedProduct && (
            <div className="bg-gray-50 dark:bg-dark-field/50 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-dark-text">
                مبلغ پیش پرداخت محاسبه شده :{" "}
                <span className="text-base font-bold text-gray-900 dark:text-dark-title">
                  {selectedProduct.downPayment} تومان
                </span>
              </p>
            </div>
          )}

          {/* Submit Button */}
          {selectedProduct && (
            <Button
              onClick={handleSubmit}
              disabled={!acceptedTerms}
              className="w-full bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 rounded-lg"
            >
              پرداخت و فعال سازی قفل
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


