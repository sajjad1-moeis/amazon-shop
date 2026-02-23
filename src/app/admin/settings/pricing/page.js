"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { pricingSettingsApi } from "@/services/admin/pricingService";

const defaultSettings = {
  defaultProfitPercent: 0,
  microlessServicePercent: 0,
  customsPercent: 0,
  showBreakdownOnSite: false,
  installmentPlan20DownPercent: 20,
  installmentPlan20InterestPercent: 0,
  installmentPlan30DownPercent: 30,
  installmentPlan30InterestPercent: 0,
  minOrderAmountToman: null,
  baseTransportCostToman: 0,
};

export default function PricingSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [clearMinOrder, setClearMinOrder] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await pricingSettingsApi.get();
      setSettings((prev) => ({
        ...defaultSettings,
        ...prev,
        ...data,
      }));
    } catch (error) {
      toast.error(error?.message || "خطا در دریافت تنظیمات قیمت‌گذاری");
      console.error("Fetch pricing settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setSettings((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    const num = value === "" ? null : Number(value);
    setSettings((prev) => ({ ...prev, [name]: num }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {};
      const numKeys = [
        "defaultProfitPercent",
        "microlessServicePercent",
        "customsPercent",
        "installmentPlan20DownPercent",
        "installmentPlan20InterestPercent",
        "installmentPlan30DownPercent",
        "installmentPlan30InterestPercent",
        "baseTransportCostToman",
      ];
      numKeys.forEach((k) => {
        if (settings[k] !== undefined && settings[k] !== "" && settings[k] !== null) body[k] = Number(settings[k]);
      });
      if (settings.showBreakdownOnSite !== undefined) body.showBreakdownOnSite = !!settings.showBreakdownOnSite;
      if (clearMinOrder) body.clearMinOrderAmountToman = true;
      else if (settings.minOrderAmountToman !== undefined && settings.minOrderAmountToman !== "" && settings.minOrderAmountToman !== null)
        body.minOrderAmountToman = Number(settings.minOrderAmountToman);
      await pricingSettingsApi.update(body);
      toast.success("تنظیمات قیمت‌گذاری ذخیره شد");
      setClearMinOrder(false);
      fetchSettings();
    } catch (error) {
      toast.error(error?.message || "خطا در ذخیره تنظیمات");
      console.error("Update pricing settings:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">تنظیمات قیمت‌گذاری</h1>
        <p className="text-gray-400">درصد سود، هزینه حمل، طرح اقساط و حداقل سفارش</p>
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
                  <Label htmlFor="defaultProfitPercent" className="text-gray-300">
                    درصد سود پیش‌فرض
                  </Label>
                  <Input
                    id="defaultProfitPercent"
                    name="defaultProfitPercent"
                    type="number"
                    min="0"
                    max="1000"
                    value={settings.defaultProfitPercent ?? ""}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="microlessServicePercent" className="text-gray-300">
                    درصد سرویس میکرولس
                  </Label>
                  <Input
                    id="microlessServicePercent"
                    name="microlessServicePercent"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.microlessServicePercent ?? ""}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="customsPercent" className="text-gray-300">
                    درصد گمرک
                  </Label>
                  <Input
                    id="customsPercent"
                    name="customsPercent"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.customsPercent ?? ""}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="baseTransportCostToman" className="text-gray-300">
                    هزینه پایه حمل (تومان)
                  </Label>
                  <Input
                    id="baseTransportCostToman"
                    name="baseTransportCostToman"
                    type="number"
                    min="0"
                    value={settings.baseTransportCostToman ?? ""}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="minOrderAmountToman" className="text-gray-300">
                    حداقل مبلغ سفارش (تومان)
                  </Label>
                  <Input
                    id="minOrderAmountToman"
                    name="minOrderAmountToman"
                    type="number"
                    min="0"
                    value={settings.minOrderAmountToman ?? ""}
                    onChange={handleChange}
                    placeholder="خالی = غیرفعال"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <label className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      checked={clearMinOrder}
                      onChange={(e) => setClearMinOrder(e.target.checked)}
                    />
                    حذف حداقل سفارش (غیرفعال کردن)
                  </label>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="showBreakdownOnSite"
                    name="showBreakdownOnSite"
                    checked={!!settings.showBreakdownOnSite}
                    onChange={handleChange}
                    className="rounded border-gray-600"
                  />
                  <Label htmlFor="showBreakdownOnSite" className="text-gray-300 cursor-pointer">
                    نمایش شکست قیمت در سایت
                  </Label>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="text-white font-medium mb-3">طرح اقساط ۲۰٪</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">درصد پیش‌پرداخت</Label>
                    <Input
                      name="installmentPlan20DownPercent"
                      type="number"
                      min="0"
                      max="100"
                      value={settings.installmentPlan20DownPercent ?? ""}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">درصد سود</Label>
                    <Input
                      name="installmentPlan20InterestPercent"
                      type="number"
                      min="0"
                      max="100"
                      value={settings.installmentPlan20InterestPercent ?? ""}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-white font-medium mb-3">طرح اقساط ۳۰٪</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">درصد پیش‌پرداخت</Label>
                    <Input
                      name="installmentPlan30DownPercent"
                      type="number"
                      min="0"
                      max="100"
                      value={settings.installmentPlan30DownPercent ?? ""}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">درصد سود</Label>
                    <Input
                      name="installmentPlan30InterestPercent"
                      type="number"
                      min="0"
                      max="100"
                      value={settings.installmentPlan30InterestPercent ?? ""}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
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
