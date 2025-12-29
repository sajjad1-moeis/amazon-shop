"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageText } from "iconsax-reactjs";
import { useRouter } from "next/navigation";

export default function SupportCard({ hasTicket }) {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-3">
      <h3 className="text-lg font-bold text-gray-800 dark:text-dark-title mb-8">پشتیبانی و تیکت</h3>

      {hasTicket ? (
        <div className="text-sm text-gray-400 mb-4 text-center">تیکتی بر روی این سفارش ثبت شده است</div>
      ) : (
        <div className="text-sm text-gray-400 mb-4 text-center">تیکتی بر روی این سفارش ثبت نشده</div>
      )}

      <Button
        onClick={() => router.push("/dashboard/support")}
        variant="outline"
        className="border-primary-700 w-full border-2 text-primary-700 gap-2"
      >
        <MessageText size={18} />
        ثبت تیکت پشتیبانی
      </Button>
    </div>
  );
}
