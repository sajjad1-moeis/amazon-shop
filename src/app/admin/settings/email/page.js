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
import { FORM_STYLES } from "@/template/Admin/formStyles";

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>SMTP Host</Label>
                <Input name="smtpHost" value={settings.smtpHost || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>SMTP Port</Label>
                <Input name="smtpPort" type="number" value={settings.smtpPort ?? ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>SMTP User</Label>
                <Input name="smtpUser" value={settings.smtpUser || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>SMTP Password</Label>
                <Input name="smtpPassword" type="password" value={settings.smtpPassword || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>From Email / From Address</Label>
                <Input name="fromAddress" type="email" value={settings.fromAddress || settings.fromEmail || ""} onChange={handleChange} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-2">
                <Label className={FORM_STYLES.label}>From Name</Label>
                <Input name="fromName" value={settings.fromName || ""} onChange={handleChange} className={FORM_STYLES.input} />
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

