"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";

const ROLE_OPTIONS = [
  { value: "Admin", label: "ادمین" },
  { value: "Student", label: "دانشجو" },
  { value: "User", label: "کاربر" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "فعال" },
  { value: "banned", label: "بن شده" },
];

export default function UsersFilters({ isInDrawer = false }) {
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
    <FilterSection isAdmin>
      <FilterSearchInput isAdmin placeholder="جستجو نام" />

      <StatusSelect
        value={filterRole}
        onValueChange={handleRoleChange}
        placeholder="وضعیت"
        options={ROLE_OPTIONS}
        includeAll={true}
        isInDrawer={isInDrawer}
        isAdmin
      />
      <StatusSelect
        isAdmin
        value={filterStatus}
        onValueChange={handleStatusChange}
        placeholder="وضعیت"
        options={STATUS_OPTIONS}
        includeAll={true}
        isInDrawer={isInDrawer}
      />
    </FilterSection>
  );
}
