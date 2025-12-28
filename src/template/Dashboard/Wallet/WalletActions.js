"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Add, Minus } from "iconsax-reactjs";
import RechargeModal from "./RechargeModal";
import WithdrawModal from "./WithdrawModal";

export default function WalletActions() {
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => setIsWithdrawOpen(true)}
          variant="ghost"
          className="border-gray-300  bg-gray-200 dark:border-dark-stroke dark:text-dark-text dark:hover:bg-dark-field h-10 font-medium"
        >
          برداشت از کیف پول
        </Button>
        <Button
          onClick={() => setIsRechargeOpen(true)}
          className="text-primary-800 px-8 bg-yellow-400 hover:bg-yellow-600  h-10 font-medium"
        >
          شارژ کیف پول
        </Button>
      </div>

      <RechargeModal isOpen={isRechargeOpen} onClose={() => setIsRechargeOpen(false)} />
      <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
    </>
  );
}
