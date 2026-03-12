"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FORM_STYLES } from "../formStyles";

export default function RoleForm({ formData, errors, loading, onChange, onSubmit, isEdit = false }) {
  return (
    <div className={FORM_STYLES.card}>
      <form onSubmit={onSubmit} className="p-6 space-y-6" dir="rtl">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-700/60">
          {isEdit ? "ویرایش نقش" : "اطلاعات نقش"}
        </h3>
        <div className="space-y-2">
          <Label htmlFor="name" className={FORM_STYLES.label}>
            نام نقش <span className="text-red-400/90">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="مثال: Editor"
            className={`${FORM_STYLES.input} ${errors.name ? "border-red-500" : ""}`}
            maxLength={50}
            required
            dir="rtl"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className={FORM_STYLES.label}>
            توضیحات نقش <span className="text-red-400/90">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="توضیحات نقش را وارد کنید"
            className={`${FORM_STYLES.textarea || FORM_STYLES.input} ${errors.description ? "border-red-500" : ""}`}
            rows={5}
            maxLength={500}
            required
            dir="rtl"
          />
          {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
        </div>

        {isEdit && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={onChange}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500/30"
            />
            <Label htmlFor="isActive" className={`${FORM_STYLES.label} cursor-pointer`}>
              فعال
            </Label>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-gray-700/60">
          <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
            {loading ? (isEdit ? "در حال به‌روزرسانی..." : "در حال ثبت...") : isEdit ? "به‌روزرسانی نقش" : "ثبت نقش"}
          </Button>
        </div>
      </form>
    </div>
  );
}
