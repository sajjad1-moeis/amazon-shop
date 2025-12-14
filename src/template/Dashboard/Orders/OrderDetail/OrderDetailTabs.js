"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function OrderDetailTabs({ activeTab, onTabChange, children }) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6">
        <TabsTrigger
          value="details"
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:text-primary-600 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-primary-400"
          )}
        >
          مشاهده جزئیات
        </TabsTrigger>
        <TabsTrigger
          value="payment"
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:text-primary-600 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-primary-400"
          )}
        >
          وضعیت پرداخت
        </TabsTrigger>
        <TabsTrigger
          value="address"
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:text-primary-600 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-primary-400"
          )}
        >
          تغییر آدرس
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}




