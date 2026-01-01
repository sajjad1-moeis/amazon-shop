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

  const SupportBtn = () => (
    <Button
      onClick={handleCreateTicket}
      variant="outline"
      className="border-primary-700 max-md:w-full dark:text-primary-300 dark:border-primary-300 border-2 text-primary-700 gap-2 w-fit"
    >
      <Headphone size={18} />
      ثبت تیکت پشتیبانی
    </Button>
  );

  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-3">
      <div class="md:flex-between  mb-4 md:mb-8">
        <h3 className="text-lg text-gray-800 dark:text-dark-titre">پشتیبانی و تیکت</h3>
        <div class="max-md:hidden">
          <SupportBtn />
        </div>
      </div>

      {hasTicket ? (
        <div className="text-sm text-gray-400 mb-6 text-center">تیکتی بر روی این سفارش ثبت شده است</div>
      ) : (
        <div className="text-sm text-gray-400 mb-6 text-center">تیکتی بر روی این سفارش ثبت نشده</div>
      )}
      <div class="md:hidden">
        <SupportBtn />
      </div>
    </div>
  );
}
