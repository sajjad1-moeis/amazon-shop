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
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => setIsRechargeOpen(true)}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white h-12"
        >
          <Add size={20} className="ml-2" />
          شارژ کیف پول
        </Button>
        <Button
          onClick={() => setIsWithdrawOpen(true)}
          variant="outline"
          className="flex-1 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20 h-12"
        >
          <Minus size={20} className="ml-2" />
          برداشت از کیف پول
        </Button>
      </div>

      <RechargeModal isOpen={isRechargeOpen} onClose={() => setIsRechargeOpen(false)} />
      <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
    </>
  );
}

