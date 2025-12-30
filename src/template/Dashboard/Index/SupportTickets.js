"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

const tickets = [
  {
    id: 1,
    title: "تاخیر در ارسال",
    status: "answered",
    date: "۱۴۰۳/۱۰/۰۹",
    statusText: "پاسخ داده شده",
    buttonText: "نمایش",
  },
  {
    id: 2,
    title: "مشکل در پرداخت",
    status: "processing",
    date: "۱۴۰۳/۱۰/۰۹",
    statusText: "در حال پردازش",
    buttonText: "مشاهده تیکت",
  },
];

export default function SupportTickets() {
  return (
    <div
      className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mb-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 md:mb-6">
        <div>
          <h3 className="text-lg text-gray-700 dark:text-dark-titre mb-2">آخرین تیکتهای پشتیبانی</h3>
          <p className="text-sm text-gray-500 dark:text-caption">وضعیت آخرین درخواستهای شما</p>
        </div>
        <Button
          variant="ghost"
          className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 text-sm p-0"
        >
          مشاهده همه تیکت ها
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.map((ticket) => {
          const getButtonClassName = () => {
            if (ticket.status === "answered") {
              return "border border-primary-700 text-primary-700 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20";
            } else if (ticket.status === "processing") {
              return "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600";
            }
            return "";
          };

          return (
            <div
              key={ticket.id}
              className={cn(
                "p-3 rounded-2xl border transition-colors bg-gray-50 dark:bg-dark-field border-gray-200 dark:border-dark-stroke"
              )}
            >
              {/* Status Badge */}
              <div className="flex justify-between">
                {/* Title */}
                <div className="">
                  <p className="text-sm md:text-base font-medium text-gray-800 dark:text-dark-titre mb-2">
                    {ticket.title}
                  </p>

                  {/* Date */}
                  <p className="text-xs md:text-sm text-gray-600 dark:text-dark-text mb-3">تاریخ : {ticket.date}</p>
                </div>
                <div className="mb-3">
                  <StatusBadge status={ticket.status} />
                </div>
              </div>
              {/* Button */}
              <button
                className={cn(
                  " items-center w-full text-center px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors",
                  getButtonClassName()
                )}
              >
                {ticket.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
