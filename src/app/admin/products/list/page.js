"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ShoppingBag } from "iconsax-reactjs";
import ProductsTable from "@/template/Admin/products/list/ProductsTable";
import ProductsFilters from "@/template/Admin/products/list/ProductsFilters";
import DeleteProductDialog from "@/template/Admin/products/list/DeleteProductDialog";
import AddByLinkModal from "@/template/Admin/products/list/AddByLinkModal";
import BulkImportModal from "@/template/Admin/products/list/BulkImportModal";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { productService } from "@/services/product/productService";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

export default function ProductsListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const statusParam = searchParams.get("status");
  const brandParam = searchParams.get("brand");
  const pageParam = searchParams.get("page");
  const searchTerm = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(pageParam ? parseInt(pageParam) : 1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [addByLinkOpen, setAddByLinkOpen] = useState(false);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);

  const filterCategory = categoryParam || "all";
  const filterStatus = statusParam || "all";
  const filterBrand = brandParam || "all";

  const categoryId =
    filterCategory !== "all" && filterCategory
      ? (() => {
          const n = parseInt(filterCategory, 10);
          return Number.isNaN(n) ? undefined : n;
        })()
      : undefined;

  const statusNumber =
    filterStatus !== "all" && filterStatus
      ? (() => {
          const n = parseInt(filterStatus, 10);
          return Number.isNaN(n) ? undefined : n;
        })()
      : undefined;

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setPageNumber(parseInt(page));
    } else {
      setPageNumber(1);
    }
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productService.getPaginated({
        pageNumber,
        pageSize,
        categoryId,
        brandId: filterBrand !== "all" ? filterBrand : undefined,
        status: statusNumber,
        searchTerm: searchTerm.trim() || undefined,
      });

      if (response.success && response.data) {
        const d = response.data;
        setProducts(d.products || d.Products || (Array.isArray(d) ? d : []));
        setTotalPages(d.totalPages ?? d.TotalPages ?? 1);
        setTotalCount(d.totalCount ?? d.TotalCount ?? 0);
      } else {
        toast.error(response.message || "خطا در دریافت محصولات");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت محصولات");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, categoryId, filterBrand, statusNumber, searchTerm]);

  useEffect(() => {
    setPageNumber(1);
  }, [categoryParam, statusParam, brandParam, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (productId) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  const handleView = (productId) => {
    router.push(`/product/${productId}`);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    setDeleteLoading(true);
    try {
      const response = await productService.softDelete(selectedProduct.id);
      if (response.success) {
        toast.success("محصول با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
        fetchProducts();
      } else {
        toast.error(response.message || "خطا در حذف محصول");
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف محصول");
      console.error("Error deleting product:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/products/list?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="لیست محصولات"
        subtitle="مدیریت کاتالوگ و موجودی محصولات"
        icon={ShoppingBag}
        actions={
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Button
              size="sm"
              className="h-8 px-3 text-xs font-medium bg-amber-500/90 hover:bg-amber-500 text-gray-900 border-0"
              onClick={() => setAddByLinkOpen(true)}
            >
              <span>افزودن با لینک</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs border-gray-500/80 text-gray-300 hover:bg-gray-600/50"
              onClick={() => setBulkImportOpen(true)}
            >
              <span>ورود گروهی</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs border-gray-600 text-gray-400 hover:bg-gray-600/40"
              onClick={async () => {
                const input = window.prompt("تعداد محصولات تستی (۱ تا ۵۰):", "20");
                if (!input) return;
                const count = Number(input);
                if (Number.isNaN(count) || count < 1 || count > 50) {
                  alert("عدد نامعتبر است. مقدار باید بین ۱ تا ۵۰ باشد.");
                  return;
                }
                try {
                  const { adminProductService } = await import("@/services/admin/adminProductService");
                  const { unwrapApiData } = await import("@/services/api/client");
                  const res = await adminProductService.seedTestData(count);
                  const data = unwrapApiData(res);
                  alert(`محصولات تستی ایجاد شد. تعداد ایجاد شده: ${data?.createdCount ?? "?"}`);
                  fetchProducts();
                } catch (e) {
                  alert(e?.message || "خطا در ساخت داده تستی");
                }
              }}
            >
              <span>داده تستی</span>
            </Button>
          </div>
        }
      >
        <ProductsFilters />
      </AdminPageHeader>
      <AdminSectionCard title="جدول محصولات">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ProductsTable products={products} onEdit={handleEdit} onDelete={handleDeleteClick} onView={handleView} />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </AdminSectionCard>

      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        product={selectedProduct}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
      <AddByLinkModal open={addByLinkOpen} onOpenChange={setAddByLinkOpen} onSuccess={fetchProducts} />
      <BulkImportModal open={bulkImportOpen} onOpenChange={setBulkImportOpen} />
    </div>
  );
}
