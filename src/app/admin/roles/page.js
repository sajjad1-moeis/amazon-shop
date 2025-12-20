"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Add } from "iconsax-reactjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import RolesTable from "@/template/Admin/roles/RolesTable";
import RolesFilters from "@/template/Admin/roles/RolesFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Spinner } from "@/components/ui/spinner";
import { roleService } from "@/services/role/roleService";

export default function RolesPage() {
  const router = useRouter();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    roleName: "",
    isActive: null,
    sortBy: "createdAt",
    sortDescending: true,
  });

  // Debounce برای جستجو
  const [searchDebounce, setSearchDebounce] = useState(null);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        pageNumber,
        pageSize,
        sortBy: filters.sortBy,
        sortDescending: filters.sortDescending,
      };

      // اگر roleName انتخاب شده باشد، از آن به عنوان searchTerm استفاده می‌کنیم
      // در غیر این صورت از searchTerm استفاده می‌کنیم
      if (filters.roleName) {
        params.searchTerm = filters.roleName;
      } else if (filters.searchTerm) {
        params.searchTerm = filters.searchTerm;
      }

      if (filters.isActive !== null) {
        params.isActive = filters.isActive;
      }

      const response = await roleService.getRolesWithFilters(params);

      if (response && response.success && response.data) {
        setRoles(response.data.roles || []);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 1);
      } else {
        toast.error(response?.message || "خطا در دریافت نقش‌ها");
        setRoles([]);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در دریافت نقش‌ها";
      toast.error(errorMessage);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, filters]);

  useEffect(() => {
    // Debounce برای جستجو
    if (searchDebounce) {
      clearTimeout(searchDebounce);
    }

    const timer = setTimeout(
      () => {
        setPageNumber(1); // بازگشت به صفحه اول هنگام تغییر فیلتر
        fetchRoles();
      },
      filters.searchTerm ? 500 : 0
    ); // 500ms debounce برای جستجو

    setSearchDebounce(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [filters.searchTerm, filters.isActive, filters.roleName]);

  useEffect(() => {
    fetchRoles();
  }, [pageNumber]);

  const handleEdit = (role) => {
    router.push(`/admin/roles/edit/${role.id}`);
  };

  const handleDelete = (roleId) => {
    setSelectedRoleId(roleId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRoleId) return;

    setDeleteLoading(true);
    try {
      const response = await roleService.deleteRole(selectedRoleId);
      if (response && response.success) {
        toast.success("نقش با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedRoleId(null);
        fetchRoles();
      } else {
        toast.error(response?.message || "خطا در حذف نقش");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در حذف نقش";
      toast.error(errorMessage);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleActive = async (role) => {
    try {
      const currentActive = role.isActive !== false;
      const response = await roleService.updateRole(role.id, {
        name: role.name,
        description: role.description || "",
        isActive: !currentActive,
      });
      if (response && response.success) {
        toast.success(`نقش ${!currentActive ? "فعال" : "غیرفعال"} شد`);
        fetchRoles();
      } else {
        toast.error(response?.message || "خطا در به‌روزرسانی نقش");
      }
    } catch (error) {
      console.error("Error toggling role:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در به‌روزرسانی نقش";
      toast.error(errorMessage);
    }
  };

  const handleView = (roleId) => {
    router.push(`/admin/roles/${roleId}`);
  };

  return (
    <div className="space-y-6">
      <div className="">
        <PageHeaderWithSearch
          title="مدیریت نقش‌ها"
          searchPlaceholder="جستجو نام"
          onSearchChange={(value) => {
            setFilters({ ...filters, searchTerm: value });
            setPageNumber(1);
          }}
        >
          <RolesFilters filters={filters} onFilterChange={setFilters} />
        </PageHeaderWithSearch>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <RolesTable
              roles={roles}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
              onView={handleView}
            />
            {totalPages > 1 && (
              <div className="pt-4 border-t border-gray-700">
                <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف نقش"
        description="آیا از حذف این نقش اطمینان دارید؟ اگر این نقش به کاربران اختصاص داده شده باشد، حذف نخواهد شد."
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}
