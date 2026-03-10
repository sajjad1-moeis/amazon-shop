"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STATUS_OPTIONS = [
  { value: "open", label: "تیکت‌های باز" },
  { value: "closed", label: "تیکت‌های بسته" },
];

export default function TicketsFilters({ isInDrawer = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusValue = searchParams.get("status") || "all";
  const phoneNumberValue = searchParams.get("phoneNumber") || "";

  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === "all" || !value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    newParams.delete("page");
    router.push(`/admin/tickets?${newParams.toString()}`);
  };

  const handleStatusChange = (value) => {
    updateURL({ status: value, search: searchValue, phoneNumber: phoneNumberValue });
  };

  const searchValue = searchParams.get("search") || "";

  const handleSearchChange = (value) => {
    updateURL({ search: value, status: statusValue, phoneNumber: phoneNumberValue });
  };

  const handlePhoneChange = (value) => {
    updateURL({ phoneNumber: value || undefined, search: searchValue, status: statusValue });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput value={searchValue} onChange={handleSearchChange} isAdmin placeholder="جستجو نام" />

      <div className="flex items-center gap-2">
        <Label className="text-gray-400 text-sm whitespace-nowrap">شماره موبایل</Label>
        <Input
          type="tel"
          dir="ltr"
          placeholder="09123456789"
          value={phoneNumberValue}
          onChange={(e) => handlePhoneChange(e.target.value || null)}
          className="max-w-[130px] bg-gray-700 border-gray-600 text-white h-10"
        />
      </div>

      <StatusSelect
        value={statusValue}
        onValueChange={handleStatusChange}
        placeholder="وضعیت"
        options={STATUS_OPTIONS}
        includeAll={true}
        isInDrawer={isInDrawer}
        isAdmin
      />
    </FilterSection>
  );
}
