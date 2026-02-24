"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { dollarRateService } from "@/services/currency/dollarRateService";
import { currencyRateService } from "@/services/currency/currencyRateService";
import { unwrapApiData } from "@/services/api/client";

function formatDate(str) {
  if (!str) return "—";
  try {
    return new Date(str).toLocaleDateString("fa-IR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return str;
  }
}

function formatNum(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("fa-IR");
}

export default function AdminCurrencyRatesPage() {
  const [dollar, setDollar] = useState(null);
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [manualRate, setManualRate] = useState("");
  const [updateRate, setUpdateRate] = useState("");
  const [editCurrency, setEditCurrency] = useState("");
  const [editRate, setEditRate] = useState("");

  const loadDollar = async () => {
    try {
      const res = await dollarRateService.getCurrent();
      setDollar(unwrapApiData(res));
    } catch {
      setDollar(null);
    }
  };

  const loadRates = async () => {
    try {
      const res = await currencyRateService.latest();
      const data = unwrapApiData(res);
      setRates(Array.isArray(data?.rates) ? data.rates : []);
    } catch {
      setRates([]);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      await Promise.all([loadDollar(), loadRates()]);
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSetManual = async (e) => {
    e.preventDefault();
    const rate = parseFloat(manualRate);
    if (!Number.isFinite(rate) || rate <= 0) {
      toast.error("نرخ معتبر وارد کنید");
      return;
    }
    try {
      setActionLoading(true);
      await dollarRateService.set({ isManual: true, manualRate: rate });
      toast.success("نرخ دلار تنظیم شد");
      setManualRate("");
      loadDollar();
    } catch (e) {
      toast.error(e.message || "خطا در تنظیم نرخ");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateDollar = async (e) => {
    e.preventDefault();
    const rate = parseFloat(updateRate);
    if (!Number.isFinite(rate) || rate <= 0) {
      toast.error("نرخ معتبر وارد کنید");
      return;
    }
    try {
      setActionLoading(true);
      await dollarRateService.update({ rate });
      toast.success("نرخ دلار به‌روز شد");
      setUpdateRate("");
      loadDollar();
    } catch (e) {
      toast.error(e.message || "خطا در به‌روزرسانی");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateAll = async () => {
    try {
      setActionLoading(true);
      await dollarRateService.updateAll();
      toast.success("نرخ‌ها از API به‌روز شدند");
      loadDollar();
      loadRates();
    } catch (e) {
      toast.error(e.message || "خطا در به‌روزرسانی");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateCurrency = async (e) => {
    e.preventDefault();
    const currency = editCurrency.trim().toUpperCase();
    const rate = parseFloat(editRate);
    if (!currency || !Number.isFinite(rate) || rate <= 0) {
      toast.error("کد ارز و نرخ معتبر وارد کنید");
      return;
    }
    try {
      setActionLoading(true);
      await currencyRateService.update({ currency, rate });
      toast.success("نرخ به‌روز شد");
      setEditCurrency("");
      setEditRate("");
      loadRates();
    } catch (e) {
      toast.error(e.message || "خطا در به‌روزرسانی");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-lg md:text-xl text-gray-100">نرخ ارز</h1>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">نرخ دلار</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dollar && (
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-gray-300">
                نرخ فعلی: <strong className="text-white">{formatNum(dollar.rate)}</strong> تومان
              </span>
              <span className="text-gray-400">
                {dollar.isManualRate ? "دستی" : "اتوماتیک"} · آخرین به‌روز: {formatDate(dollar.lastUpdated)}
              </span>
            </div>
          )}
          <form onSubmit={handleSetManual} className="flex flex-wrap items-end gap-3">
            <div>
              <Label className="text-gray-400 text-sm">نرخ دستی (تومان)</Label>
              <Input
                type="number"
                step="0.01"
                value={manualRate}
                onChange={(e) => setManualRate(e.target.value)}
                placeholder="مثال: 50000"
                className="mt-1 w-40 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button type="submit" disabled={actionLoading} size="sm">
              {actionLoading ? <Spinner size="sm" /> : "تنظیم نرخ دستی"}
            </Button>
          </form>
          <form onSubmit={handleUpdateDollar} className="flex flex-wrap items-end gap-3">
            <div>
              <Label className="text-gray-400 text-sm">به‌روزرسانی نرخ</Label>
              <Input
                type="number"
                step="0.01"
                value={updateRate}
                onChange={(e) => setUpdateRate(e.target.value)}
                placeholder="نرخ جدید"
                className="mt-1 w-40 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button type="submit" disabled={actionLoading} variant="outline" size="sm">
              به‌روز کردن
            </Button>
          </form>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUpdateAll}
            disabled={actionLoading}
          >
            به‌روزرسانی همه از API
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">نرخ ارزها</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleUpdateCurrency} className="flex flex-wrap items-end gap-3">
            <div>
              <Label className="text-gray-400 text-sm">کد ارز (مثلاً USD)</Label>
              <Input
                value={editCurrency}
                onChange={(e) => setEditCurrency(e.target.value.toUpperCase())}
                placeholder="USD"
                maxLength={10}
                className="mt-1 w-24 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-400 text-sm">نرخ (تومان)</Label>
              <Input
                type="number"
                step="0.01"
                value={editRate}
                onChange={(e) => setEditRate(e.target.value)}
                placeholder="نرخ"
                className="mt-1 w-32 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button type="submit" disabled={actionLoading} size="sm">
              به‌روز کردن
            </Button>
          </form>
          {rates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-right text-gray-400 border-b border-gray-700">
                    <th className="p-2">ارز</th>
                    <th className="p-2">نرخ</th>
                    <th className="p-2">به‌روزرسانی</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.map((r) => (
                    <tr key={r.currency || r.id} className="border-b border-gray-700/50">
                      <td className="p-2 text-white">{r.currencyName || r.currency}</td>
                      <td className="p-2 text-gray-300">{formatNum(r.rate)}</td>
                      <td className="p-2 text-gray-500">{formatDate(r.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">نرخی موجود نیست</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
