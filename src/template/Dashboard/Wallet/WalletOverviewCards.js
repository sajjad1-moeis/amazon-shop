"use client";

import { Clock, TickCircle, Wallet3 } from "iconsax-reactjs";
import React from "react";

const walletData = {
  total: "۲۵,۰۰۰,۰۰۰",
  pending: "۲,۰۰۰,۰۰۰",
  withdrawable: "۲۳,۰۰۰,۰۰۰",
};

export default function WalletOverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Balance */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Wallet3 size={24} className="text-primary-600 dark:text-primary-400" variant="Bold" />
          </div>
        </div>
        <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">موجودی کل</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{walletData.total} تومان</p>
      </div>

      {/* Pending Balance */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <Clock size={24} className="text-yellow-600 dark:text-yellow-400" variant="Bold" />
          </div>
        </div>
        <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">در انتظار</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{walletData.pending} تومان</p>
      </div>

      {/* Withdrawable Balance */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <TickCircle size={24} className="text-green-600 dark:text-green-400" variant="Bold" />
          </div>
        </div>
        <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">قابل برداشت</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{walletData.withdrawable} تومان</p>
      </div>
    </div>
  );
}
