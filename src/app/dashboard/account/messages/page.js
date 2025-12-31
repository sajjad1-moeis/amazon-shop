"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import MessagesFilter from "@/template/Dashboard/Messages/MessagesFilter";
import MessageCard from "@/template/Dashboard/Messages/MessageCard";
import { initialMessages } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import { Repeat } from "iconsax-reactjs";

export default function MessagesList() {
  const [messages, setMessages] = useState(initialMessages);
  const [filters, setFilters] = useState({
    sortBy: "",
    messageType: "",
    searchQuery: "",
    dateRange: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  const handleRefresh = () => {
    // Handle refresh logic
    console.log("Refreshing messages...");
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <PageHeader title="مرکز پیام" description="نظراتی که روی محصولات ثبت کرده اید و وضعیت بررسی آنها.">
        <Button onClick={handleRefresh} variant="ghost" className="text-primary-500 dark:text-primary-300 gap-2">
          <Repeat size={24} />
          بروزرسانی
        </Button>
      </PageHeader>

      {/* Filters Section */}
      <MessagesFilter filters={filters} onFiltersChange={handleFilterChange} />

      {/* Messages List */}
      <div className="bg-white dark:bg-dark-box rounded-xl border dark:border-0 border-gray-200 p-3 sm:p-4 mt-6 sm:mt-8">
        <div className="space-y-3 sm:space-y-4">
          {messages.length === 0 ? (
            <div className="p-6 sm:p-8 text-center">
              <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text">هیچ پیامی وجود ندارد</p>
            </div>
          ) : (
            messages.map((message) => <MessageCard key={message.id} message={message} />)
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
