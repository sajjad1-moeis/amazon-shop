"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  { value: "1", label: "در انتظار" },
  { value: "2", label: "در حال بررسی" },
  { value: "3", label: "تأیید شده" },
  { value: "4", label: "در حال پردازش" },
  { value: "5", label: "تکمیل شده" },
  { value: "6", label: "رد شده" },
  { value: "7", label: "لغو شده" },
];

const SERVICE_TYPE_OPTIONS = [
  { value: "1", label: "تبدیل ارز" },
  { value: "2", label: "پرداخت آنلاین" },
  { value: "3", label: "شارژ حساب ارزی" },
  { value: "4", label: "پرداخت آمازون" },
  { value: "5", label: "تسویه بین‌المللی" },
  { value: "6", label: "پرداخت سرویس‌های خارجی" },
  { value: "7", label: "پرداخت ارزی بین‌المللی" },
];

export default function CurrencyServicesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const serviceType = searchParams.get("serviceType") || "";
  const userId = searchParams.get("userId") || "";

  const update = (key, value) => {
    const q = new URLSearchParams(searchParams.toString());
    if (value == null || value === "") q.delete(key);
    else q.set(key, String(value));
    q.delete("page");
    router.push(`/admin/currency-services?${q.toString()}`);
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput
        value={search}
        onChange={(v) => update("search", v)}
        isAdmin
        placeholder="جستجو"
      />
      <div className="flex items-center gap-2">
        <Label className="text-gray-400 text-sm whitespace-nowrap">شناسه کاربر</Label>
        <Input
          type="number"
          placeholder="userId"
          value={userId}
          onChange={(e) => update("userId", e.target.value || null)}
          className="max-w-[100px] bg-gray-700 border-gray-600 text-white"
        />
      </div>
      <Select value={status || "all"} onValueChange={(v) => update("status", v === "all" ? null : v)}>
        <SelectTrigger className="w-[140px] bg-gray-700 border-gray-600 text-white">
          <SelectValue placeholder="وضعیت" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه وضعیت‌ها</SelectItem>
          {STATUS_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={serviceType || "all"}
        onValueChange={(v) => update("serviceType", v === "all" ? null : v)}
      >
        <SelectTrigger className="w-[160px] bg-gray-700 border-gray-600 text-white">
          <SelectValue placeholder="نوع سرویس" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه انواع</SelectItem>
          {SERVICE_TYPE_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FilterSection>
  );
}
