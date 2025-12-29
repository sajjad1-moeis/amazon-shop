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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="relative px-6 py-4">
          <DialogTitle className="text-center font-thin text-2xl text-primary-700">قفل قیمت جدید</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-3">
          {/* Product search */}
          <div className="space-y-2">
            <Label className="text-sm">محصول</Label>
            <div className="flex gap-2">
              <Input
                value={search}
                className={"bg-gray-50 border border-gray-200"}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sony PlayStation 5 Slim – Advanced Edition Gaming Console"
              />
              <Button onClick={handleSearch}>جستجو</Button>
            </div>
          </div>

          {/* Product Card */}
          {selectedProduct && (
            <div>
              <Label className="mb-3 block text-sm text-gray-500">محصول وارد شده</Label>

              <ProductPreviewCard product={selectedProduct} />
            </div>
          )}

          {/* Duration */}
          {selectedProduct && (
            <div className="space-y-3 w-full">
              <Label className="text-sm">مدت اعتبار هشدار</Label>
              <RadioGroup className=" gap-2  grid grid-cols-2">
                <div className="flex items-center gap-2  bg-gray-100 p-3 rounded-lg">
                  <RadioGroupItem value="12" id="12h" />
                  <Label htmlFor="12h">۱۲ ساعت</Label>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                  <RadioGroupItem value="24" id="24h" />
                  <Label htmlFor="24h">۲۴ ساعت</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Terms */}
          {selectedProduct && (
            <div className="flex items-center gap-2">
              <Checkbox checked={accepted} onCheckedChange={setAccepted} />
              <Label className="text-sm">قوانین قفل قیمت را می‌پذیرم</Label>
            </div>
          )}

          {/* Payment summary */}
          <div class="grid grid-cols-2 items-center">
            <div className="rounded-lg  text-sm">
              مبلغ پیش‌پرداخت محاسبه شده :
              <span className="mr-1  text-lg text-primary-500">{selectedProduct?.downPayment || 0} تومان</span>
            </div>

            {/* Submit */}
            <Button
              disabled={!accepted}
              className="w-full rounded-lg bg-primary-700 py-3 text-white hover:bg-primary-800"
            >
              پرداخت و فعال‌سازی قفل
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
