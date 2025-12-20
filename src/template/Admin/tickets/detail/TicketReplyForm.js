"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function TicketReplyForm({ messageText, setMessageText, sendingMessage, onSubmit }) {
  return (
    <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600">
      <h3 className="text-lg font-bold text-white mb-4">ارسال پاسخ</h3>
      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white mb-4 min-h-[100px] resize-none"
        placeholder="پیام خود را وارد کنید..."
        dir="rtl"
      />
      <Button
        onClick={onSubmit}
        disabled={sendingMessage || !messageText.trim()}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {sendingMessage ? "در حال ارسال..." : "ارسال پیام"}
      </Button>
    </div>
  );
}

