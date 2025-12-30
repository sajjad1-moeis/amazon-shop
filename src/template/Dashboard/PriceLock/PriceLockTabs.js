"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveLocksTab from "./ActiveLocksTab";
import HistoryTab from "./HistoryTab";
import RulesTab from "./RulesTab";

const TABS = [
  { value: "active", label: "قفل های فعال" },
  { value: "history", label: "تاریخچه" },
  { value: "rules", label: "قوانین و راهنما" },
];

export default function PriceLockTabs({
  activeTab,
  onTabChange,
  activeLocks,
  onCancelLock,
  onViewDetails,
  filteredHistory,
  historyFilters,
  onFiltersChange,
}) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} dir="rtl" className="w-full rounded-xl overflow-hidden">
      <TabsList className="bg-white dark:bg-dark-box shadow w-full justify-between overflow-auto flex-none lg:overflow-hidden h-full rounded-xl p-0 flex flex-nowrap lg:grid grid-cols-3">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-dark-blue data-[state=active]:border-b-2 dark:data-[state=active]:border-dark-title border-primary-500 !w-full data-[state=active]:text-primary-600 dark:data-[state=active]:text-dark-title  dark:bg-dark-box/10 dark:text-dark-text text-gray-500 px-5 py-4 rounded-none transition"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="active" className="mt-6">
        <ActiveLocksTab activeLocks={activeLocks} onCancelLock={onCancelLock} onViewDetails={onViewDetails} />
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <HistoryTab
          filteredHistory={filteredHistory}
          historyFilters={historyFilters}
          onFiltersChange={onFiltersChange}
        />
      </TabsContent>

      <TabsContent value="rules" className="mt-6">
        <RulesTab />
      </TabsContent>
    </Tabs>
  );
}
