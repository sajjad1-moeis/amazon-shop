"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Truck, ArrowRight } from "iconsax-reactjs";
import { shippingService } from "@/services/shipping/shippingService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function CreateShippingMethodPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    estimatedDays: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      toast.error("لطفاً نام روش ارسال را وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description?.trim() || undefined,
        isActive: formData.isActive,
      };
      if (formData.price !== "" && formData.price != null) {
        const num = parseFloat(formData.price);
        if (!Number.isNaN(num) && num >= 0) payload.price = num;
      }
      if (formData.estimatedDays !== "" && formData.estimatedDays != null) {
        const days = parseInt(formData.estimatedDays, 10);
        if (!Number.isNaN(days) && days >= 0) payload.estimatedDays = days;
      }
      await shippingService.createMethod(payload);
      toast.success("روش ارسال با موفقیت ایجاد شد");
      router.push("/admin/shipping/methods");
    } catch (error) {
      toast.error(error?.message || "خطا در ایجاد روش ارسال");
      console.error("Error creating shipping method:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AdminPageHeader
        title="روش ارسال جدید"
        subtitle="ثبت روش جدید حمل و نقل"
        icon={Truck}
        actions={
          <Link
            href="/admin/shipping/methods"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowRight size={16} />
            <span className="max-md:hidden">بازگشت به لیست</span>
          </Link>
        }
      />

      <AdminSectionCard title="اطلاعات روش ارسال">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="name" className={FORM_STYLES.label}>
              نام روش ارسال <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="مثال: پست پیشتاز، تیپاکس"
              className={FORM_STYLES.input}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={FORM_STYLES.label}>
              توضیحات (اختیاری)
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="توضیح کوتاه درباره روش ارسال"
              className={FORM_STYLES.textarea || FORM_STYLES.input}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="price" className={FORM_STYLES.label}>
                هزینه (تومان)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1000"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                className={FORM_STYLES.input}
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedDays" className={FORM_STYLES.label}>
                زمان تقریبی (روز)
              </Label>
              <Input
                id="estimatedDays"
                name="estimatedDays"
                type="number"
                min="0"
                value={formData.estimatedDays}
                onChange={handleChange}
                placeholder="۱ تا ۳"
                className={FORM_STYLES.input}
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500/30"
            />
            <Label htmlFor="isActive" className={`${FORM_STYLES.label} cursor-pointer`}>
              فعال
            </Label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-700/60">
            <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
              {loading ? "در حال ثبت..." : "ثبت روش ارسال"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/shipping/methods")}
              className="rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              انصراف
            </Button>
          </div>
        </form>
      </AdminSectionCard>
    </div>
  );
}
