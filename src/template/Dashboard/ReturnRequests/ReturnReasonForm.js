"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">علت مرجوعی</h3>

      <div className="space-y-6">
        {/* Packaging Status */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">وضعیت بسته بندی</Label>
          <Select
            value={formData.packagingStatus}
            onValueChange={(value) => onFormChange("packagingStatus", value)}
          >
            <SelectTrigger>
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
          <Label className="text-sm font-semibold">علت مرجوعی</Label>
          <Select
            value={formData.returnReason}
            onValueChange={(value) => onFormChange("returnReason", value)}
          >
            <SelectTrigger>
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

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">توضیحات بیشتر</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => onFormChange("description", e.target.value)}
            placeholder="توضیحات اختیاری درباره مشکل..."
            className="min-h-[100px]"
            dir="rtl"
          />
        </div>
      </div>
    </div>
  );
}

