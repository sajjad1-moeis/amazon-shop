"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { filterInputStyles } from "@/utils/filterStyles";
import ProductPreviewCard from "../PriceLock/ProductPreviewCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const radioItems = [
  { value: "7", title: "۷ روز" },
  { value: "15", title: "۱۵ روز" },
  { value: "30", title: "۳۰ روز" },
  { value: "90", title: "۹۰ روز" },
];

export default function NewPriceLockModal({ open, onOpenChange }) {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [duration, setDuration] = useState("7");
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

        <div className="space-y-6 p-4 md:p-6">
          {/* Product search */}
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm text-gray-700 dark:text-dark-text">محصول</Label>
            <div className="flex gap-2">
              <Input
                value={search}
                className={cn("bg-gray-50 border border-gray-200 flex-1", filterInputStyles, "text-xs sm:text-sm")}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sony PlayStation 5 Slim – Advanced Edition Gaming Console"
              />
              <Button
                onClick={handleSearch}
                className="bg-primary-600 hover:bg-primary-700 text-white dark:bg-dark-primary dark:hover:bg-primary-600 text-xs sm:text-sm h-10 sm:h-11"
              >
                جستجو
              </Button>
            </div>
          </div>

          {/* Product Card */}
          {selectedProduct && (
            <div>
              <Label className="mb-2 block text-xs sm:text-sm text-gray-500 dark:text-dark-text">محصول وارد شده</Label>
              <ProductPreviewCard product={selectedProduct} />
            </div>
          )}

          {/* Duration */}
          {selectedProduct && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <Label className="text-xs sm:text-sm text-gray-600 dark:text-dark-text mb-3">
                    گزینه های دریافت هشدار
                  </Label>
                  <Select value={"none"}>
                    <SelectTrigger className="bg-white dark:bg-dark-box border border-gray-300 dark:border-dark-stroke h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">هیچکدام</SelectItem>
                      <SelectItem value="price_drop">کاهش قیمت</SelectItem>
                      <SelectItem value="stock">موجود شدن</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Notification Method */}
                <div className="space-y-3">
                  <Label className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">روش دریافت اعلان</Label>
                  <Select value={"sms"}>
                    <SelectTrigger className="bg-white dark:bg-dark-box border border-gray-300 dark:border-dark-stroke h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">پیامک</SelectItem>
                      <SelectItem value="email">ایمیل</SelectItem>
                      <SelectItem value="push">اعلان داخلی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 w-full">
                <Label className="text-xs sm:text-sm text-gray-700 dark:text-dark-text">مدت اعتبار هشدار</Label>
                <RadioGroup
                  value={duration}
                  onValueChange={setDuration}
                  className="grid grid-cols-2 md:grid-cols-4 gap-2"
                >
                  {radioItems.map((radio) => (
                    <div
                      key={radio.value}
                      className={cn(
                        "flex items-center gap-2 p-2 sm:p-3 rounded-lg border-2 transition-colors cursor-pointer accent-primary-700 dark:accent-primary-300",
                        duration === radio.value
                          ? "border-primary-600 dark:border-primary-300 bg-blue-50 dark:bg-dark-primary/20"
                          : "border-gray-200 bg-gray-100 dark:bg-dark-field dark:border-dark-stroke hover:border-gray-300"
                      )}
                    >
                      <RadioGroupItem value={radio.value} id={radio.value} />
                      <Label
                        htmlFor={radio.value}
                        className="text-xs sm:text-sm text-gray-700 dark:text-dark-text cursor-pointer"
                      >
                        {radio.title}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

          {/* Terms */}
          {selectedProduct && (
            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full border-2 rounded-lg border-primary-700 text-primary-700 dark:text-primary-300 py-3  hover:border-primary-800 dark:border-primary-300 dark:hover:border-primary-600 disabled:opacity-50 text-sm sm:text-base h-12"
              >
                لغو
              </Button>
              <Button
                disabled={!accepted}
                className="w-full rounded-lg bg-primary-700 py-3 text-white hover:bg-primary-800 dark:bg-dark-primary dark:hover:bg-primary-600 disabled:opacity-50 text-sm sm:text-base h-12"
              >
                ذخیره تنظیمات
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
