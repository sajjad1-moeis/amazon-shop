"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import WalletActions from "@/template/Dashboard/Wallet/WalletActions";
import WalletOverviewCards from "@/template/Dashboard/Wallet/WalletOverviewCards";
import TransactionsFilter from "@/template/Dashboard/Wallet/TransactionsFilter";
import TransactionsTable from "@/template/Dashboard/Wallet/TransactionsTable";

export default function WalletList() {
  const [filters, setFilters] = useState({
    searchQuery: "",
    dateRange: "",
    status: "",
    transactionType: "",
  });

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader title="کیف پول من" description="مدیریت موجودی و تراکنشهای مالی" />

      {/* Bottom Section: Wallet Content */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        {/* Action Buttons */}
        <WalletActions />

        {/* Overview Cards */}
        {/* <WalletOverviewCards /> */}

        {/* Transaction History */}
        <div className="mt-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">تاریخچه تراکنشها</h2>

          {/* Filter Section */}
          {/* <TransactionsFilter filters={filters} onFiltersChange={setFilters} /> */}

          {/* Transactions Table */}
          <div className="mt-6">
            <TransactionsTable />
          </div>
        </div>
      </div>
    </>
  );
}
