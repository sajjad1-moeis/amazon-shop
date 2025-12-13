"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageText, DocumentText } from "iconsax-reactjs";

export default function SupportCard({ hasTicket, onCreateTicket }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">پشتیبانی و تیکت</h3>

      {hasTicket ? (
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          تیکتی بر روی این سفارش ثبت شده است
        </div>
      ) : (
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          تیکتی بر روی این سفارش ثبت نشده
        </div>
      )}

      <Button
        onClick={onCreateTicket}
        className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
      >
        <MessageText size={18} />
        ثبت تیکت پشتیبانی
      </Button>
    </div>
  );
}

