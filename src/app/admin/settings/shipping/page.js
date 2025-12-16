"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { settingsService } from "@/services/settings/settingsService";

export default function ShippingSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    defaultMethod: "",
    freeShippingThreshold: "",
    defaultWeight: "",
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getShipping();

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
      const response = await settingsService.updateShipping(settings);
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
        <h1 className="text-3xl font-bold text-white mb-2">تنظیمات ارسال</h1>
        <p className="text-gray-400">تنظیمات روش‌های ارسال</p>
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
                  <Label htmlFor="defaultMethod" className="text-gray-300">
                    روش ارسال پیش‌فرض
                  </Label>
                  <Input
                    id="defaultMethod"
                    name="defaultMethod"
                    value={settings.defaultMethod}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="freeShippingThreshold" className="text-gray-300">
                    حداقل مبلغ ارسال رایگان (تومان)
                  </Label>
                  <Input
                    id="freeShippingThreshold"
                    name="freeShippingThreshold"
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="defaultWeight" className="text-gray-300">
                    وزن پیش‌فرض (گرم)
                  </Label>
                  <Input
                    id="defaultWeight"
                    name="defaultWeight"
                    type="number"
                    value={settings.defaultWeight}
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

