"use client";

import DashboardHeader from "@/template/Dashboard/Header";
import DashboardSidebar from "@/template/Dashboard/Sidebar";
import React, { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg" dir="rtl">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <div className="flex relative gap-4  md:gap-6 p-4 md:p-6 lg:p-8">
        {/* Sidebar */}

        <DashboardSidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

        {/* Main Content */}
        <main className="flex-1   max-w-full overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
