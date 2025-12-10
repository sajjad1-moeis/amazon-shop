"use client";

import DashboardHeader from "@/template/Dashboard/Header";
import DashboardSidebar from "@/template/Dashboard/Sidebar";
import React, { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col" dir="rtl">
      {/* Header */}
      <DashboardHeader onMenuClick={toggleMobileMenu} />

      {/* Content Area: Sidebar + Main */}
      <div className="flex flex-1 relative md:px-4 md:pt-4 md:pb-4 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 px-6  max-w-full overflow-y-auto min-h-0">{children}</main>
      </div>
    </div>
  );
}
