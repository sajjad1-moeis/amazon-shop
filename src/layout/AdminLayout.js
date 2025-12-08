"use client";

import React from "react";
import AdminSidebar from "@/template/Admin/AdminSidebar";
import AdminTopBar from "@/template/Admin/AdminTopBar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar for larger screens */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* TopBar for all screens, includes mobile drawer trigger */}
        <AdminTopBar />

        {/* Main content area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
