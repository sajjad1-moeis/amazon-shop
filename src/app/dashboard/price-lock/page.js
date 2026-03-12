"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Lock } from "iconsax-reactjs";
import NewPriceLockModal from "@/template/Dashboard/PriceLock/NewPriceLockModal";
import PriceLockDetailModal from "@/template/Dashboard/PriceLock/PriceLockDetailModal";
import PriceLockTabs from "@/template/Dashboard/PriceLock/PriceLockTabs";
import DashboardLayout from "@/layout/DashboardLayout";
import { priceAlertService } from "@/services/priceAlert/priceAlertService";
import { useAuth } from "@/contexts/AuthContext";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

function mapAlertToLock(alert) {
  const price = alert.targetPrice ?? alert.lockedPrice ?? alert.price ?? 0;
  const priceStr = typeof price === "number" ? price.toLocaleString("fa-IR") : String(price);
  return {
    id: alert.id,
    productName: alert.productName ?? alert.product?.title ?? "-",
    productImage: alert.productImageUrl ?? alert.product?.image ?? "/image/Home/product.png",
    status: alert.isActive ?? alert.status === "active" ? "active" : "inactive",
    lockedPrice: priceStr,
    downPayment: alert.downPayment ?? "-",
    createdAt: alert.createdAt,
    creationDate: alert.createdAt ? new Date(alert.createdAt).toLocaleDateString("fa-IR") : "-",
    endDate: alert.expiresAt ? new Date(alert.expiresAt).toLocaleDateString("fa-IR") : "-",
    endDateRaw: alert.expiresAt,
    ...alert,
  };
}

export default function PriceLockList() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [activeTab, setActiveTab] = useState("active");
  const [isNewLockModalOpen, setIsNewLockModalOpen] = useState(false);
  const [selectedLock, setSelectedLock] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeLocks, setActiveLocks] = useState([]);
  const [historyLocks, setHistoryLocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [historyFilters, setHistoryFilters] = useState({
    searchQuery: "",
    timeRange: "",
    status: "",
  });

  const fetchLocks = useCallback(async () => {
    if (userId == null) return;
    setLoading(true);
    try {
      const [activeRes, historyRes] = await Promise.all([
        priceAlertService.getList(userId, true),
        priceAlertService.getList(userId, false),
      ]);
      const activeData = unwrapApiData(activeRes);
      const historyData = unwrapApiData(historyRes);
      const activeList = Array.isArray(activeData) ? activeData : activeData?.items ?? [];
      const historyList = Array.isArray(historyData) ? historyData : historyData?.items ?? [];
      setActiveLocks(activeList.map(mapAlertToLock));
      setHistoryLocks(historyList.map(mapAlertToLock));
    } catch (err) {
      toast.error(err?.message ?? "خطا در دریافت قفل‌های قیمت");
      setActiveLocks([]);
      setHistoryLocks([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchLocks();
  }, [fetchLocks]);

  const handleFilterChange = (key, value) => {
    setHistoryFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredHistory = useMemo(() => {
    let list = [...historyLocks];
    if (historyFilters.searchQuery?.trim()) {
      const q = historyFilters.searchQuery.trim().toLowerCase();
      list = list.filter((item) => (item.productName ?? "").toLowerCase().includes(q));
    }
    if (historyFilters.status && historyFilters.status !== "all") {
      list = list.filter((item) => item.status === historyFilters.status);
    }
    if (historyFilters.timeRange && historyFilters.timeRange !== "all") {
      const now = new Date();
      let from = null;
      if (historyFilters.timeRange === "today") {
        from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (historyFilters.timeRange === "week") {
        from = new Date(now);
        from.setDate(from.getDate() - 7);
      } else if (historyFilters.timeRange === "month") {
        from = new Date(now);
        from.setMonth(from.getMonth() - 1);
      } else if (historyFilters.timeRange === "year") {
        from = new Date(now);
        from.setFullYear(from.getFullYear() - 1);
      }
      if (from) {
        list = list.filter((item) => {
          const d = item.createdAt ?? item.endDateRaw;
          return d && new Date(d) >= from;
        });
      }
    }
    return list;
  }, [historyLocks, historyFilters]);

  const handleNewLock = () => setIsNewLockModalOpen(true);

  const handleSubmitNewLock = async (data) => {
    if (userId == null) return;
    try {
      await priceAlertService.create(userId, {
        productId: data.productId,
        targetPrice: data.targetPrice ?? data.lockedPrice,
        ...data,
      });
      toast.success("قفل قیمت با موفقیت ثبت شد");
      setIsNewLockModalOpen(false);
      fetchLocks();
    } catch (err) {
      toast.error(err?.message ?? "خطا در ثبت قفل قیمت");
    }
  };

  const handleCancelLock = async (id) => {
    if (userId == null) return;
    if (!confirm("آیا از لغو این قفل قیمت اطمینان دارید؟")) return;
    try {
      await priceAlertService.delete(id, userId);
      setActiveLocks((prev) => prev.filter((lock) => lock.id !== id));
      setHistoryLocks((prev) => prev.filter((lock) => lock.id !== id));
      toast.success("قفل قیمت لغو شد");
    } catch (err) {
      toast.error(err?.message ?? "خطا در لغو قفل");
    }
  };

  const handleViewDetails = (lock) => {
    const fullLockData = activeLocks.find((l) => l.id === lock.id) || historyLocks.find((l) => l.id === lock.id) || lock;
    setSelectedLock(fullLockData);
    setIsDetailModalOpen(true);
  };

  const ActionBtn = () => (
    <Button
      onClick={handleNewLock}
      className="bg-yellow-500 max-md:w-full hover:bg-yellow-600 text-gray-900 font-medium gap-2"
    >
      <Lock size={20} />
      قفل قیمت جدید
    </Button>
  );

  if (userId == null) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده قفل قیمت وارد شوید.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        actionButton={
          <div className="md:hidden">
            <ActionBtn />
          </div>
        }
        title="قفل قیمت"
        description="قیمت برخی محصولات را برای مدت محدود ثابت نگه دارید"
      >
        <div className="max-md:hidden">
          <ActionBtn />
        </div>
      </PageHeader>

      <div className="mt-4 sm:mt-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <PriceLockTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeLocks={activeLocks}
            onCancelLock={handleCancelLock}
            onViewDetails={handleViewDetails}
            filteredHistory={filteredHistory}
            historyFilters={historyFilters}
            onFiltersChange={handleFilterChange}
          />
        )}
      </div>

      <NewPriceLockModal
        open={isNewLockModalOpen}
        onOpenChange={setIsNewLockModalOpen}
        onSubmit={handleSubmitNewLock}
      />

      <PriceLockDetailModal
        lock={selectedLock}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onCancelLock={handleCancelLock}
      />
    </DashboardLayout>
  );
}
