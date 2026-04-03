"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/template/Admin/AdminSidebar";
import AdminTopBar from "@/template/Admin/AdminTopBar";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  // ادمین همیشه دارک است (فارغ از تنظیم ThemeProvider روی سایت عمومی)
  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains("dark");
    const hadLight = html.classList.contains("light");

    html.classList.add("dark");
    html.classList.remove("light");

    return () => {
      if (!hadDark) html.classList.remove("dark");
      if (hadLight) html.classList.add("light");
    };
  }, []);

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
      <div className="admin-panel flex min-h-dvh min-h-screen items-center justify-center bg-gray-900 px-4 pt-[env(safe-area-inset-top)]">
        <p className="text-center text-white/90">در حال بارگذاری...</p>
      </div>
    );
  }
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="admin-panel flex min-h-dvh min-h-screen w-full max-w-[100vw] flex-col overflow-x-hidden bg-gray-900 text-white lg:grid lg:max-w-none lg:grid-cols-4 xl:grid-cols-5">
      {/* Sidebar for larger screens */}
      <AdminSidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:col-span-3 xl:col-span-4">
        {/* TopBar for all screens, includes mobile drawer trigger */}
        <AdminTopBar />

        {/* Main content area — padding and safe-area for notched phones */}
        <main className="flex-1 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-4 sm:pb-4 sm:pt-3 lg:p-6 lg:pt-4">
          <div className="min-h-[55vh] rounded-xl border border-gray-700/80 bg-gray-900/50 shadow-xl backdrop-blur-sm sm:min-h-[60vh] sm:rounded-2xl p-3 sm:p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
