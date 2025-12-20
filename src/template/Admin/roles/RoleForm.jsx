"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FORM_STYLES } from "../formStyles";

export default function RoleForm({ formData, errors, loading, onChange, onSubmit, isEdit = false }) {
  return (
    <Card className={FORM_STYLES.card}>
      <CardHeader>
        <CardTitle className={FORM_STYLES.cardTitle}>{isEdit ? "ویرایش نقش" : "اضافه کردن نقش"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6" dir="rtl">
          <div className="space-y-2">
            <Label htmlFor="name" className={FORM_STYLES.label}>
              نام نقش *
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
              توضیحات نقش *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="توضیحات نقش را وارد کنید"
              className={`${FORM_STYLES.input} ${errors.description ? "border-red-500" : ""}`}
              rows={6}
              maxLength={500}
              required
              dir="rtl"
            />
            {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
          </div>

          {isEdit && (
            <div className="flex items-center gap-2 space-x-reverse">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={onChange}
                className="w-4 h-4 text-green-500 rounded focus:ring-green-500 bg-gray-700 border-gray-600"
              />
              <Label htmlFor="isActive" className={`${FORM_STYLES.label} cursor-pointer`}>
                فعال
              </Label>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {loading ? (isEdit ? "در حال به‌روزرسانی..." : "در حال ثبت...") : isEdit ? "به‌روزرسانی نقش" : "ثبت نقش"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
