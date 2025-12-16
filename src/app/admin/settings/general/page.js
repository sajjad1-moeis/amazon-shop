"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { settingsService } from "@/services/settings/settingsService";

export default function GeneralSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    siteUrl: "",
    adminEmail: "",
    phoneNumber: "",
    address: "",
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getGeneral();

      if (response.success && response.data) {
        setSettings(response.data);
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
      const response = await settingsService.updateGeneral(settings);
      if (response.success) {
        toast.success("تنظیمات با موفقیت به‌روزرسانی شد");
      }
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
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">تنظیمات عمومی</h1>
        <p className="text-gray-400">تنظیمات کلی سیستم</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">فرم تنظیمات</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="p-8 text-center text-gray-400">
              <Spinner size="lg" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName" className="text-gray-300">
                    نام سایت
                  </Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl" className="text-gray-300">
                    آدرس سایت
                  </Label>
                  <Input
                    id="siteUrl"
                    name="siteUrl"
                    value={settings.siteUrl}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="siteDescription" className="text-gray-300">
                    توضیحات سایت
                  </Label>
                  <Input
                    id="siteDescription"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail" className="text-gray-300">
                    ایمیل مدیر
                  </Label>
                  <Input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-gray-300">
                    شماره تماس
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={settings.phoneNumber}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-gray-300">
                    آدرس
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

