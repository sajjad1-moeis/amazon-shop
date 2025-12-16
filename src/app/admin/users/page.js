"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import SearchBarTopTable from "@/template/Admin/SearchBarTopTable";
import UsersTable from "@/template/Admin/users/UsersTable";
import UsersFilters from "@/template/Admin/users/UsersFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { userService } from "@/services/user/userService";

export default function UsersPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(statusParam || "all");
  const [filterVIP, setFilterVIP] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getPaginated({
        pageNumber,
        pageSize,
        isActive: filterStatus === "all" ? undefined : filterStatus === "active",
        isVip: filterVIP === "all" ? undefined : filterVIP === "vip",
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setUsers(response.data.users || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت کاربران");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setPageNumber(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber, filterStatus, filterVIP, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <div className="mb-5 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
          <h1 className="text-xl text-gray-100">لیست کاربران</h1>

          <SearchBarTopTable
            placeholder="جستجو نام"
            onInput={(value) => setSearchTerm(value)}
            inputContainerClass="max-lg:flex-col flex flex-row-reverse gap-2 flex-none max-lg:mt-5"
          >
            <UsersFilters
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterVIP={filterVIP}
              setFilterVIP={setFilterVIP}
            />
          </SearchBarTopTable>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <UsersTable users={users} />
            <div className="mt-6 pt-6 border-t border-gray-700">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
