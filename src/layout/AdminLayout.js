"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/template/Admin/AdminSidebar";
import AdminTopBar from "@/template/Admin/AdminTopBar";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated || !user) {
      router.replace("/");
      return;
    }
    if (!isAdmin) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, user, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">در حال بارگذاری...</p>
      </div>
    );
  }
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="lg:grid grid-cols-4 xl:grid-cols-5 min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar for larger screens */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col lg:col-span-3 xl:col-span-4  ">
        {/* TopBar for all screens, includes mobile drawer trigger */}
        <AdminTopBar />

        {/* Main content area */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="min-h-[60vh] rounded-2xl border border-gray-700/80 bg-gray-900/40 shadow-xl p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
