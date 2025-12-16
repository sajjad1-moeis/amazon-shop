"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import InventoryTable from "@/template/Admin/inventory/InventoryTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { inventoryService } from "@/services/inventory/inventoryService";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getPaginated({
        pageNumber,
        pageSize,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setInventory(response.data.inventory || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت موجودی");
      console.error("Error fetching inventory:", error);
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
    fetchInventory();
  }, [pageNumber, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="موجودی محصولات"
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
            <InventoryTable inventory={inventory} />
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
