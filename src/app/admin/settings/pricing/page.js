"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { pricingSettingsApi } from "@/services/admin/pricingService";
import { FORM_STYLES } from "@/template/Admin/formStyles";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

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
    <div className="space-y-6 max-w-4xl">
      <AdminPageHeader
        title="تنظیمات قیمت‌گذاری"
        subtitle="درصد سود، هزینه حمل، طرح اقساط و حداقل سفارش"
      />

      <div className={FORM_STYLES.card + " p-6"}>
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="defaultProfitPercent" className={FORM_STYLES.label}>
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
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="microlessServicePercent" className={FORM_STYLES.label}>
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
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customsPercent" className={FORM_STYLES.label}>
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
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baseTransportCostToman" className={FORM_STYLES.label}>
                  هزینه پایه حمل (تومان)
                </Label>
                <Input
                  id="baseTransportCostToman"
                  name="baseTransportCostToman"
                  type="number"
                  min="0"
                  value={settings.baseTransportCostToman ?? ""}
                  onChange={handleChange}
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minOrderAmountToman" className={FORM_STYLES.label}>
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
                  className={FORM_STYLES.input}
                />
                <label className="flex items-center gap-2 mt-2 text-sm text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clearMinOrder}
                    onChange={(e) => setClearMinOrder(e.target.checked)}
                    className="rounded border-gray-600 focus:ring-emerald-500/30"
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
                  className="rounded border-gray-600 focus:ring-emerald-500/30"
                />
                <Label htmlFor="showBreakdownOnSite" className={FORM_STYLES.label + " cursor-pointer"}>
                  نمایش شکست قیمت در سایت
                </Label>
              </div>
            </div>

            <div className="border-t border-gray-700/60 pt-6">
              <h3 className={FORM_STYLES.cardTitle + " mb-4"}>طرح اقساط ۲۰٪</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className={FORM_STYLES.label}>درصد پیش‌پرداخت</Label>
                  <Input
                    name="installmentPlan20DownPercent"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.installmentPlan20DownPercent ?? ""}
                    onChange={handleChange}
                    className={FORM_STYLES.input}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={FORM_STYLES.label}>درصد سود</Label>
                  <Input
                    name="installmentPlan20InterestPercent"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.installmentPlan20InterestPercent ?? ""}
                    onChange={handleChange}
                    className={FORM_STYLES.input}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700/60 pt-6">
              <h3 className={FORM_STYLES.cardTitle + " mb-4"}>طرح اقساط ۳۰٪</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className={FORM_STYLES.label}>درصد پیش‌پرداخت</Label>
                  <Input
                    name="installmentPlan30DownPercent"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.installmentPlan30DownPercent ?? ""}
                    onChange={handleChange}
                    className={FORM_STYLES.input}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={FORM_STYLES.label}>درصد سود</Label>
                  <Input
                    name="installmentPlan30InterestPercent"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.installmentPlan30InterestPercent ?? ""}
                    onChange={handleChange}
                    className={FORM_STYLES.input}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-700/60">
              <Button type="submit" disabled={saving} className={FORM_STYLES.button}>
                {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
