"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Refresh2 } from "iconsax-reactjs";
import MessagesFilter from "./MessagesFilter";
import MessageCard from "./MessageCard";

const initialMessages = [
  {
    id: 1,
    title: "پاسخ جدید به تیکت شما",
    type: "support",
    typeLabel: "پشتیبانی",
    message: "",
    actionButton: null,
  },
  {
    id: 2,
    title: "پرداخت موفق | کیف پول",
    type: "payment",
    typeLabel: "پرداخت",
    message: "",
    actionButton: null,
  },
  {
    id: 3,
    title: "در حال ارسال: کنترلر پلی استیشن ۵",
    type: "order",
    typeLabel: "سفارشات",
    message: "متن پیام: سفارش شما با شماره ۴۵۲۳۱# با موفقیت تحویل داده شد. در صورت نیاز میتوانید جزئیات سفارش را مشاهده کنید.",
    actionButton: {
      label: "مشاهده سفارش",
      href: "#",
    },
  },
  {
    id: 4,
    title: "پرداخت موفق | کیف پول",
    type: "payment",
    typeLabel: "پرداخت",
    message: "",
    actionButton: null,
  },
];

export default function MessagesList() {
  const [messages, setMessages] = useState(initialMessages);
  const [filters, setFilters] = useState({
    sortBy: "",
    messageType: "",
    searchQuery: "",
  });

  const handleRefresh = () => {
    // Handle refresh logic
    console.log("Refreshing messages...");
  };

  return (
    <div dir="rtl">
      {/* Header Section */}
      <PageHeader
        title="مرکز پیام"
        description="نظراتی که روی محصولات ثبت کرده اید و وضعیت بررسی آنها."
      >
        <Button
          onClick={handleRefresh}
          className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 gap-2"
        >
          بروزرسانی
          <Refresh2 size={24} />
        </Button>
      </PageHeader>

      {/* Filters Section */}
      <MessagesFilter filters={filters} onFiltersChange={setFilters} />

      {/* Messages List */}
      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mt-8">
        <h2 className="text-lg text-gray-900 dark:text-dark-title mb-6">لیست پیام‌ها</h2>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-dark-text">هیچ پیامی وجود ندارد</p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

