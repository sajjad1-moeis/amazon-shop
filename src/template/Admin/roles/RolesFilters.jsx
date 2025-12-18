"use client";

import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roleService } from "@/services/role/roleService";

const STATUS_OPTIONS = [
  { value: "all", label: "همه" },
  { value: "active", label: "فعال" },
  { value: "inactive", label: "غیرفعال" },
];

export default function RolesFilters({ onFilterChange, filters }) {
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

  return (
    <div className="flex gap-2">
      <Select
        value={filters.roleName || "all"}
        onValueChange={handleRoleChange}
        disabled={loadingRoles}
      >
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px] w-[160px]">
          <SelectValue placeholder="نقش" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all">همه نقش‌ها</SelectItem>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.name}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.isActive === null ? "all" : filters.isActive ? "active" : "inactive"} onValueChange={handleStatusChange}>
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

