"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TickCircle, CloseCircle } from "iconsax-reactjs";
import { FORM_STYLES } from "../../formStyles";

const getStatusBadge = (status) => {
  const statusMap = {
    1: { label: "باز", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    2: { label: "در حال بررسی", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    3: { label: "در انتظار کاربر", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    4: { label: "حل شده", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    5: { label: "بسته", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  };
  const statusInfo = statusMap[status] || statusMap[1];
  return (
    <Badge variant="outline" className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  );
};

const getPriorityBadge = (priority) => {
  const priorityMap = {
    1: { label: "پایین", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    2: { label: "متوسط", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    3: { label: "بالا", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    4: { label: "فوری", className: "bg-rose-600/25 text-rose-300 border-rose-500/35" },
  };
  const priorityInfo = priorityMap[priority] || priorityMap[2];
  return (
    <Badge variant="outline" className={priorityInfo.className}>
      {priorityInfo.label}
    </Badge>
  );
};

export default function TicketDetailHeader({ ticket, updating, onCloseTicket, onReopenTicket, onBack }) {
  const status = typeof ticket.status === "number" ? ticket.status : parseInt(String(ticket.status), 10);
  const displayStatus = Number.isNaN(status) ? 1 : status;
  const priority =
    typeof ticket.priority === "number" ? ticket.priority : parseInt(String(ticket.priority), 10);
  const displayPriority = Number.isNaN(priority) ? 2 : priority;
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-700">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">جزئیات تیکت</h1>
        <div className="flex items-center gap-2 mt-2">
          {getStatusBadge(displayStatus)}
          {getPriorityBadge(displayPriority)}
        </div>
      </div>
      <div className="flex gap-2">
        {status !== 5 ? (
          <Button
            onClick={onCloseTicket}
            disabled={updating}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            <CloseCircle size={18} className="ml-2" />
            {updating ? "در حال پردازش..." : "بستن تیکت"}
          </Button>
        ) : (
          <Button onClick={onReopenTicket} disabled={updating} className="bg-green-600 hover:bg-green-700">
            <TickCircle size={18} className="ml-2" />
            {updating ? "در حال پردازش..." : "باز کردن تیکت"}
          </Button>
        )}
        <Button variant="outline" onClick={onBack} className={FORM_STYLES.button}>
          بازگشت به لیست
        </Button>
      </div>
    </div>
  );
}
