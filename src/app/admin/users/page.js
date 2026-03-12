"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { People } from "iconsax-reactjs";
import UsersTable from "@/template/Admin/users/UsersTable";
import UsersFilters from "@/template/Admin/users/UsersFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/user/userService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

export default function UsersPage() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const statusParam = searchParams.get("status");
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search") || "";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(pageParam ? parseInt(pageParam) : 1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  const filterRole = roleParam || "all";
  const filterStatus = statusParam || "all";

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setPageNumber(parseInt(page));
    } else {
      setPageNumber(1);
    }
  }, [searchParams]);

  const principal = currentUser?.id ?? currentUser?.userId;

  const fetchUsers = useCallback(async () => {
    if (principal == null) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await userService.getUsersWithFilters({
        principal,
        pageNumber,
        pageSize,
        searchTerm: searchParam.trim() || undefined,
        isActive:
          filterStatus === "active" ? true : filterStatus === "inactive" ? false : undefined,
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
  }, [principal, pageNumber, pageSize, searchParam, filterStatus, filterRole]);

  const handleChangeStatus = async (userId, isActive) => {
    try {
      setStatusLoadingId(userId);
      unwrapApiData(await userService.changeUserStatus(userId, isActive));
      toast.success(isActive ? "کاربر فعال شد" : "کاربر غیرفعال شد");
      fetchUsers();
    } catch (error) {
      toast.error(error?.message || error?.data?.message || "خطا در تغییر وضعیت کاربر");
    } finally {
      setStatusLoadingId(null);
    }
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/users?${params.toString()}`);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="لیست کاربران" subtitle="مدیریت و جستجوی کاربران سیستم" icon={People}>
        <UsersFilters />
      </AdminPageHeader>
      <AdminSectionCard title="جدول کاربران">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <UsersTable
                users={users}
                onStatusChange={handleChangeStatus}
                statusLoadingId={statusLoadingId}
              />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </AdminSectionCard>
    </div>
  );
}
