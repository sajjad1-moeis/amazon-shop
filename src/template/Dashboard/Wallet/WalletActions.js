"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Add, Minus } from "iconsax-reactjs";

export default function WalletActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex-1 sm:flex-initial">
        <Add size={20} className="ml-2" />
        شارژ کیف پول
      </Button>
      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 flex-1 sm:flex-initial">
        <Minus size={20} className="ml-2" />
        برداشت از کیف پول
      </Button>
    </div>
  );
}

