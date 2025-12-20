"use client";

import React from "react";
import { MessageText } from "iconsax-reactjs";
import { formatDate } from "@/utils/dateFormatter";

export default function TicketMessagesSection({ messages }) {
  return (
    <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600 mb-6">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <MessageText size={20} />
        پیام‌ها
      </h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center py-4">پیامی وجود ندارد</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-lg ${
                msg.isFromAdmin || msg.sender === "admin"
                  ? "bg-blue-500/20 border border-blue-500/30"
                  : "bg-gray-600/30 border border-gray-600"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-white font-medium">
                  {msg.isFromAdmin || msg.sender === "admin" ? "ادمین" : msg.senderName || "کاربر"}
                </span>
                <span className="text-gray-400 text-sm">{formatDate(msg.createdAt || msg.time)}</span>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{msg.message || msg.text || "-"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

