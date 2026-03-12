"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Setting2 } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { settingsService } from "@/services/settings/settingsService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { FORM_STYLES } from "@/template/Admin/formStyles";

const DEFAULT_GENERAL = {
  siteName: "",
  siteDescription: "",
  siteUrl: "",
  logoUrl: "",
  adminEmail: "",
  phoneNumber: "",
  address: "",
  maintenanceMode: false,
  timeZone: "Asia/Tehran",
};

export default function GeneralSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_GENERAL);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getGeneral();
      const data = unwrapApiData(response);
      if (data && typeof data === "object") {
        setSettings((prev) => ({ ...DEFAULT_GENERAL, ...prev, ...data }));
      }
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
      const res = await settingsService.updateGeneral(settings);
      unwrapApiData(res);
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
      <AdminPageHeader title="تنظیمات عمومی" subtitle="تنظیمات کلی سیستم" icon={Setting2} />
      <AdminSectionCard title="فرم تنظیمات">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="siteName" className={FORM_STYLES.label}>نام سایت</Label>
                <Input id="siteName" name="siteName" value={settings.siteName || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl" className={FORM_STYLES.label}>آدرس سایت</Label>
                <Input id="siteUrl" name="siteUrl" value={settings.siteUrl || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoUrl" className={FORM_STYLES.label}>آدرس لوگو</Label>
                <Input id="logoUrl" name="logoUrl" value={settings.logoUrl || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeZone" className={FORM_STYLES.label}>منطقه زمانی</Label>
                <Input id="timeZone" name="timeZone" value={settings.timeZone || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="siteDescription" className={FORM_STYLES.label}>توضیحات سایت</Label>
                <Input id="siteDescription" name="siteDescription" value={settings.siteDescription || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail" className={FORM_STYLES.label}>ایمیل مدیر</Label>
                <Input id="adminEmail" name="adminEmail" type="email" value={settings.adminEmail || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className={FORM_STYLES.label}>شماره تماس</Label>
                <Input id="phoneNumber" name="phoneNumber" value={settings.phoneNumber || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address" className={FORM_STYLES.label}>آدرس</Label>
                <Input id="address" name="address" value={settings.address || ""} onChange={handleChange} className={FORM_STYLES.input} />
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

