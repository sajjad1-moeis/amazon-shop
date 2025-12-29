"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Refresh2, Repeat } from "iconsax-reactjs";
import MessagesFilter from "./MessagesFilter";
import MessageCard from "./MessageCard";
import { initialMessages } from "@/data";

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
      <PageHeader title="مرکز پیام" description="نظراتی که روی محصولات ثبت کرده اید و وضعیت بررسی آنها.">
        <Button onClick={handleRefresh} variant="ghost" className="text-primary-500 gap-2">
          <Repeat size={24} />
          بروزرسانی
        </Button>
      </PageHeader>

      {/* Filters Section */}
      <MessagesFilter filters={filters} onFiltersChange={setFilters} />

      {/* Messages List */}
      <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 p-3 mt-8">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-dark-text">هیچ پیامی وجود ندارد</p>
            </div>
          ) : (
            messages.map((message) => <MessageCard key={message.id} message={message} />)
          )}
        </div>
      </div>
    </div>
  );
}
