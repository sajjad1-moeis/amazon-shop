"use client";

import React from "react";
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

export default function UsersFilters({ filterRole, onRoleChange, filterStatus, onStatusChange }) {
  return (
    <>
      <Select value={filterRole} onValueChange={onRoleChange}>
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

      <Select value={filterStatus} onValueChange={onStatusChange}>
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
    </>
  );
}
