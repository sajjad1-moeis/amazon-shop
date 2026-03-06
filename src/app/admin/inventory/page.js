"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import InventoryTable from "@/template/Admin/inventory/InventoryTable";
import InventoryFilters from "@/template/Admin/inventory/InventoryFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { inventoryService } from "@/services/inventory/inventoryService";
import { Box, Box1, Danger } from "iconsax-reactjs";

const getInventoryStatus = (item) => {
  const currentStock = Number(item?.currentStock ?? item?.quantity ?? item?.stock ?? 0);
  const minStock = Number(item?.minStock ?? item?.minimumStock ?? item?.minStockLevel ?? 0);

  if (currentStock === 0) return "out";
  if (currentStock < minStock) return "low";
  return "enough";
};

const SummaryCard = ({ icon: Icon, label, value, className }) => (
  <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
    <div className="flex items-center gap-2 mb-2 text-gray-400">
      <Icon size={20} />
      <span className="text-sm">{label}</span>
    </div>
    <p className={`text-lg font-semibold ${className}`}>{Number(value || 0).toLocaleString("fa-IR")}</p>
  </div>
);

export default function InventoryPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await inventoryService.getPaginated({
          pageNumber,
          pageSize,
          searchTerm: searchTerm || undefined,
        });

        if (cancelled) return;
        if (response.success && response.data) {
          setInventory(response.data.inventory || response.data || []);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setInventory([]);
          setTotalPages(1);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message || "خطا در دریافت موجودی");
          console.error("Error fetching inventory:", error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pageNumber, pageSize, searchTerm]);

  const filteredInventory =
    statusFilter === "all" ? inventory : inventory.filter((item) => getInventoryStatus(item) === statusFilter);

  const summary = filteredInventory.reduce(
    (acc, item) => {
      const status = getInventoryStatus(item);
      acc.total += 1;
      if (status === "enough") acc.enough += 1;
      if (status === "low") acc.low += 1;
      if (status === "out") acc.out += 1;
      return acc;
    },
    { total: 0, enough: 0, low: 0, out: 0 }
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-5">
          <h1 className="text-lg md:text-xl text-gray-100 mb-4">انبار و موجودی</h1>
          <InventoryFilters />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <SummaryCard icon={Box1} label="کل اقلام این صفحه" value={summary.total} className="text-white" />
          <SummaryCard icon={Box} label="موجودی کافی" value={summary.enough} className="text-green-400" />
          <SummaryCard icon={Danger} label="موجودی کم" value={summary.low} className="text-yellow-400" />
          <SummaryCard icon={Danger} label="ناموجود" value={summary.out} className="text-red-400" />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <InventoryTable inventory={filteredInventory} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
