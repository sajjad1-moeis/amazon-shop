"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SearchBarTopTable from "@/template/Admin/SearchBarTopTable";
import ProductsTable from "@/template/Admin/products/list/ProductsTable";
import ProductsFilters from "@/template/Admin/products/list/ProductsFilters";
import DeleteProductDialog from "@/template/Admin/products/list/DeleteProductDialog";
import { mockProducts } from "@/data";

export default function ProductsListPage() {
  const router = useRouter();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && product.status === "active") ||
      (filterStatus === "out_of_stock" && product.status === "out_of_stock");
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
    // شبیه‌سازی API call
    setTimeout(() => {
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      toast.success("محصول با موفقیت حذف شد");
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
      setDeleteLoading(false);
    }, 1000);
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

        <ProductsTable products={filteredProducts} onEdit={handleEdit} onDelete={handleDeleteClick} />

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
