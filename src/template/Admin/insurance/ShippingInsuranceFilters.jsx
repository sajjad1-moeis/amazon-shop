"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORM_STYLES } from "@/template/Admin/formStyles";

const STATUS_OPTIONS = [
  { value: "1", label: "در انتظار" },
  { value: "2", label: "فعال" },
  { value: "3", label: "تکمیل شده" },
  { value: "4", label: "درخواست جبران" },
  { value: "5", label: "منقضی شده" },
];

export default function ShippingInsuranceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId") || "";
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const status = searchParams.get("status") || "all";

  const updateURL = (updates) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value == null || value === "" || value === "all") next.delete(key);
      else next.set(key, String(value));
    });
    next.delete("page");
    const qs = next.toString();
    router.push(qs ? `/admin/insurance?${qs}` : "/admin/insurance");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        type="number"
        placeholder="شناسه سفارش"
        value={orderId}
        onChange={(e) => updateURL({ orderId: e.target.value || undefined, phoneNumber, status })}
        className={`w-[130px] h-10 ${FORM_STYLES.input}`}
      />
      <Input
        type="tel"
        dir="ltr"
        placeholder="شماره موبایل"
        value={phoneNumber}
        onChange={(e) => updateURL({ phoneNumber: e.target.value || undefined, orderId, status })}
        className={`w-[140px] h-10 ${FORM_STYLES.input}`}
      />
      <Select value={status} onValueChange={(v) => updateURL({ status: v, orderId, phoneNumber })}>
        <SelectTrigger className={`w-[180px] h-10 ${FORM_STYLES.selectTrigger}`}>
          <SelectValue placeholder="وضعیت" />
        </SelectTrigger>
        <SelectContent className={FORM_STYLES.selectContent}>
          <SelectItem value="all" className={FORM_STYLES.selectItem}>همه وضعیت‌ها</SelectItem>
          {STATUS_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value} className={FORM_STYLES.selectItem}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
