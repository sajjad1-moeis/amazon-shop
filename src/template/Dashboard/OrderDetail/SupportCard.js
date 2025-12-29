"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Headphone, MessageText } from "iconsax-reactjs";
import { useRouter } from "next/navigation";

export default function SupportCard({ hasTicket }) {
  const router = useRouter();

  const handleCreateTicket = () => {
    router.push("/dashboard/support");
  };

  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-3">
      <div class="flex-between">
        <h3 className="text-lg text-gray-800 dark:text-dark-title mb-8">پشتیبانی و تیکت</h3>
        <Button
          onClick={handleCreateTicket}
          variant="outline"
          className="border-primary-700 border-2 text-primary-700 gap-2 w-fit"
        >
          <Headphone size={18} />
          ثبت تیکت پشتیبانی
        </Button>
      </div>

      {hasTicket ? (
        <div className="text-sm text-gray-400 mb-4 text-center">تیکتی بر روی این سفارش ثبت شده است</div>
      ) : (
        <div className="text-sm text-gray-400 mb-4 text-center">تیکتی بر روی این سفارش ثبت نشده</div>
      )}
    </div>
  );
}
