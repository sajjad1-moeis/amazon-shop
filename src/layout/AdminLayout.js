"use client";

import React from "react";
import AdminSidebar from "@/template/Admin/AdminSidebar";
import AdminTopBar from "@/template/Admin/AdminTopBar";

export default function AdminLayout({ children }) {
  return (
    <div className="lg:grid grid-cols-4 xl:grid-cols-6 min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar for larger screens */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col lg:col-span-3 xl:col-span-5  ">
        {/* TopBar for all screens, includes mobile drawer trigger */}
        <AdminTopBar />

        {/* Main content area */}
        <main className="flex-1 p-4 lg:p-6">
          <div class="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-3 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
