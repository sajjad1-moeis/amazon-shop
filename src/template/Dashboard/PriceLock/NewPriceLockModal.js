"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { filterInputStyles } from "@/utils/filterStyles";
import ProductPreviewCard from "./ProductPreviewCard";
import { productService } from "@/services/product/productService";
import { unwrapApiData } from "@/services/api/client";
import { toast } from "sonner";

function mapApiProduct(p) {
  const price = p.price ?? p.finalPrice ?? p.discountPrice ?? 0;
  const priceStr = typeof price === "number" ? price.toLocaleString("fa-IR") : String(price);
  return {
    id: p.id,
    title: p.title ?? p.name ?? "-",
    brand: p.brandName ?? p.brand ?? "-",
    price: priceStr,
    weight: p.weight ? `${p.weight} kg` : "-",
    image: p.image ?? p.imageUrl ?? "/image/Home/product.png",
    downPayment: p.downPayment ?? "-",
    lockable: true,
    rawPrice: typeof price === "number" ? price : parseInt(String(price).replace(/\D/g, ""), 10) || 0,
  };
}

export default function NewPriceLockModal({ open, onOpenChange, onSubmit }) {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [duration, setDuration] = useState("12");
  const [accepted, setAccepted] = useState(true);
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSearch = async () => {
    const q = search.trim();
    if (!q || q.length < 2) {
      toast.error("حداقل ۲ کاراکتر برای جستجو وارد کنید");
      return;
    }
    setSearching(true);
    try {
      const res = await productService.search(q);
      const data = unwrapApiData(res);
      const list = Array.isArray(data) ? data : data?.products ?? data?.items ?? [];
      const first = list[0];
      if (first) {
        setSelectedProduct(mapApiProduct(first));
      } else {
        toast.info("محصولی یافت نشد");
        setSelectedProduct(null);
      }
    } catch (err) {
      toast.error(err?.message ?? "خطا در جستجو");
      setSelectedProduct(null);
    } finally {
      setSearching(false);
    }
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
                type="button"
                onClick={handleSearch}
                disabled={searching}
                className="bg-primary-600 hover:bg-primary-700 text-white dark:bg-dark-primary dark:hover:bg-primary-600 w-auto text-xs sm:text-sm h-10 sm:h-11"
              >
                {searching ? "در حال جستجو..." : "جستجو"}
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
              type="button"
              disabled={!accepted || !selectedProduct || submitting}
              onClick={async () => {
                if (!selectedProduct || !onSubmit) return;
                setSubmitting(true);
                try {
                  await onSubmit({
                    productId: selectedProduct.id,
                    targetPrice: selectedProduct.rawPrice || selectedProduct.price,
                    lockedPrice: selectedProduct.rawPrice || selectedProduct.price,
                    durationHours: parseInt(duration, 10) || 12,
                  });
                  setSearch("");
                  setSelectedProduct(null);
                  setDuration("12");
                  onOpenChange?.(false);
                } finally {
                  setSubmitting(false);
                }
              }}
              className="w-full rounded-lg bg-primary-700 py-2.5 sm:py-3 text-white hover:bg-primary-800 dark:bg-dark-primary dark:hover:bg-primary-600 disabled:opacity-50 text-xs sm:text-sm sm:text-base h-10 sm:h-12"
            >
              {submitting ? "در حال ثبت..." : "پرداخت و فعال‌سازی قفل"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
