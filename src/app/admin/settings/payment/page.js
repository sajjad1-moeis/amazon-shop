"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Wallet3 } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { settingsService } from "@/services/settings/settingsService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

const DEFAULT_PAYMENT = { gateway: "", merchantId: "", apiKey: "", callbackUrl: "", isSandbox: false };

export default function PaymentSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_PAYMENT);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getPayment();
      const data = unwrapApiData(response);
      if (data && typeof data === "object") setSettings((prev) => ({ ...DEFAULT_PAYMENT, ...prev, ...data }));
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
      unwrapApiData(await settingsService.updatePayment(settings));
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
      <AdminPageHeader title="تنظیمات پرداخت" subtitle="تنظیمات درگاه‌های پرداخت" icon={Wallet3} />
      <AdminSectionCard title="فرم تنظیمات">
        {loading ? (
          <div className="p-8 text-center text-gray-400"><Spinner size="lg" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">درگاه پرداخت</Label>
                <Input name="gateway" value={settings.gateway || ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">Merchant ID</Label>
                <Input name="merchantId" value={settings.merchantId || ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">API Key</Label>
                <Input name="apiKey" type="password" value={settings.apiKey || ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">Callback URL</Label>
                <Input name="callbackUrl" value={settings.callbackUrl || ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-gray-900">
                {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
              </Button>
            </div>
          </form>
        )}
      </AdminSectionCard>
    </div>
  );
}

