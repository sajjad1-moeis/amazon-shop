"use client";

import React from "react";
import { MessageText } from "iconsax-reactjs";
import { formatDateTimeFa } from "@/utils/adminDateUtils";

export default function TicketMessagesSection({ messages }) {
  return (
    <div className="w-full min-w-0 bg-gray-700/30 rounded-lg p-6 border border-gray-600 mb-6">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <MessageText size={20} />
        پیام‌ها
      </h2>
      <div className="w-full min-w-0 space-y-4 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center py-4">پیامی وجود ندارد</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`w-full min-w-0 p-4 rounded-lg ${
                msg.isSystem || msg.sender === "system"
                  ? "bg-amber-500/15 border border-amber-500/25"
                  : msg.isFromAdmin || msg.sender === "admin"
                    ? "bg-blue-500/20 border border-blue-500/30"
                    : "bg-gray-600/30 border border-gray-600"
              }`}
            >
              <div className="flex justify-between items-start mb-2 gap-2">
                <span className="text-white font-medium shrink-0">
                  {msg.isSystem || msg.sender === "system"
                    ? "سیستم"
                    : msg.isFromAdmin || msg.sender === "admin"
                      ? "پشتیبانی"
                      : msg.senderName || "کاربر"}
                </span>
                <span className="text-gray-400 text-sm shrink-0">{formatDateTimeFa(msg.createdAt || msg.time)}</span>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap break-words min-w-0 w-full">{msg.message || msg.text || "-"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

