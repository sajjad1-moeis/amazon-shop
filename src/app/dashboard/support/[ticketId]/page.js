"use client";

import React, { useState } from "react";
import TicketSidebar from "@/template/Dashboard/TicketDetail/TicketSidebar";
import TicketChat from "@/template/Dashboard/TicketDetail/TicketChat";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";

const ticketData = {
  id: "۴۵۲۳۱",
  title: "مشکل در پرداخت سفارش",
  createdAt: "۱۴۰۳/۱۰/۰۹",
  lastUpdate: "۱۴۰۳/۱۰/۱۰",
  status: "reviewing",
  priority: "high",
  category: "مالی",
  files: ["file1.pdf", "file2.jpg"],
};

const messages = [
  {
    id: 1,
    sender: "user",
    senderName: "شما",
    time: "09:45",
    date: "۱۴۰۳/۱۰/۱۰",
    text: "در هنگام پرداخت به درگاه منتقل شدم اما مبلغ از حسابم کم شده و سفارش ثبت نشده است",
  },
  {
    id: 2,
    sender: "support",
    senderName: "پشتیبانی",
    supportName: "علی پشتیبانی",
    time: "09:45",
    text: "کاربر عزیز تراکنش شما در سیستم بانک ناموفق ثبت شده لطفا یکبار دیگر شماره سفارش را ارسال کنید تا بررسی انجام شود",
  },
  {
    id: 3,
    sender: "user",
    senderName: "شما",
    time: "09:45",
    text: "شماره تراکنش: ۸۹۳۳۲۲۱۱",
  },
  {
    id: 4,
    sender: "support",
    senderName: "پشتیبانی",
    supportName: "علی پشتیبانی",
    time: "09:45",
    text: "تشکر. وضعیت به بانک اعلام شد. نتیجه طی ۲۴ ساعت اطلاع رسانی می شود",
  },
];

export default function TicketDetail({ ticketId }) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState(messages);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messagesList.length + 1,
      sender: "user",
      senderName: "شما",
      time: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
      text: message,
    };

    setMessagesList([...messagesList, newMessage]);
    setMessage("");
  };

  const getStatusBadge = () => {
    switch (ticketData.status) {
      case "reviewing":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      case "answered":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            پاسخ داده شده
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityText = () => {
    switch (ticketData.priority) {
      case "high":
        return <span className="text-red-600 dark:text-red-400 font-medium">بالا</span>;
      case "medium":
        return <span className="text-yellow-600 dark:text-yellow-400 font-medium">متوسط</span>;
      case "low":
        return <span className="text-green-600 dark:text-green-400 font-medium">پایین</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      {/* Top Section: Header and Create Ticket Button */}
      <PageHeader title="تیکت و پشتیبانی">
        {" "}
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-primary-800">بستن تیکت</Button>
      </PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TicketChat
            ticketData={ticketData}
            messagesList={messagesList}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
        <div>
          <TicketSidebar ticketData={ticketData} getStatusBadge={getStatusBadge} getPriorityText={getPriorityText} />
        </div>
      </div>
    </DashboardLayout>
  );
}
