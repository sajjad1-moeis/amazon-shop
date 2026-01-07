"use client";

import React, { useState, useEffect } from "react";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import { roleService } from "@/services/role/roleService";

const STATUS_OPTIONS = [
  { value: "active", label: "فعال" },
  { value: "inactive", label: "غیرفعال" },
];

export default function RolesFilters({ onFilterChange, filters, isInDrawer = false }) {
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoadingRoles(true);
      const response = await roleService.getAllRoles();
      if (response && response.success && response.data) {
        setRoles(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoadingRoles(false);
    }
  };

  const handleRoleChange = (value) => {
    onFilterChange({ ...filters, roleName: value === "all" ? "" : value });
  };

  const handleStatusChange = (value) => {
    onFilterChange({
      ...filters,
      isActive: value === "all" ? null : value === "active",
    });
  };

  const roleOptions = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  const handleSearchChange = (value) => {
    onFilterChange({ ...filters, searchTerm: value });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput
        value={filters.searchTerm || ""}
        onChange={handleSearchChange}
        isAdmin
        placeholder="جستجو نام"
      />

      <StatusSelect
        value={filters.roleName || "all"}
        onValueChange={handleRoleChange}
        placeholder="نقش"
        options={roleOptions}
        includeAll={true}
        isInDrawer={isInDrawer}
        isAdmin
      />
      <StatusSelect
        value={filters.isActive === null ? "all" : filters.isActive ? "active" : "inactive"}
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
