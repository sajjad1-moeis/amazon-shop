"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { filterInputStyles } from "@/utils/filterStyles";
import ProductPreviewCard from "./ProductPreviewCard";

export default function NewPriceLockModal({ open, onOpenChange }) {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [duration, setDuration] = useState("12");
  const [accepted, setAccepted] = useState(true);

  // mock — بعداً از API میاد
  const mockProduct = {
    id: 1,
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    brand: "SONY",
    price: "۲۷,۴۵۰,۰۰۰",
    weight: "۲.۵ kg",
    image: "/image/Home/product.png",
    downPayment: "۳,۵۰۰,۰۰۰",
    lockable: true,
  };

  const handleSearch = () => {
    if (search.trim()) setSelectedProduct(mockProduct);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} dir="rtl">
      <DialogContent className="max-w-3xl lg:max-w-4xl rounded-2xl p-0 overflow-hidden dark:bg-dark-box" dir="rtl">
        {/* Header */}
        <DialogHeader className="relative px-4 sm:px-6 py-3 sm:py-4">
          <DialogTitle className="text-center font-thin text-xl sm:text-2xl text-primary-700 dark:text-dark-title">
            قفل قیمت جدید
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
          {/* Product search */}
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm text-gray-700 dark:text-dark-text">محصول</Label>
            <div className="flex  gap-2">
              <Input
                value={search}
                className={cn("bg-gray-50 border border-gray-200 flex-1", filterInputStyles, "text-xs sm:text-sm")}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sony PlayStation 5 Slim – Advanced Edition Gaming Console"
              />
              <Button
                onClick={handleSearch}
                className="bg-primary-600 hover:bg-primary-700 text-white dark:bg-dark-primary dark:hover:bg-primary-600 w-auto text-xs sm:text-sm h-10 sm:h-11"
              >
                جستجو
              </Button>
            </div>
          </div>

          {/* Product Card */}
          {selectedProduct && (
            <div>
              <Label className="mb-2 sm:mb-3 block text-xs sm:text-sm text-gray-500 dark:text-dark-text">
                محصول وارد شده
              </Label>

              <ProductPreviewCard product={selectedProduct} />
            </div>
          )}

          {/* Duration */}
          {selectedProduct && (
            <div className="space-y-2 sm:space-y-3 w-full">
              <Label className="text-xs sm:text-sm text-gray-700 dark:text-dark-text">مدت اعتبار هشدار</Label>
              <RadioGroup value={duration} onValueChange={setDuration} className="gap-2 grid grid-cols-2">
                <div
                  className={cn(
                    "flex items-center gap-2 accent-primary-700 dark:accent-primary-300 p-2 sm:p-3 rounded-lg border-2 transition-colors cursor-pointer bg-gray-100 dark:bg-dark-field border-gray-200 dark:border-dark-stroke hover:border-gray-300"
                  )}
                >
                  <RadioGroupItem value="12" id="12h" />
                  <Label htmlFor="12h" className="text-xs sm:text-sm text-gray-700 dark:text-dark-text cursor-pointer">
                    ۱۲ ساعت
                  </Label>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-2 accent-primary-700 dark:accent-primary-300 p-2 sm:p-3 rounded-lg border-2 transition-colors cursor-pointer bg-gray-100 dark:bg-dark-field border-gray-200 dark:border-dark-stroke hover:border-gray-300"
                  )}
                >
                  <RadioGroupItem value="24" id="24h" />
                  <Label htmlFor="24h" className="text-xs sm:text-sm text-gray-700 dark:text-dark-text cursor-pointer">
                    ۲۴ ساعت
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Terms */}
          {selectedProduct && (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={accepted}
                onCheckedChange={setAccepted}
                className="dark:border-dark-stroke dark:bg-dark-field data-[state=checked]:dark:bg-primary-300 w-4 h-4 sm:w-5 sm:h-5"
              />
              <Label className="text-xs sm:text-sm text-gray-700 dark:text-dark-text">
                <span className="text-yellow-600">قوانین قفل</span> قیمت را می‌پذیرم
              </Label>
            </div>
          )}

          {/* Payment summary */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 items-start sm:items-center gap-3 sm:gap-4">
            <div className="rounded-lg text-xs sm:text-sm text-gray-700 dark:text-dark-text w-full sm:w-auto">
              مبلغ پیش‌پرداخت محاسبه شده :
              <span className="mr-1 text-base sm:text-lg text-primary-500 dark:text-primary-300">
                {selectedProduct?.downPayment || 0} تومان
              </span>
            </div>

            {/* Submit */}
            <Button
              disabled={!accepted}
              className="w-full rounded-lg bg-primary-700 py-2.5 sm:py-3 text-white hover:bg-primary-800 dark:bg-dark-primary dark:hover:bg-primary-600 disabled:opacity-50 text-xs sm:text-sm sm:text-base h-10 sm:h-12"
            >
              پرداخت و فعال‌سازی قفل
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
