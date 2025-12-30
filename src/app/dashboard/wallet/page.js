"use client";

import React, { useState } from "react";
import WalletActions from "@/template/Dashboard/Wallet/WalletActions";
import WalletOverviewCards from "@/template/Dashboard/Wallet/WalletOverviewCards";
import TransactionsFilter from "@/template/Dashboard/Wallet/TransactionsFilter";
import TransactionsTable from "@/template/Dashboard/Wallet/TransactionsTable";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";

export default function WalletList() {
  const [filters, setFilters] = useState({
    searchQuery: "",
    dateRange: "",
    status: "",
    transactionType: "",
  });

  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader title="کیف پول من" description="مدیریت موجودی و تراکنشهای مالی" />

      {/* Wallet Balance Section */}
      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4  mb-6 mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-lg  text-gray-900 dark:text-white">موجودی کیف پول</h3>

          {/* Action Buttons */}
          <WalletActions />
        </div>

        {/* Overview Cards */}
        <div className="mt-6">
          <WalletOverviewCards />
        </div>
      </div>

      {/* Transaction History Section */}
      <div
        className="bg-white dark:bg-dark-box rounded-2xl shadow-md p-4"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h2 className="text-lg  text-gray-900 dark:text-white mb-6">تاریخچه تراکنش ها</h2>

        {/* Filter Section */}
        <TransactionsFilter filters={filters} onFiltersChange={setFilters} />

        {/* Transactions Table */}
        <div className="mt-6">
          <TransactionsTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
