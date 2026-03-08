"use client";

import React, { useState, useEffect } from "react";
import { Add, Shop, SearchNormal1 } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BrandsTable from "@/template/Admin/products/brands/BrandsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { productBrandService } from "@/services/product/productBrandService";

export default function BrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await productBrandService.getPaginated({
        pageNumber,
        pageSize,
        searchTerm: searchTerm.trim() || undefined,
      });
      const data = response?.data;
      setBrands(Array.isArray(data?.brands) ? data.brands : []);
      setTotalPages(Math.max(1, data?.totalPages ?? 1));
    } catch (error) {
      toast.error(error?.message || "خطا در دریافت برندها");
      setBrands([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm]);

  useEffect(() => {
    fetchBrands();
  }, [pageNumber, pageSize, searchTerm]);

  const handleEdit = (brandId) => {
    router.push(`/admin/products/brands/edit/${brandId}`);
  };

  const handleDelete = (brandId) => {
    setSelectedBrandId(brandId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBrandId) return;

    setDeleteLoading(true);
    try {
      const response = await productBrandService.delete(selectedBrandId);
      if (response?.success !== false) {
        toast.success("برند با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedBrandId(null);
        fetchBrands();
      } else {
        toast.error(response?.message || "خطا در حذف برند");
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف برند");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="برندها" subtitle="مدیریت برندهای محصولات" icon={Shop}>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/products/brands/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Add size={20} className="ml-2" />
              برند جدید
            </Button>
          </Link>
          <div className="relative flex-1 min-w-[180px] max-w-[260px]">
            <SearchNormal1 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <Input
              type="text"
              placeholder="جستجو ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white h-10 pl-3 pr-10"
            />
          </div>
        </div>
      </AdminPageHeader>

      <AdminSectionCard title="لیست برندها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : brands.length === 0 ? (
          <div className="p-8 text-center text-gray-400">برندی یافت نشد</div>
        ) : (
          <BrandsTable brands={brands} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        {!loading && (
          <div className="pt-4 border-t border-gray-600 mt-4">
            <AdminPagination
              currentPage={pageNumber}
              totalPages={totalPages}
              onPageChange={setPageNumber}
            />
          </div>
        )}
      </AdminSectionCard>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف برند"
        description="آیا از حذف این برند اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}
