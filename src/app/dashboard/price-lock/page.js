"use client";

import React, { useMemo, useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Lock } from "iconsax-reactjs";
import NewPriceLockModal from "@/template/Dashboard/PriceLock/NewPriceLockModal";
import PriceLockDetailModal from "@/template/Dashboard/PriceLock/PriceLockDetailModal";
import PriceLockTabs from "@/template/Dashboard/PriceLock/PriceLockTabs";
import DashboardLayout from "@/layout/DashboardLayout";

const ACTIVE_LOCKS = [
  {
    id: 1,
    productName: "Apple AirPods Pro (2nd Generation)",
    productImage: "/image/Home/product.png",
    status: "active",
    lockedPrice: "۲۷,۴۵۰,۰۰۰",
    downPayment: "۳,۵۰۰,۰۰۰",
    timeRemaining: "۵ ساعت و ۲۱ دقیقه",
    countdown: "۰۲:۲۴:۱۲",
  },
  {
    id: 2,
    productName: "Apple AirPods Pro (2nd Generation)",
    productImage: "/image/Home/product.png",
    status: "active",
    lockedPrice: "۲۷,۴۵۰,۰۰۰",
    downPayment: "۳,۵۰۰,۰۰۰",
    timeRemaining: "۵ ساعت و ۲۱ دقیقه",
    countdown: "۰۲:۲۴:۱۲",
  },
];

const HISTORY_LOCKS = [
  {
    id: 1,
    productName: "کنترلر پلی استیشن ۵ -...",
    productImage: "/image/Home/product.png",
    lockedPrice: "۱۲,۳۵۰,۰۰۰",
    creationDate: "۱۴۰۳/۱۰/۲۱",
    endDate: "۱۴۰۳/۱۰/۲۱",
    status: "active",
  },
  {
    id: 2,
    productName: "کنترلر پلی استیشن ۵ -...",
    productImage: "/image/Home/product.png",
    lockedPrice: "۱۲,۳۵۰,۰۰۰",
    creationDate: "۱۴۰۳/۱۰/۲۱",
    endDate: "۱۴۰۳/۱۰/۲۱",
    status: "inactive",
  },
];

export default function PriceLockList() {
  const [activeTab, setActiveTab] = useState("active");
  const [isNewLockModalOpen, setIsNewLockModalOpen] = useState(false);
  const [selectedLock, setSelectedLock] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [activeLocks, setActiveLocks] = useState(ACTIVE_LOCKS);
  const [historyLocks] = useState(HISTORY_LOCKS);

  const [historyFilters, setHistoryFilters] = useState({
    searchQuery: "",
    timeRange: "",
    status: "",
  });

  const filteredHistory = useMemo(() => {
    return historyLocks.filter((item) => {
      if (historyFilters.searchQuery && !item.productName.includes(historyFilters.searchQuery)) {
        return false;
      }
      if (historyFilters.status && item.status !== historyFilters.status) {
        return false;
      }
      return true;
    });
  }, [historyLocks, historyFilters]);

  const handleNewLock = () => {
    setIsNewLockModalOpen(true);
  };

  const handleSubmitNewLock = (data) => {
    console.log("New price lock data:", data);
    setIsNewLockModalOpen(false);
  };

  const handleCancelLock = (id) => {
    setActiveLocks((prev) => prev.filter((lock) => lock.id !== id));
  };

  const handleViewDetails = (lock) => {
    // Find the full lock data from activeLocks
    const fullLockData = activeLocks.find((l) => l.id === lock.id) || lock;
    setSelectedLock(fullLockData);
    setIsDetailModalOpen(true);
  };

  return (
    <DashboardLayout>
      <PageHeader title="قفل قیمت" description="قیمت برخی محصولات را برای مدت محدود ثابت نگه دارید">
        <Button
          onClick={handleNewLock}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 dark:text-dark-title font-medium gap-2"
        >
          <Lock size={20} />
          قفل قیمت جدید
        </Button>
      </PageHeader>

      <div className="mt-6">
        <PriceLockTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeLocks={activeLocks}
          onCancelLock={handleCancelLock}
          onViewDetails={handleViewDetails}
          filteredHistory={filteredHistory}
          historyFilters={historyFilters}
          onFiltersChange={setHistoryFilters}
        />
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

