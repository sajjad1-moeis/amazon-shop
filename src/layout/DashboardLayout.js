"use client";

import DashboardHeader from "@/template/Dashboard/Header";
import DashboardSidebar from "@/template/Dashboard/Sidebar";
import React, { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <div className="flex relative py-6 px-8">
        {/* Sidebar */}
        <DashboardSidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

        {/* Main Content */}
        <main className="flex-1 mt-16 md:mt-0 px-4 md:px-6  max-w-full overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
