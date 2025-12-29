"use client";

import React from "react";
import PriceLockCard from "./PriceLockCard";

export default function ActiveLocksTab({ activeLocks, onCancelLock, onViewDetails }) {
  if (activeLocks.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500 dark:text-dark-text">هیچ قفل قیمت فعالی وجود ندارد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activeLocks.map((lock) => {
        const productData = {
          id: lock.id,
          title: lock.productName,
          image: lock.productImage,
          status: lock.status,
          countdown: lock.countdown,
          lockedPrice: lock.lockedPrice,
          downPayment: lock.downPayment,
          timeRemaining: lock.timeRemaining,
        };
        return (
          <PriceLockCard
            key={lock.id}
            product={productData}
            onCancelLock={onCancelLock}
            onViewDetails={onViewDetails}
          />
        );
      })}
    </div>
  );
}

