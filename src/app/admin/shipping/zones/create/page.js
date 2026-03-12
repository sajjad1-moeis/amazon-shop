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

export default function CreateShippingZonePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    countries: "",
    priceModifier: "",
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
      toast.error("لطفاً نام منطقه را وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description?.trim() || undefined,
        isActive: formData.isActive,
      };
      if (formData.countries?.trim()) {
        payload.countries = formData.countries
          .split(/[,،]/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (formData.priceModifier !== "" && formData.priceModifier != null) {
        const num = parseFloat(formData.priceModifier);
        if (!Number.isNaN(num)) payload.priceModifier = num;
      }
      await shippingService.createZone(payload);
      toast.success("منطقه ارسال با موفقیت ایجاد شد");
      router.push("/admin/shipping/zones");
    } catch (error) {
      toast.error(error?.message || "خطا در ایجاد منطقه ارسال");
      console.error("Error creating shipping zone:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AdminPageHeader
        title="منطقه ارسال جدید"
        subtitle="ثبت منطقه جدید برای ارسال"
        icon={Truck}
        actions={
          <Link
            href="/admin/shipping/zones"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowRight size={16} />
            <span className="max-md:hidden">بازگشت به لیست</span>
          </Link>
        }
      />

      <AdminSectionCard title="اطلاعات منطقه">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="name" className={FORM_STYLES.label}>
              نام منطقه <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="مثال: تهران، ایران"
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
              placeholder="توضیح کوتاه درباره منطقه"
              className={FORM_STYLES.textarea || FORM_STYLES.input}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="countries" className={FORM_STYLES.label}>
              کشورها (اختیاری)
            </Label>
            <Input
              id="countries"
              name="countries"
              value={formData.countries}
              onChange={handleChange}
              placeholder="با کاما جدا کنید، مثال: IR, AE, US"
              className={FORM_STYLES.input}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceModifier" className={FORM_STYLES.label}>
              ضریب قیمت (اختیاری)
            </Label>
            <Input
              id="priceModifier"
              name="priceModifier"
              type="number"
              step="0.01"
              value={formData.priceModifier}
              onChange={handleChange}
              placeholder="۱"
              className={FORM_STYLES.input}
              dir="ltr"
            />
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
              {loading ? "در حال ثبت..." : "ثبت منطقه"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/shipping/zones")}
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
