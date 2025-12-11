"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import TicketSidebar from "@/template/Dashboard/TicketDetail/TicketSidebar";
import TicketChat from "@/template/Dashboard/TicketDetail/TicketChat";

const mockTicket = {
  id: "۴۵۲۳۱",
  createdAt: "۱۴۰۳/۱۰/۲۱",
  lastUpdate: "۱۴۰۳/۱۰/۲۲",
  category: "پرداخت",
  priority: "high",
  status: "pending",
};

const mockMessages = [
  {
    id: 1,
    sender: "user",
    senderName: "شما",
    text: "سلام، من در پرداخت مشکل دارم",
    date: "۱۴۰۳/۱۰/۲۱",
    time: "۱۴:۳۰",
  },
  {
    id: 2,
    sender: "support",
    senderName: "علی-پشتیبانی",
    text: "سلام، لطفاً جزئیات بیشتری از مشکل خود بفرمایید",
    date: "۱۴۰۳/۱۰/۲۱",
    time: "۱۵:۰۰",
  },
  {
    id: 3,
    sender: "user",
    senderName: "شما",
    text: "وقتی می‌خواهم پرداخت کنم، صفحه خطا می‌دهد",
    date: "۱۴۰۳/۱۰/۲۲",
    time: "۱۰:۰۰",
  },
];

export default function TicketDetail({ ticketId }) {
  const [messagesList, setMessagesList] = useState(mockMessages);
  const [message, setMessage] = useState("");

  const getStatusBadge = () => {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
        در حال پردازش
      </span>
    );
  };

  const getPriorityText = () => {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
        بالا
      </span>
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const today = new Date();
    const persianDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getDate()
    ).padStart(2, "0")}`;
    const time = `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;

    const newMessage = {
      id: messagesList.length + 1,
      sender: "user",
      senderName: "شما",
      text: message,
      date: persianDate,
      time: time,
    };

    setMessagesList([...messagesList, newMessage]);
    setMessage("");
    toast.success("پیام ارسال شد");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <TicketSidebar
          ticketData={mockTicket}
          getStatusBadge={getStatusBadge}
          getPriorityText={getPriorityText}
        />
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2">
        <TicketChat
          ticketData={mockTicket}
          messagesList={messagesList}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}

