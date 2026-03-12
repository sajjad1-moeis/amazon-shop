"use client";

import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const OTHER_SERVICES = [
  { value: "razer-gold", label: "گیفت کارت ریزر گلد" },
  { value: "visa-au", label: "پرداخت هزینه ویزا و سفارت استرالیا" },
  { value: "visa-ca", label: "پرداخت هزینه ویزا و سفارت کانادا" },
  { value: "application-fee", label: "اپلیکیشن فی" },
  { value: "vpn-premium", label: "خرید اکانت VPN پریمیوم" },
  { value: "apple-gift", label: "گیفت کارت اپل" },
  { value: "google-play", label: "گیفت کارت گوگل پلی" },
  { value: "xbox-live", label: "گیفت کارت Xbox Live" },
  { value: "mina-card", label: "مینا کارت مجازی قابل شارژ (۳ ساله)" },
  { value: "godaddy", label: "خرید از Godaddy" },
];

export default function OtherServicesModal({ open, onOpenChange, onSelect }) {
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return OTHER_SERVICES;
    return OTHER_SERVICES.filter((s) => s.label.toLowerCase().includes(query));
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[calc(100%-32px)] p-6 sm:p-8 rounded-2xl bg-white dark:bg-dark-box dark:border-dark-stroke">
        <DialogHeader className="text-right">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">انتخاب خدمات</DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-4" dir="rtl">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="نام خدمت مورد نظر را سرچ کنید..."
            className="h-12 rounded-xl border-2 border-gray-200 dark:border-dark-stroke bg-gray-50 dark:bg-dark-field placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />

          <div className="max-h-[55vh] overflow-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => onSelect?.(s)}
                  className="h-14 rounded-xl bg-[#EEF0FA] dark:bg-white/10 text-primary-700 dark:text-dark-title font-medium text-base hover:bg-[#E6E9F7] dark:hover:bg-white/15 transition-colors"
                >
                  {s.label}
                </button>
              ))}
              {items.length === 0 && (
                <div className="sm:col-span-2 text-center text-gray-500 dark:text-gray-400 py-8">موردی یافت نشد.</div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

