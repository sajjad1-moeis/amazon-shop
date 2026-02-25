"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { userDashboardService } from "@/services/userDashboard/userDashboardService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

export default function CurrencyRates() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    userDashboardService
      .getCurrencyRates()
      .then((res) => {
        if (cancelled) return;
        const raw = res;
        const data = unwrapApiData(raw);
        let list =
          Array.isArray(data) ? data
          : Array.isArray(data?.rates) ? data.rates
          : Array.isArray(data?.currencies) ? data.currencies
          : Array.isArray(data?.items) ? data.items
          : Array.isArray(data?.currencyRates) ? data.currencyRates
          : Array.isArray(data?.result) ? data.result
          : Array.isArray(data?.list) ? data.list
          : null;
        if (list == null && data && typeof data === "object" && !Array.isArray(data)) {
          const firstKey = Object.keys(data).find((k) => Array.isArray(data[k]));
          if (firstKey) list = data[firstKey];
        }
        const normalized = (list ?? []).map((item) => ({
          id: item.id ?? item.currencyId,
          code: item.code ?? item.currencyCode ?? item.symbol ?? "",
          name: item.name ?? item.currencyName ?? item.title ?? "",
          rate: item.rate ?? item.value ?? item.price ?? item.rateValue ?? item.amount,
          change: item.change ?? item.changePercent ?? item.percentChange ?? 0,
          flag: item.flag ?? item.icon,
        }));
        setCurrencies(normalized);
      })
      .catch((err) => {
        if (!cancelled) setCurrencies([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mb-6 flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mb-6">
      <div className="mb-6 md:mb-8">
        <h3 className="text-sm md:text-lg text-gray-700 dark:text-dark-titre mb-1">نرخ لحظه ای ارز</h3>
        <p className="text-xs md:text-sm text-gray-600 dark:text-dark-text">به روز رسانی هر ۵ دقیقه</p>
      </div>

      {currencies.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-dark-text py-4">نرخ ارزی موجود نیست</p>
      ) : (
        <div className="space-y-4 grid lg:grid-cols-1 md:grid-cols-2">
          {currencies.map((currency, index) => {
            const rawRate = currency.rate ?? currency.value ?? currency.price;
            const rate =
              rawRate == null || rawRate === ""
                ? "-"
                : typeof rawRate === "number" && Number.isFinite(rawRate)
                  ? rawRate.toLocaleString("fa-IR")
                  : String(rawRate);
            const change = currency.change ?? currency.changePercent ?? 0;
            const isPositive = typeof change === "number" ? change >= 0 : String(change).startsWith("+");
            return (
              <div
                key={currency.id ?? currency.code ?? index}
                className={cn(
                  "flex items-center justify-between max-md:pb-4 max-lg:px-4 border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
                  index < currencies.length - 1 && "max-lg:border-l max-md:border-b max-md:!border-l-0"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl">{currency.flag ?? "💱"}</span>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-caption">
                      {currency.name ?? currency.currencyName ?? ""} ({currency.code ?? currency.currencyCode ?? ""})
                    </p>
                    <p className="text-lg text-gray-800 dark:text-dark-titre mt-1">{rate}</p>
                  </div>
                </div>
                <div className="text-left">
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded text-lg font-medium",
                    isPositive ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30" : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
                  )}>
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{typeof change === "number" ? (change >= 0 ? `+${change}` : change) : change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
