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
  { value: "inactive", label: "غیرفعال" },
  { value: "banned", label: "بن شده" },
];

export default function UsersFilters({ isInDrawer = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterRole = searchParams.get("role") || "all";
  const filterStatus = searchParams.get("status") || "all";
  const searchValue = searchParams.get("search") || "";

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


  const handleStatusChange = (value) => {
    updateURL({ role: filterRole, status: value, search: searchValue });
  };

  const handleSearchChange = (value) => {
    updateURL({ role: filterRole, status: filterStatus, search: value || undefined });
  };

  const handleRoleChangeWithSearch = (value) => {
    updateURL({ role: value, status: filterStatus, search: searchValue });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput
        value={searchValue}
        onChange={handleSearchChange}
        isAdmin
        placeholder="جستجو نام، ایمیل یا شماره موبایل"
      />

      <StatusSelect
        value={filterRole}
        onValueChange={handleRoleChangeWithSearch}
        placeholder="نقش کاربر"
        options={ROLE_OPTIONS}
        includeAll={true}
        isInDrawer={isInDrawer}
        isAdmin
      />
      <StatusSelect
        isAdmin
        value={filterStatus}
        onValueChange={handleStatusChange}
        placeholder="وضعیت حساب"
        options={STATUS_OPTIONS}
        includeAll={true}
        isInDrawer={isInDrawer}
      />
    </FilterSection>
  );
}
