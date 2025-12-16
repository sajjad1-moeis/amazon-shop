"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SearchBarTopTable from "@/template/Admin/SearchBarTopTable";
import ProductsTable from "@/template/Admin/products/list/ProductsTable";
import ProductsFilters from "@/template/Admin/products/list/ProductsFilters";
import DeleteProductDialog from "@/template/Admin/products/list/DeleteProductDialog";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { productService } from "@/services/product/productService";

export default function ProductsListPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getPaginated({
        pageNumber,
        pageSize,
        categoryId: filterCategory !== "all" ? filterCategory : undefined,
        status: filterStatus !== "all" ? filterStatus : undefined,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setProducts(response.data.products || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت محصولات");
      console.error("Error fetching products:", error);
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
    fetchProducts();
  }, [pageNumber, filterCategory, filterStatus, searchTerm]);

  const handleEdit = (productId) => {
    router.push(`/admin/products/edit/${productId}`);
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
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف محصول");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <div className="mb-5 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
          <h1 className="text-xl text-gray-100">لیست محصولات</h1>
          <SearchBarTopTable
            placeholder="جستجو ..."
            onInput={(value) => setSearchTerm(value)}
            inputContainerClass="flex flex-row-reverse gap-2"
          >
            <ProductsFilters
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          </SearchBarTopTable>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ProductsTable products={products} onEdit={handleEdit} onDelete={handleDeleteClick} />
            <div className="mt-6 pt-6 border-t border-gray-700">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={setPageNumber}
              />
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
