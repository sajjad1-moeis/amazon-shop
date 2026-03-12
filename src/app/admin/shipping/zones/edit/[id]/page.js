"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Truck, ArrowRight } from "iconsax-reactjs";
import { shippingService } from "@/services/shipping/shippingService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { Spinner } from "@/components/ui/spinner";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function EditShippingZonePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    countries: "",
    priceModifier: "",
    isActive: true,
  });

  useEffect(() => {
    if (!id) return;
    const fetchZone = async () => {
      try {
        setFetching(true);
        const response = await shippingService.getZoneById(id);
        const data = unwrapApiData(response) ?? response?.data ?? response;
        if (data) {
          const countriesStr = Array.isArray(data.countries)
            ? data.countries.join(", ")
            : typeof data.countries === "string"
              ? data.countries
              : "";
          setFormData({
            name: data.name ?? "",
            description: data.description ?? "",
            countries: countriesStr,
            priceModifier: data.priceModifier != null ? String(data.priceModifier) : "",
            isActive: data.isActive !== false,
          });
        } else {
          toast.error("منطقه ارسال یافت نشد");
        }
      } catch (error) {
        toast.error(error?.message || "خطا در دریافت اطلاعات منطقه");
        console.error("Error fetching shipping zone:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchZone();
  }, [id]);

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
      const response = await shippingService.updateZone(id, payload);
      if (response?.success !== false) {
        toast.success("منطقه ارسال با موفقیت به‌روزرسانی شد");
        router.push("/admin/shipping/zones");
      } else {
        toast.error(response?.message || "خطا در به‌روزرسانی منطقه");
      }
    } catch (error) {
      toast.error(error?.message || "خطا در به‌روزرسانی منطقه ارسال");
      console.error("Error updating shipping zone:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <AdminPageHeader title="ویرایش منطقه ارسال" subtitle="در حال بارگذاری..." icon={Truck} />
        <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3 rounded-2xl border border-gray-700/60 bg-gray-800/40">
          <Spinner size="lg" />
          <span>در حال بارگذاری اطلاعات منطقه...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AdminPageHeader
        title="ویرایش منطقه ارسال"
        subtitle="تغییر اطلاعات منطقه ارسال"
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
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
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
