"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import WalletActions from "./WalletActions";
import WalletOverviewCards from "./WalletOverviewCards";
import TransactionsFilter from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";

const initialTransactions = [
  {
    id: "TRX-001",
    type: "charge",
    amount: "۵,۰۰۰,۰۰۰",
    date: "۱۴۰۳/۱۰/۲۱",
    status: "completed",
    description: "شارژ کیف پول",
  },
  {
    id: "TRX-002",
    type: "withdraw",
    amount: "۲,۰۰۰,۰۰۰",
    date: "۱۴۰۳/۱۰/۲۰",
    status: "pending",
    description: "برداشت از کیف پول",
  },
  {
    id: "TRX-003",
    type: "charge",
    amount: "۱۰,۰۰۰,۰۰۰",
    date: "۱۴۰۳/۱۰/۱۹",
    status: "completed",
    description: "شارژ کیف پول",
  },
];

export default function WalletList() {
  const [filters, setFilters] = useState({
    sortBy: "",
    type: "",
    status: "",
    dateFilter: "",
    searchQuery: "",
  });

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader
        title="کیف پول من"
        description="مدیریت موجودی و تراکنش‌های کیف پول"
      />

      {/* Wallet Actions */}
      <div className="mb-6">
        <WalletActions />
      </div>

      {/* Overview Cards */}
      <div className="mb-6">
        <WalletOverviewCards />
      </div>

      {/* Transactions Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">
          تاریخچه تراکنش‌ها
        </h2>

        {/* Filters */}
        <div className="mb-6">
          <TransactionsFilter filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Transactions Table */}
        <TransactionsTable transactions={initialTransactions} />
      </div>
    </>
  );
}

