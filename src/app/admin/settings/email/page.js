"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sms } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { settingsService } from "@/services/settings/settingsService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

const DEFAULT_EMAIL = { smtpHost: "", smtpPort: "", smtpUser: "", smtpPassword: "", fromAddress: "", fromEmail: "", fromName: "", useSsl: false };

export default function EmailSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_EMAIL);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getEmail();
      const data = unwrapApiData(response);
      if (data && typeof data === "object") setSettings((prev) => ({ ...DEFAULT_EMAIL, ...prev, ...data }));
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
      unwrapApiData(await settingsService.updateEmail(settings));
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
      <AdminPageHeader title="تنظیمات ایمیل" subtitle="تنظیمات ارسال ایمیل (SMTP)" icon={Sms} />
      <AdminSectionCard title="فرم تنظیمات">
        {loading ? (
          <div className="p-8 text-center text-gray-400"><Spinner size="lg" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">SMTP Host</Label>
                <Input name="smtpHost" value={settings.smtpHost || ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">SMTP Port</Label>
                <Input name="smtpPort" type="number" value={settings.smtpPort ?? ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">SMTP User</Label>
                <Input name="smtpUser" value={settings.smtpUser || ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">SMTP Password</Label>
                <Input name="smtpPassword" type="password" value={settings.smtpPassword || ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">From Email / From Address</Label>
                <Input name="fromAddress" type="email" value={settings.fromAddress || settings.fromEmail || ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">From Name</Label>
                <Input name="fromName" value={settings.fromName || ""} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white mt-1" />
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

