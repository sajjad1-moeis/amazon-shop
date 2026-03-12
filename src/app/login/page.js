"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * روت /login — مودال ورود را باز می‌کند و به صفحه اصلی هدایت می‌کند.
 * اگر redirect در query باشد، بعد از ورود به آن آدرس هدایت می‌شود.
 */
export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openAuthModal } = useAuth();

  useEffect(() => {
    const redirectTo = searchParams.get("redirect") || "/cart";
    openAuthModal(redirectTo);
    router.replace("/");
  }, [searchParams, router, openAuthModal]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4" dir="rtl">
      <div className="text-gray-500 dark:text-dark-text">در حال انتقال...</div>
    </div>
  );
}
