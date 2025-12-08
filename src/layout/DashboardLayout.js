import DashboardHeader from "@/template/Dashboard/Header";
import DashboardSidebar from "@/template/Dashboard/Sidebar";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Header */}
      <DashboardHeader />

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 mr-0 md:mr-64 lg:mr-72 mt-16 p-4 md:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
