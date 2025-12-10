"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send2 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      case "answered":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar - Ticket Info */}
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6" style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">بستن تیکت</h3>
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white mb-6">بستن تیکت</Button>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">شماره تیکت</p>
              <p className="text-base font-bold text-gray-900 dark:text-white">{ticketData.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">تاریخ ایجاد</p>
              <p className="text-base text-gray-900 dark:text-white">{ticketData.createdAt}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">آخرین بروزرسانی</p>
              <p className="text-base text-gray-900 dark:text-white">{ticketData.lastUpdate}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">وضعیت</p>
              {getStatusBadge()}
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">اولویت</p>
              {getPriorityText()}
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">دسته بندی</p>
              <p className="text-base text-gray-900 dark:text-white">{ticketData.category}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">فایل های پیوست</p>
              <Button variant="ghost" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 p-0 h-auto">
                فایل ها
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Chat */}
      <div className="lg:col-span-9">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6" style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}>
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{ticketData.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">تاریخچه پیام ها</p>
          </div>

          {/* Messages */}
          <div className="space-y-6 mb-6 max-h-[500px] overflow-y-auto">
            {messagesList.map((msg, index) => {
              const showDate = index === 0 || messagesList[index - 1].date !== msg.date;
              return (
                <div key={msg.id}>
                  {showDate && msg.date && (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">{msg.date}</div>
                  )}
                  <div
                    className={cn(
                      "flex gap-3",
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "flex-1 rounded-lg p-4",
                        msg.sender === "user"
                          ? "bg-primary-50 dark:bg-primary-900/20 text-right"
                          : "bg-gray-50 dark:bg-gray-700/50 text-right"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{msg.senderName}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                      </div>
                      {msg.supportName && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          پاسخ داده شده توسط : {msg.supportName}
                        </p>
                      )}
                      <p className="text-sm text-gray-700 dark:text-gray-300">{msg.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام خود را بنویسید...."
                className="pr-12 pl-4"
                dir="rtl"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Paperclip size={20} />
              </button>
            </div>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-6">
              <Send2 size={20} />
              ارسال پیام
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

