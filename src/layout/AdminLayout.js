import React from "react";
import AdminSidebar from "@/template/Admin/AdminSidebar";
import AdminTopBar from "@/template/Admin/AdminTopBar";

export default function AdminLayout({ children }) {
  return (
    <div className="  bg-gray-900 text-gray-100 min-h-screen">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 opacity-65">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Sidebar */}
      <div class="relative flex">
        <AdminSidebar />

        <div className="flex-1 relative z-10 h-full">
          {/* Main Content */}
          <AdminTopBar />
          <main className="mx-auto py-6 px-4 lg:px-8 relative">{children}</main>
        </div>
      </div>
    </div>
  );
}
