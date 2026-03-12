"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Add, Profile2User } from "iconsax-reactjs";
import AdminsTable from "@/template/Admin/security/admins/AdminsTable";
import CreateAdminModal from "@/template/Admin/security/admins/CreateAdminModal";
import EditAdminModal from "@/template/Admin/security/admins/EditAdminModal";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { securityService } from "@/services/security/securityService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-reactjs";

export default function AdminsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageParam = searchParams.get("page");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [createOpen, setCreateOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await securityService.getAdmins({
        pageNumber,
        pageSize,
        searchTerm: searchTerm || undefined,
      });
      const data = unwrapApiData(response);
      const list = Array.isArray(data?.admins) ? data.admins : [];
      setAdmins(list);
      setTotalPages(data?.totalPages ?? 1);
      setTotalCount(data?.totalCount ?? 0);
    } catch (error) {
      toast.error(error.message || "خطا در دریافت لیست ادمین‌ها");
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, searchTerm]);

  useEffect(() => {
    if (pageParam) setPageNumber(parseInt(pageParam, 10) || 1);
  }, [pageParam]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleSearch = () => {
    setSearchTerm(searchInput.trim());
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) params.set("search", searchInput.trim());
    else params.delete("search");
    params.delete("page");
    router.push(`/admin/security/admins?${params.toString()}`);
    setPageNumber(1);
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/security/admins?${params.toString()}`);
  };

  const handleCreateSuccess = () => {
    setCreateOpen(false);
    fetchAdmins();
  };

  const handleEditSuccess = () => {
    setEditAdmin(null);
    fetchAdmins();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await securityService.deleteAdmin(deleteId);
      toast.success("ادمین با موفقیت حذف شد");
      setDeleteId(null);
      fetchAdmins();
    } catch (error) {
      toast.error(error.message || "خطا در حذف ادمین");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="کاربران ادمین" subtitle="مدیریت ادمین‌ها و دسترسی‌ها" icon={Profile2User}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px] max-w-[260px]">
            <SearchNormal1 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <Input
              placeholder="جستجو ایمیل، نام، تلفن..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onBlur={handleSearch}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-gray-700 border-gray-600 text-white h-10 pl-3 pr-10"
            />
          </div>
          <Button onClick={() => setCreateOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-gray-900 h-10">
            <Add size={18} className="ml-2" />
            ادمین جدید
          </Button>
        </div>
      </AdminPageHeader>
      <AdminSectionCard title="لیست ادمین‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <AdminsTable
              admins={admins}
              onEdit={(admin) => setEditAdmin(admin)}
              onDelete={(admin) => setDeleteId(admin.id)}
            />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </AdminSectionCard>

      <CreateAdminModal open={createOpen} onOpenChange={setCreateOpen} onSuccess={handleCreateSuccess} />
      {editAdmin && (
        <EditAdminModal open={!!editAdmin} onOpenChange={(open) => !open && setEditAdmin(null)} admin={editAdmin} onSuccess={handleEditSuccess} />
      )}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="حذف ادمین"
        description="آیا از حذف این ادمین اطمینان دارید؟ (امکان حذف خودتان وجود ندارد)"
        confirmText="حذف"
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        variant="destructive"
      />
    </div>
  );
}
