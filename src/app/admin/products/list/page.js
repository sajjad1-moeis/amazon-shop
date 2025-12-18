"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import ProductsTable from "@/template/Admin/products/list/ProductsTable";
import ProductsFilters from "@/template/Admin/products/list/ProductsFilters";
import DeleteProductDialog from "@/template/Admin/products/list/DeleteProductDialog";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { productService } from "@/services/product/productService";

export default function ProductsListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const statusParam = searchParams.get("status");
  const brandParam = searchParams.get("brand");
  const searchParam = searchParams.get("search");
  const pageParam = searchParams.get("page");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParam || "");
  const [pageNumber, setPageNumber] = useState(pageParam ? parseInt(pageParam) : 1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filterCategory = categoryParam || "all";
  const filterStatus = statusParam || "all";
  const filterBrand = brandParam || "all";

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setPageNumber(parseInt(page));
    } else {
      setPageNumber(1);
    }
    const search = searchParams.get("search");
    if (search !== null) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productService.getPaginated({
        pageNumber,
        pageSize,
        categoryId: filterCategory !== "all" ? filterCategory : undefined,
        brandId: filterBrand !== "all" ? filterBrand : undefined,
        status: filterStatus !== "all" ? parseInt(filterStatus) : undefined,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setProducts(response.data.products || response.data || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.totalCount || 0);
      } else {
        toast.error(response.message || "خطا در دریافت محصولات");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت محصولات");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, filterCategory, filterBrand, filterStatus, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      setPageNumber(1);
    }
  }, [searchTerm]);

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

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`/admin/products/list?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="">
        <PageHeaderWithSearch
          title="لیست محصولات"
          searchPlaceholder="جستجو محصول..."
          onSearchChange={handleSearchChange}
          searchValue={searchTerm}
        >
          <ProductsFilters />
        </PageHeaderWithSearch>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ProductsTable products={products} onEdit={handleEdit} onDelete={handleDeleteClick} onView={handleView} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}

        <DeleteProductDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          product={selectedProduct}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
        />
      </div>
    </div>
  );
}
