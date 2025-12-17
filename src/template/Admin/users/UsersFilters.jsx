"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ROLE_OPTIONS = [
  { value: "all", label: "همه نقش‌ها" },
  { value: "Admin", label: "ادمین" },
  { value: "Student", label: "دانشجو" },
  { value: "User", label: "کاربر" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "همه" },
  { value: "active", label: "فعال" },
  { value: "banned", label: "بن شده" },
];

export default function UsersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterRole = searchParams.get("role") || "all";
  const filterStatus = searchParams.get("status") || "all";

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
    router.push(`/admin/users?${newParams.toString()}`);
  };

  const handleRoleChange = (value) => {
    updateURL({ role: value, status: filterStatus });
  };

  const handleStatusChange = (value) => {
    updateURL({ role: filterRole, status: value });
  };

  return (
    <div className="flex gap-2">
      <Select value={filterRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px] w-[140px]">
          <SelectValue placeholder="نقش" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {ROLE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filterStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px] w-[160px]">
          <SelectValue placeholder="وضعیت" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
