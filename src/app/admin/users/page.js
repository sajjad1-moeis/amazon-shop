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
  const pageParam = searchParams.get("page");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(pageParam ? parseInt(pageParam) : 1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

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

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/users?${params.toString()}`);
  };

  useEffect(() => {
    if (searchTerm) {
      setPageNumber(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="space-y-6">
      <div className="">
        <PageHeaderWithSearch title="لیست کاربران" searchPlaceholder="جستجو نام" onSearchChange={setSearchTerm}>
          <UsersFilters />
        </PageHeaderWithSearch>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <UsersTable users={users} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
