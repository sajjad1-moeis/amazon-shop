"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import UsersTable from "@/template/Admin/users/UsersTable";
import UsersFilters from "@/template/Admin/users/UsersFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { userService } from "@/services/user/userService";

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const statusParam = searchParams.get("status");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState(roleParam || "all");
  const [filterStatus, setFilterStatus] = useState(statusParam || "all");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === "all" || !value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    router.push(`/admin/users?${newParams.toString()}`);
  };

  const handleRoleChange = (value) => {
    setFilterRole(value);
    setPageNumber(1);
    updateURL({ role: value, status: filterStatus });
  };

  const handleStatusChange = (value) => {
    setFilterStatus(value);
    setPageNumber(1);
    updateURL({ role: filterRole, status: value });
  };

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userService.getUsersWithFilters({
        pageNumber,
        pageSize,
        searchTerm: searchTerm || undefined,
        isActive: filterStatus === "active" ? true : undefined,
        isBanned: filterStatus === "banned" ? true : undefined,
        roleName: filterRole === "all" ? undefined : filterRole,
        sortBy: "createdAt",
        sortDescending: true,
      });

      if (response.success && response.data) {
        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.totalCount || 0);
      }
    } catch (error) {
      toast.error(error.message || error.data?.message || "خطا در دریافت کاربران");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, searchTerm, filterStatus, filterRole]);

  useEffect(() => {
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    if (role) setFilterRole(role);
    if (status) setFilterStatus(status);
  }, [searchParams]);

  useEffect(() => {
    if (searchTerm) setPageNumber(1);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeaderWithSearch title="لیست کاربران" searchPlaceholder="جستجو نام" onSearchChange={setSearchTerm}>
          <UsersFilters
            filterRole={filterRole}
            onRoleChange={handleRoleChange}
            filterStatus={filterStatus}
            onStatusChange={handleStatusChange}
          />
        </PageHeaderWithSearch>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <UsersTable users={users} />
            <div className="mt-6 pt-6 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
