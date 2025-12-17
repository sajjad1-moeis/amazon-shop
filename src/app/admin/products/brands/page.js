"use client";

import React, { useState, useEffect } from "react";
import { Add } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import BrandsTable from "@/template/Admin/products/brands/BrandsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
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
      <div className="">
        <PageHeader
          title="برندها"
          buttonText="برند جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          buttonHref="/admin/products/brands/create"
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <BrandsTable brands={displayedBrands} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={Math.ceil(brands.length / pageSize) || 1}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </div>

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
