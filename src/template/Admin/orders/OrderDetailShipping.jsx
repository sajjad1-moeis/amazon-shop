"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Truck, ExternalDrive } from "iconsax-reactjs";

export default function AdminOrderDetailShipping({ trackingCodes = [], order = {}, onUpdated }) {
  const list = Array.isArray(trackingCodes) ? trackingCodes : [];
  const trackingNumber = order?.trackingNumber ?? order?.trackingCode ?? order?.tracking;
  const shippingCompany = order?.shippingCompany ?? order?.carrier;

  if (list.length === 0 && !trackingNumber && !shippingCompany) {
    return (
      <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Truck size={20} />
          کدهای رهگیری
        </h2>
        <p className="text-gray-400 text-sm">کد رهگیری ثبت نشده</p>
      </div>
    );
  }

  const items = list.length > 0
    ? list
    : [{ label: shippingCompany || "کد رهگیری", code: trackingNumber, url: null }];

  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Truck size={20} />
        کدهای رهگیری
      </h2>
      <div className="space-y-3">
        {items.map((t, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg bg-gray-600/50 border border-gray-600"
          >
            <div className="min-w-0 flex-1">
              <p className="text-gray-400 text-sm">{t.label}</p>
              <p className="text-gray-200 font-mono text-sm break-all" dir="ltr">
                {t.code}
              </p>
            </div>
            {t.url && (
              <Button
                variant="outline"
                size="sm"
                className="border-gray-500 text-gray-300 hover:bg-gray-600 shrink-0"
                onClick={() => window.open(t.url, "_blank")}
              >
                <ExternalDrive size={16} className="ml-1" />
                مشاهده در سایت
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
