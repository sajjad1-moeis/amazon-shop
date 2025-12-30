"use client";

import React from "react";

const walletData = {
  pending: "۲,۳۵۰,۰۰۰",
  withdrawable: "۱,۸۵۲,۰۰۰",
  total: "۲,۳۵۰,۰۰۰",
};

export default function WalletOverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Total Balance - Dark Blue */}

      <div className="bg-primary-600 dark:bg-dark-blue text-center rounded-xl p-6 text-white">
        <p className="text-3xl  mb-2 ">{walletData.total}</p>
        <h3 className="text-sm text-gray-100 dark:text-dark-titre">کل موجودی</h3>
      </div>

      {/* Withdrawable Balance - Green */}

      <div className="bg-green-600 dark:bg-dark-green text-center rounded-xl p-6 text-white">
        <p className="text-3xl  mb-2 ">{walletData.withdrawable}</p>
        <h3 className="text-sm text-gray-100 dark:text-dark-titre">قابل برداشت</h3>
      </div>

      {/* Pending Balance - Gold/Brown */}
      <div className="bg-yellow-700 dark:bg-dark-yellow text-center rounded-xl p-6 text-white">
        <p className="text-3xl  mb-2 ">{walletData.pending}</p>
        <h3 className="text-sm text-gray-100 dark:text-dark-titre">موجودی در انتظار تایید</h3>
      </div>
    </div>
  );
}
