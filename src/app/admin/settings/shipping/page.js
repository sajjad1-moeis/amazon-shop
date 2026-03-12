"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Truck } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { settingsService } from "@/services/settings/settingsService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { FORM_STYLES } from "@/template/Admin/formStyles";

const DEFAULT_SHIPPING = { defaultCarrier: "", defaultMethod: "", freeShippingThreshold: "", estimatedDaysMin: "", estimatedDaysMax: "", defaultWeight: "" };

export default function ShippingSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SHIPPING);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getShipping();
      const data = unwrapApiData(response);
      if (data && typeof data === "object") setSettings((prev) => ({ ...DEFAULT_SHIPPING, ...prev, ...data }));
    } catch (error) {
      toast.error(error.message || "خطا در دریافت تنظیمات");
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      unwrapApiData(await settingsService.updateShipping(settings));
      toast.success("تنظیمات با موفقیت به‌روزرسانی شد");
    } catch (error) {
      toast.error(error.message || "خطا در به‌روزرسانی تنظیمات");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="تنظیمات ارسال" subtitle="تنظیمات روش‌های ارسال" icon={Truck} />
      <AdminSectionCard title="فرم تنظیمات">
        {loading ? (
          <div className="p-8 text-center text-gray-400"><Spinner size="lg" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>حمل‌کننده پیش‌فرض</Label>
                <Input name="defaultCarrier" value={settings.defaultCarrier || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>روش ارسال پیش‌فرض</Label>
                <Input name="defaultMethod" value={settings.defaultMethod || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>حداقل مبلغ ارسال رایگان (تومان)</Label>
                <Input name="freeShippingThreshold" type="number" value={settings.freeShippingThreshold || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>حداقل روز تحویل</Label>
                <Input name="estimatedDaysMin" type="number" value={settings.estimatedDaysMin ?? ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>حداکثر روز تحویل</Label>
                <Input name="estimatedDaysMax" type="number" value={settings.estimatedDaysMax ?? ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>وزن پیش‌فرض (گرم)</Label>
                <Input name="defaultWeight" type="number" value={settings.defaultWeight || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-700/60">
              <Button type="submit" disabled={saving} className={FORM_STYLES.button}>
                {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
              </Button>
            </div>
          </form>
        )}
      </AdminSectionCard>
    </div>
  );
}

