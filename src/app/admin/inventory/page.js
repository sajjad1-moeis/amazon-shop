"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import InventoryTable from "@/template/Admin/inventory/InventoryTable";
import InventoryFilters from "@/template/Admin/inventory/InventoryFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { inventoryService } from "@/services/inventory/inventoryService";
import { unwrapApiData } from "@/services/api/client";
import { Box, Box1, Danger } from "iconsax-reactjs";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

const getInventoryStatus = (item) => {
  const currentStock = Number(item?.currentStock ?? item?.quantity ?? item?.stock ?? 0);
  const minStock = Number(item?.minStock ?? item?.minimumStock ?? item?.minStockLevel ?? 0);

  if (currentStock === 0) return "out";
  if (currentStock < minStock) return "low";
  return "enough";
};

const SummaryCard = ({ icon: Icon, label, value, className }) => (
  <div className="rounded-xl border border-gray-600/80 bg-gray-700/30 p-4 hover:border-gray-500/50 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      <div className="p-2 rounded-lg bg-gray-600/50">
        <Icon size={18} className={className} />
      </div>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
    <p className={`text-xl font-bold tabular-nums ${className}`}>{Number(value || 0).toLocaleString("fa-IR")}</p>
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
  const [refreshKey, setRefreshKey] = useState(0);

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
          status: statusFilter === "out" ? 0 : statusFilter === "enough" || statusFilter === "low" ? 1 : undefined,
        });

        if (cancelled) return;
        const data = unwrapApiData(response);
        setInventory(Array.isArray(data?.inventory) ? data.inventory : Array.isArray(data) ? data : []);
        setTotalPages(Math.max(1, data?.totalPages ?? 1));
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
  }, [pageNumber, pageSize, searchTerm, statusFilter, refreshKey]);

  const filteredInventory =
    statusFilter === "all" ? inventory : inventory.filter((item) => getInventoryStatus(item) === statusFilter);

  const refreshInventory = () => {
    setRefreshKey((k) => k + 1);
  };

  const handleStockIn = async (data) => {
    try {
      await inventoryService.stockIn(data);
      toast.success("ورود به انبار ثبت شد");
      refreshInventory();
    } catch (error) {
      toast.error(error.message || "خطا در ثبت ورود");
      throw error;
    }
  };

  const handleStockOut = async (data) => {
    try {
      await inventoryService.stockOut(data);
      toast.success("خروج از انبار ثبت شد");
      refreshInventory();
    } catch (error) {
      toast.error(error.message || "خطا در ثبت خروج");
      throw error;
    }
  };

  const handleUpdateStock = async (productId, quantity) => {
    try {
      await inventoryService.updateStock(productId, quantity);
      toast.success("موجودی به‌روزرسانی شد");
      refreshInventory();
    } catch (error) {
      toast.error(error.message || "خطا در به‌روزرسانی موجودی");
      throw error;
    }
  };

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
      <AdminPageHeader title="انبار و موجودی" subtitle="مدیریت موجودی و هشدار کمبود" icon={Box}>
        <InventoryFilters />
      </AdminPageHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard icon={Box1} label="کل اقلام این صفحه" value={summary.total} className="text-white" />
        <SummaryCard icon={Box} label="موجودی کافی" value={summary.enough} className="text-green-400" />
        <SummaryCard icon={Danger} label="موجودی کم" value={summary.low} className="text-yellow-400" />
        <SummaryCard icon={Danger} label="ناموجود" value={summary.out} className="text-red-400" />
      </div>
      <AdminSectionCard title="جدول موجودی">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <InventoryTable
              inventory={filteredInventory}
              onStockIn={handleStockIn}
              onStockOut={handleStockOut}
              onUpdateStock={handleUpdateStock}
            />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </AdminSectionCard>
    </div>
  );
}
