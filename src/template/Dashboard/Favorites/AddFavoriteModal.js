"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { filterInputStyles } from "@/utils/filterStyles";

/** مودال افزودن به لیست آرزو — با productId (الزامی) و فیلدهای اختیاری */
export default function AddFavoriteModal({ open, onOpenChange, onSubmit }) {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId?.trim() || !onSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit({
        productId: productId.trim(),
        productName: productName.trim() || undefined,
        productImageUrl: productImageUrl.trim() || undefined,
        productPrice: productPrice.trim() ? Number(productPrice) : undefined,
      });
      setProductId("");
      setProductName("");
      setProductImageUrl("");
      setProductPrice("");
      onOpenChange?.(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} dir="rtl">
      <DialogContent className="max-w-md rounded-2xl dark:bg-dark-box" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-primary-700 dark:text-dark-title">افزودن به لیست آرزو</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label className="text-gray-700 dark:text-dark-text">شناسه محصول (ASIN یا ID) *</Label>
            <Input
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="مثال: B0CHWRXH8B"
              className={cn("mt-1", filterInputStyles)}
              required
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-dark-text">نام محصول (اختیاری)</Label>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={cn("mt-1", filterInputStyles)}
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-dark-text">قیمت (اختیاری)</Label>
            <Input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className={cn("mt-1", filterInputStyles)}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange?.(false)} className="flex-1">
              انصراف
            </Button>
            <Button type="submit" disabled={submitting} className="flex-1">
              {submitting ? "در حال افزودن..." : "افزودن"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
