"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminProductService } from "@/services/admin/adminProductService";
import { unwrapApiData } from "@/services/api/client";
import { toast } from "sonner";

export default function AddByLinkModal({ open, onOpenChange, onSuccess }) {
  const [amazonUrl, setAmazonUrl] = useState("");
  const [productDataText, setProductDataText] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [isFullStored, setIsFullStored] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setAmazonUrl("");
    setProductDataText("");
    setCategoryId("");
    setSubCategoryId("");
    setIsFullStored(false);
  };

  const handleClose = () => {
    if (!loading) {
      onOpenChange(false);
      resetState();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productDataText.trim()) {
      toast.error("دادهٔ محصول (JSON) الزامی است");
      return;
    }

    let productData;
    try {
      productData = JSON.parse(productDataText);
    } catch {
      toast.error("ساختار JSON نامعتبر است");
      return;
    }

    if (!productData.asin && !productData.Asin) {
      toast.error("فیلد asin در productData الزامی است");
      return;
    }

    const payload = {
      amazonUrl: amazonUrl || null,
      productData,
      isFullStored,
    };
    if (categoryId) payload.categoryId = Number(categoryId);
    if (subCategoryId) payload.subCategoryId = Number(subCategoryId);

    try {
      setLoading(true);
      const res = await adminProductService.addByLink(payload);
      unwrapApiData(res);
      toast.success("محصول با موفقیت از لینک اضافه شد");
      onSuccess?.();
      handleClose();
    } catch (error) {
      toast.error(error?.message || "خطا در افزودن محصول با لینک");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gray-900 border border-gray-700 text-white" dir="rtl">
        <DialogHeader>
          <DialogTitle>افزودن محصول با لینک / دادهٔ اسکرپر</DialogTitle>
          <DialogDescription className="text-gray-400">
            ابتدا محصول را از سرویس پایتون (Scraping_Amazon) بگیر و خروجی JSON (ScraperProductDto) را در اینجا قرار بده.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label className="text-gray-200">لینک آمازون (اختیاری)</Label>
            <Input
              value={amazonUrl}
              onChange={(e) => setAmazonUrl(e.target.value)}
              placeholder="https://www.amazon.ae/..."
              className="bg-gray-800 border-gray-700 text-white"
              dir="ltr"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-gray-200">شناسه دسته (اختیاری)</Label>
              <Input
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder="مثال: 1"
                className="bg-gray-800 border-gray-700 text-white"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-200">شناسه زیردسته (اختیاری)</Label>
              <Input
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                placeholder="مثال: 10"
                className="bg-gray-800 border-gray-700 text-white"
                dir="ltr"
              />
            </div>
            <div className="flex items-end space-x-0 space-y-0 space-x-reverse">
              <label className="flex items-center gap-2 text-sm text-gray-200">
                <input
                  type="checkbox"
                  checked={isFullStored}
                  onChange={(e) => setIsFullStored(e.target.checked)}
                />
                ذخیره کامل در دیتابیس (isFullStored)
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">productData (JSON) - الزامی</Label>
            <Textarea
              value={productDataText}
              onChange={(e) => setProductDataText(e.target.value)}
              rows={10}
              dir="ltr"
              className="bg-gray-800 border-gray-700 text-gray-100 font-mono text-xs"
              placeholder='{"asin": "B0CHWRXH8B", "title": "...", ...}'
            />
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
              disabled={loading}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              {loading ? "در حال ثبت..." : "افزودن محصول"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

