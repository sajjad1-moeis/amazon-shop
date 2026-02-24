"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "@/components/FilterSection";
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
  { value: "2", label: "فعال" },
  { value: "3", label: "تکمیل شده" },
  { value: "4", label: "درخواست جبران" },
  { value: "5", label: "منقضی شده" },
];

export default function ShippingInsuranceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId") || "";
  const userId = searchParams.get("userId") || "";
  const status = searchParams.get("status") || "";

  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value == null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    newParams.delete("page");
    router.push(`/admin/insurance?${newParams.toString()}`);
  };

  return (
    <FilterSection isAdmin>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Label className="text-gray-400 text-sm whitespace-nowrap">شناسه سفارش</Label>
          <Input
            type="number"
            placeholder="orderId"
            value={orderId}
            onChange={(e) => updateURL({ orderId: e.target.value || null })}
            className="max-w-[120px] bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-gray-400 text-sm whitespace-nowrap">شناسه کاربر</Label>
          <Input
            type="number"
            placeholder="userId"
            value={userId}
            onChange={(e) => updateURL({ userId: e.target.value || null })}
            className="max-w-[120px] bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>
      <Select
        value={status || "all"}
        onValueChange={(v) => updateURL({ status: v === "all" ? null : v })}
      >
        <SelectTrigger className="w-[160px] bg-gray-700 border-gray-600 text-white">
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
    </FilterSection>
  );
}
