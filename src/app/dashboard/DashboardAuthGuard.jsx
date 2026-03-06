"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardAuthGuard({ children }) {
  const { user, loading, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user?.id) {
      toast.error("برای ورود به داشبورد باید وارد شوید");
      openAuthModal("/dashboard");
      router.replace("/");
      return;
    }
  }, [user, loading, router, openAuthModal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center" dir="rtl">
        <div className="text-gray-500 dark:text-dark-text">در حال بارگذاری...</div>
      </div>
    );
  }

  if (!user?.id) {
    return null;
  }

  return children;
}
