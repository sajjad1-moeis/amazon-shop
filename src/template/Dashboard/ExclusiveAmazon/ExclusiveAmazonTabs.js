"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTab from "./OrdersTab";
import RulesTab from "./RulesTab";

const TABS = [
  { value: "orders", label: "سفارش های اختصاصی من" },
  { value: "rules", label: "قوانین و راهنما" },
];

export default function ExclusiveAmazonTabs({
  activeTab,
  onTabChange,
  orders,
  filters,
  onFiltersChange,
}) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} dir="rtl" className="w-full rounded-xl overflow-hidden">
      <TabsList className="bg-white dark:bg-dark-box shadow w-full justify-between overflow-auto flex-none lg:overflow-hidden h-full rounded-xl p-0 flex flex-nowrap lg:grid grid-cols-2">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-primary-50 data-[state=active]:border-b-2 dark:data-[state=active]:border-dark-title border-primary-500 !w-full data-[state=active]:text-primary-600 dark:data-[state=active]:text-dark-title dark:data-[state=active]:bg-white dark:bg-dark-box/10 dark:text-dark-text text-gray-500 dark:text-dark-text px-5 py-3 rounded-none transition"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="orders" className="mt-6">
        <OrdersTab orders={orders} filters={filters} onFiltersChange={onFiltersChange} />
      </TabsContent>

      <TabsContent value="rules" className="mt-6">
        <RulesTab />
      </TabsContent>
    </Tabs>
  );
}

