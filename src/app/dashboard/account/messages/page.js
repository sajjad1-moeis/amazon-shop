"use client";

import React, { useState, useEffect, useCallback } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import MessagesFilter from "@/template/Dashboard/Messages/MessagesFilter";
import MessageCard from "@/template/Dashboard/Messages/MessageCard";
import { userMessageService } from "@/services/userMessage/userMessageService";
import DashboardLayout from "@/layout/DashboardLayout";
import { Repeat } from "iconsax-reactjs";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function MessagesList() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "",
    messageType: "",
    searchQuery: "",
    dateRange: "",
  });

  const fetchMessages = useCallback(async () => {
    if (userId == null) return;
    setLoading(true);
    try {
      const params = {
        pageNumber: 1,
        pageSize: 50,
        messageType: filters.messageType || undefined,
        onlyUnread: filters.status === "unread" || undefined,
        searchQuery: filters.searchQuery?.trim() || undefined,
        sortBy: filters.sortBy || undefined,
      };
      if (filters.dateRange) {
        const now = new Date();
        let from = null;
        if (filters.dateRange === "today") {
          from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        } else if (filters.dateRange === "week") {
          from = new Date(now);
          from.setDate(from.getDate() - 7);
        } else if (filters.dateRange === "month") {
          from = new Date(now);
          from.setMonth(from.getMonth() - 1);
        } else if (filters.dateRange === "year") {
          from = new Date(now);
          from.setFullYear(from.getFullYear() - 1);
        }
        if (from) {
          params.dateFrom = from.toISOString();
        }
      }
      const data = await userMessageService.getMessages(params);
      const list = Array.isArray(data) ? data : data?.items ?? data?.messages ?? [];
      setMessages(list);
    } catch (err) {
      toast.error(err?.message ?? "خطا در دریافت پیام‌ها");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [userId, filters.messageType, filters.status, filters.searchQuery, filters.sortBy, filters.dateRange]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value === "all" ? "" : value }));
  };

  if (userId == null) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده پیام‌ها وارد شوید.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader title="مرکز پیام" description="پیام‌های ارسالی از طرف سیستم و پشتیبانی">
        <Button onClick={fetchMessages} variant="ghost" className="text-primary-500 dark:text-primary-300 gap-2">
          <Repeat size={24} />
          بروزرسانی
        </Button>
      </PageHeader>

      <MessagesFilter filters={filters} onFiltersChange={handleFilterChange} />

      <div className="bg-white dark:bg-dark-box rounded-xl border dark:border-0 border-gray-200 p-3 sm:p-4 mt-6 sm:mt-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : messages.length === 0 ? (
          <div className="p-6 sm:p-8 text-center">
            <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text">هیچ پیامی وجود ندارد</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
