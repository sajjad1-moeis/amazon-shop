"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const packagingStatusOptions = [
  { value: "intact", label: "کاملا سالم" },
  { value: "damaged", label: "آسیب دیده" },
  { value: "missing", label: "مفقود" },
];

const returnReasonOptions = [
  { value: "defect", label: "خرابی محصول" },
  { value: "wrong-item", label: "کالای اشتباه" },
  { value: "damaged", label: "آسیب دیده" },
  { value: "not-as-described", label: "مطابق توضیحات نیست" },
  { value: "other", label: "سایر" },
];

export default function ReturnReasonForm({ formData, onFormChange }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      <h3 className="text-lg font-bold text-gray-700 dark:text-dark-title mb-6">علت مرجوعی</h3>

      <div className="space-y-6">
        {/* Packaging Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm ">وضعیت بسته بندی</Label>
            <Select value={formData.packagingStatus} onValueChange={(value) => onFormChange("packagingStatus", value)}>
              <SelectTrigger className="bg-gray-50 border border-gray-200">
                <SelectValue placeholder="وضعیت بسته بندی را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {packagingStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Return Reason */}
          <div className="space-y-2">
            <Label className="text-sm ">علت مرجوعی</Label>
            <Select value={formData.returnReason} onValueChange={(value) => onFormChange("returnReason", value)}>
              <SelectTrigger className="bg-gray-50 border border-gray-200">
                <SelectValue placeholder="دلیل مرجوعی این محصول" />
              </SelectTrigger>
              <SelectContent>
                {returnReasonOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-sm ">توضیحات بیشتر</Label>
          <Textarea
            value={formData.description}
            className="bg-gray-50 border border-gray-200 min-h-[100px]"
            onChange={(e) => onFormChange("description", e.target.value)}
            placeholder="توضیحات اختیاری درباره مشکل..."
            dir="rtl"
          />
        </div>
      </div>
    </div>
  );
}
