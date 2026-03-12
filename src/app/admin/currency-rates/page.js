"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { DollarCircle, MoneyRecive, Refresh2, WalletMoney } from "iconsax-reactjs";
import { dollarRateService } from "@/services/currency/dollarRateService";
import { currencyRateService } from "@/services/currency/currencyRateService";
import { unwrapApiData } from "@/services/api/client";
import { formatDateTimeFa } from "@/utils/adminDateUtils";

function formatNum(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("fa-IR");
}

function SectionCard({ title, icon: Icon, children, action }) {
  return (
    <Card className="bg-gray-700/30 border-gray-600 rounded-xl shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Icon size={20} className="text-amber-400" />
          {title}
        </CardTitle>
        {action}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function StatCard({ icon: Icon, label, value, hint, valueClassName = "text-white" }) {
  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4">
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        <Icon size={18} className="text-amber-400" />
        <span className="text-sm">{label}</span>
      </div>
      <p className={`text-xl font-bold ${valueClassName}`}>{value}</p>
      {hint ? <p className="text-xs text-gray-500 mt-1">{hint}</p> : null}
    </div>
  );
}

function ActionField({ label, children }) {
  return (
    <div>
      <Label className="text-gray-400 text-sm">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
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
    return () => {
      cancelled = true;
    };
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

  const latestRateUpdate = rates.reduce((latest, item) => {
    const currentValue = item?.updatedAt || item?.createdAt;
    if (!currentValue) return latest;
    if (!latest) return currentValue;
    return new Date(currentValue).getTime() > new Date(latest).getTime() ? currentValue : latest;
  }, null);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-lg md:text-xl text-gray-100">نرخ ارز</h1>
        <p className="text-sm text-gray-400">مدیریت نرخ دلار و ارزها با چیدمان یکپارچه با سایر صفحات پنل</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={DollarCircle}
          label="نرخ فعلی دلار"
          value={`${formatNum(dollar?.rate)} تومان`}
          hint={dollar?.lastUpdated ? `آخرین بروزرسانی: ${formatDateTimeFa(dollar.lastUpdated)}` : "—"}
        />
        <StatCard
          icon={WalletMoney}
          label="نوع نرخ"
          value={dollar?.isManualRate ? "دستی" : "اتوماتیک"}
          valueClassName={dollar?.isManualRate ? "text-amber-400" : "text-green-400"}
          hint={dollar?.isManualRate ? "با ورودی دستی ثبت شده" : "از منبع خودکار بروزرسانی می‌شود"}
        />
        <StatCard
          icon={MoneyRecive}
          label="تعداد ارزهای ثبت‌شده"
          value={formatNum(rates.length)}
          hint="تعداد نرخ‌های قابل مدیریت"
        />
        <StatCard
          icon={Refresh2}
          label="آخرین بروزرسانی ارزها"
          value={latestRateUpdate ? formatDateTimeFa(latestRateUpdate) : "—"}
          hint="آخرین زمان ثبت‌شده در لیست ارزها"
          valueClassName="text-sm md:text-base text-white leading-7"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard
          title="مدیریت نرخ دلار"
          icon={DollarCircle}
          action={
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUpdateAll}
              disabled={actionLoading}
              className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              {actionLoading ? <Spinner size="sm" /> : "بروزرسانی همه از API"}
            </Button>
          }
        >
          <div className="rounded-lg border border-gray-600 bg-gray-800/40 p-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-gray-500 mb-1">نرخ فعلی</p>
                <p className="text-white font-semibold text-lg">{formatNum(dollar?.rate)} تومان</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">حالت ثبت</p>
                <p className="text-gray-300">{dollar?.isManualRate ? "دستی" : "اتوماتیک"}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">آخرین بروزرسانی</p>
                <p className="text-gray-300">{formatDateTimeFa(dollar?.lastUpdated)}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSetManual} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
            <ActionField label="نرخ دستی (تومان)">
              <Input
                type="number"
                step="0.01"
                value={manualRate}
                onChange={(e) => setManualRate(e.target.value)}
                placeholder="مثال: 50000"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
              />
            </ActionField>
            <Button type="submit" disabled={actionLoading} className="w-full sm:w-auto">
              {actionLoading ? <Spinner size="sm" /> : "ثبت نرخ دستی"}
            </Button>
          </form>

          <form onSubmit={handleUpdateDollar} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
            <ActionField label="بروزرسانی نرخ دلار">
              <Input
                type="number"
                step="0.01"
                value={updateRate}
                onChange={(e) => setUpdateRate(e.target.value)}
                placeholder="نرخ جدید"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
              />
            </ActionField>
            <Button
              type="submit"
              disabled={actionLoading}
              variant="outline"
              className="w-full sm:w-auto border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              بروزرسانی
            </Button>
          </form>
        </SectionCard>

        <SectionCard title="ویرایش نرخ ارزها" icon={MoneyRecive}>
          <form
            onSubmit={handleUpdateCurrency}
            className="grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-3 items-end"
          >
            <ActionField label="کد ارز">
              <Input
                value={editCurrency}
                onChange={(e) => setEditCurrency(e.target.value.toUpperCase())}
                placeholder="USD"
                maxLength={10}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
              />
            </ActionField>
            <ActionField label="نرخ (تومان)">
              <Input
                type="number"
                step="0.01"
                value={editRate}
                onChange={(e) => setEditRate(e.target.value)}
                placeholder="نرخ"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
              />
            </ActionField>
            <Button type="submit" disabled={actionLoading} className="w-full sm:w-auto">
              ثبت
            </Button>
          </form>

          <div className="rounded-lg border border-dashed border-gray-600 bg-gray-800/30 p-4 text-sm text-gray-400">
            برای ویرایش مستقیم، کد ارز را وارد کنید و نرخ جدید را ثبت کنید. تاریخ‌ها در جدول پایین به فرمت فارسی نمایش
            داده می‌شوند.
          </div>
        </SectionCard>
      </div>

      <SectionCard title="لیست نرخ ارزها" icon={MoneyRecive}>
        {rates.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-600">
            <table className="w-full text-sm">
              <thead className="bg-gray-800/70">
                <tr className="text-right text-gray-400 border-b border-gray-600">
                  <th className="p-3 font-medium">ارز</th>
                  <th className="p-3 font-medium">کد</th>
                  <th className="p-3 font-medium">نرخ</th>
                  <th className="p-3 font-medium">آخرین بروزرسانی</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((r, index) => (
                  <tr
                    key={r.currency || r.id}
                    className={`border-b border-gray-700/70 last:border-0 ${index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}`}
                  >
                    <td className="p-3 text-white font-medium">{r.currencyName || r.currency || "—"}</td>
                    <td className="p-3 text-gray-300 font-mono text-right">{r.currency || "—"}</td>
                    <td className="p-3 text-gray-200">{formatNum(r.rate)} تومان</td>
                    <td className="p-3 text-gray-400">{formatDateTimeFa(r.updatedAt || r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">نرخی موجود نیست</p>
        )}
      </SectionCard>
    </div>
  );
}
