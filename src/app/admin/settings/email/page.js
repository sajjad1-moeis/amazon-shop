"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { settingsService } from "@/services/settings/settingsService";

export default function EmailSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "",
    fromName: "",
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getEmail();

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
      const response = await settingsService.updateEmail(settings);
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
        <h1 className="text-3xl font-bold text-white mb-2">تنظیمات ایمیل</h1>
        <p className="text-gray-400">تنظیمات ارسال ایمیل</p>
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
                  <Label htmlFor="smtpHost" className="text-gray-300">
                    SMTP Host
                  </Label>
                  <Input
                    id="smtpHost"
                    name="smtpHost"
                    value={settings.smtpHost}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort" className="text-gray-300">
                    SMTP Port
                  </Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpUser" className="text-gray-300">
                    SMTP User
                  </Label>
                  <Input
                    id="smtpUser"
                    name="smtpUser"
                    value={settings.smtpUser}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword" className="text-gray-300">
                    SMTP Password
                  </Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="fromEmail" className="text-gray-300">
                    From Email
                  </Label>
                  <Input
                    id="fromEmail"
                    name="fromEmail"
                    type="email"
                    value={settings.fromEmail}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="fromName" className="text-gray-300">
                    From Name
                  </Label>
                  <Input
                    id="fromName"
                    name="fromName"
                    value={settings.fromName}
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

