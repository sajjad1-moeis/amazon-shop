"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import TicketFilesModal from "./TicketFilesModal";

export default function TicketSidebar({ ticketData, getPriorityText }) {
  const [filesModalOpen, setFilesModalOpen] = useState(false);
  const files = ticketData?.files ?? [];

  const sidebarItems = [
    {
      label: "شماره تیکت",
      value: ticketData?.ticketNumber ?? ticketData?.id ?? "—",
    },
    {
      label: "تاریخ ایجاد",
      value: ticketData?.createdAt,
    },
    {
      label: "آخرین بروزرسانی",
      value: ticketData?.lastUpdate,
    },
    {
      label: "وضعیت",
      value: <StatusBadge status={ticketData?.status} variant="rounded-lg" />,
      isJsx: true,
    },
    {
      label: "اولویت",
      value: getPriorityText(), // خروجی JSX
      isJsx: true,
    },
    {
      label: "دسته بندی",
      value: <p className="text-yellow-600 dark:text-yellow-400">{ticketData?.category}</p>,
    },
    {
      label: "فایل های پیوست",
      value: (
        <Button
          type="button"
          variant="ghost"
          className="text-yellow-600 hover:text-primary-700 dark:text-primary-400 p-0 h-auto"
          onClick={() => setFilesModalOpen(true)}
        >
          فایل ها {files.length > 0 && `(${files.length})`}
        </Button>
      ),
      isJsx: true,
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-dark-box rounded-2xl border border-gray-200 dark:border-dark-stroke p-4">
        <div className="flex flex-col gap-3">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={cn("flex-between", sidebarItems?.length === index + 1 || "border-b border-gray-200 dark:border-dark-stroke pb-3")}
            >
              <p className="text-sm text-gray-500 dark:text-dark-text mb-1">{item.label}</p>

              {item.isJsx ? (
                <div>{item.value}</div>
              ) : (
                <p className="text-base text-gray-900 dark:text-dark-title">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <TicketFilesModal
        open={filesModalOpen}
        onOpenChange={setFilesModalOpen}
        files={files}
      />
    </>
  );
}
