"use client";

import React from "react";

export default function WalletOverviewCards({ wallet }) {
  const pendingRaw =
    wallet?.pendingBalance ??
    wallet?.pendingAmount ??
    wallet?.inReviewBalance ??
    0;
  const withdrawableRaw =
    wallet?.withdrawableBalance ??
    wallet?.availableBalance ??
    wallet?.withdrawable ??
    0;
  const totalRaw =
    wallet?.totalBalance ??
    wallet?.balance ??
    wallet?.finalBalance ??
    pendingRaw + withdrawableRaw;

  const format = (val) => {
    if (val == null) return "۰";
    const n = typeof val === "number" ? val : Number(val);
    if (!Number.isFinite(n)) return String(val);
    return n.toLocaleString("fa-IR");
  };

  const pending = format(pendingRaw);
  const withdrawable = format(withdrawableRaw);
  const total = format(totalRaw);

  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-4 mt-6">
      {/* Total Balance - Dark Blue */}

      <div className="bg-primary-600 dark:bg-dark-blue text-center rounded-xl p-6 text-white">
        <p className="text-3xl  mb-2 ">{total}</p>
        <h3 className="text-sm text-gray-100 dark:text-dark-titre">کل موجودی</h3>
      </div>

      {/* Withdrawable Balance - Green */}

      <div className="bg-green-600 dark:bg-dark-green text-center rounded-xl p-6 text-white">
        <p className="text-3xl  mb-2 ">{withdrawable}</p>
        <h3 className="text-sm text-gray-100 dark:text-dark-titre">قابل برداشت</h3>
      </div>

      {/* Pending Balance - Gold/Brown */}
      <div className="bg-yellow-700 dark:bg-dark-yellow text-center rounded-xl p-6 text-white">
        <p className="text-3xl  mb-2 ">{pending}</p>
        <h3 className="text-sm text-gray-100 dark:text-dark-titre">موجودی در انتظار تایید</h3>
      </div>
    </div>
  );
}
