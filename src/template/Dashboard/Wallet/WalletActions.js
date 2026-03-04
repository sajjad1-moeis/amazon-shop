"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import RechargeModal from "./RechargeModal";
import WithdrawModal from "./WithdrawModal";

export default function WalletActions({ userId, onRechargeSuccess, onWithdrawSuccess }) {
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row max-sm:w-full gap-3">
        <Button
          onClick={() => setIsWithdrawOpen(true)}
          variant="ghost"
          className="border-gray-300 max-md:w-full bg-gray-200 dark:border-0 dark:bg-transparent dark:text-dark-titre dark:hover:bg-dark-field h-10 font-medium"
        >
          برداشت از کیف پول
        </Button>
        <Button
          onClick={() => setIsRechargeOpen(true)}
          className="text-primary-800 max-md:w-full px-8 bg-yellow-400 hover:bg-yellow-600 h-10 font-medium"
        >
          شارژ کیف پول
        </Button>
      </div>

      <RechargeModal
        isOpen={isRechargeOpen}
        onClose={() => setIsRechargeOpen(false)}
        userId={userId}
        onSuccess={onRechargeSuccess}
      />
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        userId={userId}
        onSuccess={onWithdrawSuccess}
      />
    </>
  );
}
