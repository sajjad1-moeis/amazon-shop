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

export default function BulkImportModal({ open, onOpenChange }) {
  const [searchTermsText, setSearchTermsText] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [isFullStored, setIsFullStored] = useState(false);
  const [maxProductsPerSearch, setMaxProductsPerSearch] = useState("20");
  const [delayBetweenSearches, setDelayBetweenSearches] = useState("5");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState("");
  const [status, setStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const resetState = () => {
    setSearchTermsText("");
    setCategoryId("");
    setSubCategoryId("");
    setIsFullStored(false);
    setMaxProductsPerSearch("20");
    setDelayBetweenSearches("5");
    setJobId("");
    setStatus(null);
  };

  const handleClose = () => {
    if (!loading && !checkingStatus) {
      onOpenChange(false);
      resetState();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const terms = searchTermsText
      .split(/\r?\n/)
      .map((t) => t.trim())
      .filter(Boolean);

    if (terms.length === 0) {
      toast.error("حداقل یک عبارت جستجو لازم است");
      return;
    }

    const payload = {
      searchTerms: terms,
      isFullStored,
    };
    if (categoryId) payload.categoryId = Number(categoryId);
    if (subCategoryId) payload.subCategoryId = Number(subCategoryId);
    if (maxProductsPerSearch) payload.maxProductsPerSearch = Number(maxProductsPerSearch);
    if (delayBetweenSearches) payload.delayBetweenSearches = Number(delayBetweenSearches);

    try {
      setLoading(true);
      const res = await adminProductService.bulkImport(payload);
      const data = unwrapApiData(res);
      setJobId(data?.jobId || "");
      setStatus(null);
      toast.success("Job ورود گروهی با موفقیت ایجاد شد");
    } catch (error) {
      toast.error(error?.message || "خطا در شروع ورود گروهی");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!jobId) return;
    try {
      setCheckingStatus(true);
      const res = await adminProductService.getBulkImportStatus(jobId);
      const data = unwrapApiData(res);
      setStatus(data || null);
    } catch (error) {
      toast.error(error?.message || "خطا در دریافت وضعیت Job");
    } finally {
      setCheckingStatus(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gray-900 border border-gray-700 text-white" dir="rtl">
        <DialogHeader>
          <DialogTitle>ورود گروهی محصولات (Bulk Import)</DialogTitle>
          <DialogDescription className="text-gray-400">
            عبارات جستجو را هر کدام در یک خط وارد کن. برای هر جستجو، محصولات از سرویس پایتون / منبع مشخص‌شده خوانده
            می‌شوند.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label className="text-gray-200">عبارت‌های جستجو (هر خط یک مورد)</Label>
            <Textarea
              value={searchTermsText}
              onChange={(e) => setSearchTermsText(e.target.value)}
              rows={6}
              className="bg-gray-800 border-gray-700 text-gray-100"
              placeholder={"playstation 5\nmacbook pro\niphone 15 ..."}
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
            <div className="flex items-end">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-gray-200">حداکثر محصول به‌ازای هر جستجو</Label>
              <Input
                value={maxProductsPerSearch}
                onChange={(e) => setMaxProductsPerSearch(e.target.value)}
                placeholder="20"
                className="bg-gray-800 border-gray-700 text-white"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-200">تأخیر بین جستجوها (ثانیه)</Label>
              <Input
                value={delayBetweenSearches}
                onChange={(e) => setDelayBetweenSearches(e.target.value)}
                placeholder="5"
                className="bg-gray-800 border-gray-700 text-white"
                dir="ltr"
              />
            </div>
          </div>

          {jobId && (
            <div className="mt-4 space-y-2 border-t border-gray-700 pt-3">
              <p className="text-sm text-gray-300">
                شناسه Job: <span className="font-mono text-yellow-400" dir="ltr">{jobId}</span>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={handleCheckStatus}
                  disabled={checkingStatus}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {checkingStatus ? "در حال بررسی..." : "بررسی وضعیت Job"}
                </Button>
                {status && (
                  <span className="text-xs text-gray-300">
                    وضعیت: <strong>{status.state}</strong> — ایجاد:{" "}
                    <span dir="ltr">{status.createdAt}</span>
                  </span>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
              disabled={loading || checkingStatus}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
              {loading ? "در حال ثبت Job..." : "شروع ورود گروهی"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

