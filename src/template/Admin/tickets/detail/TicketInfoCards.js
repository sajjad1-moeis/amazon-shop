"use client";

import React from "react";
import { User, Calendar, MessageText } from "iconsax-reactjs";
import { formatDate } from "@/utils/dateFormatter";

export default function TicketInfoCards({ ticket }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
        <div className="flex items-center gap-2 mb-2 text-gray-400">
          <MessageText size={20} />
          <span className="text-sm">شماره تیکت</span>
        </div>
        <p className="text-white text-lg font-medium">{ticket.ticketNumber || `TKT-${ticket.id}`}</p>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
        <div className="flex items-center gap-2 mb-2 text-gray-400">
          <User size={20} />
          <span className="text-sm">مشتری</span>
        </div>
        <p className="text-white text-lg font-medium">
          {ticket.customerName || ticket.userFullName || ticket.userName || "-"}
        </p>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
        <div className="flex items-center gap-2 mb-2 text-gray-400">
          <MessageText size={20} />
          <span className="text-sm">موضوع</span>
        </div>
        <p className="text-white text-lg font-medium">{ticket.subject || ticket.title || "-"}</p>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
        <div className="flex items-center gap-2 mb-2 text-gray-400">
          <Calendar size={20} />
          <span className="text-sm">تاریخ ایجاد</span>
        </div>
        <p className="text-white text-lg">{formatDate(ticket.createdAt)}</p>
      </div>
    </div>
  );
}

