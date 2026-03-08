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
  const [displayedBrands, setDisplayedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await productBrandService.getAll();

      if (response.success && response.data) {
        setBrands(response.data || []);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت برندها");
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    let filtered = brands;
    if (searchTerm) {
      filtered = brands.filter((brand) => brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedBrands(filtered.slice(startIndex, endIndex));
  }, [brands, searchTerm, pageNumber, pageSize]);

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
      if (response.success) {
        toast.success("برند با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedBrandId(null);
        fetchBrands();
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
        ) : (
          <>
            <BrandsTable brands={displayedBrands} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="pt-4 border-t border-gray-600 mt-4">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={Math.ceil(brands.length / pageSize) || 1}
                onPageChange={setPageNumber}
              />
            </div>
          </>
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
