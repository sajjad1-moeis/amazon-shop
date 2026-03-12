"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import IndexLayout from "@/layout/IndexLayout";
import LoginView from "@/template/Auth/LoginView";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/cart";

  return (
    <IndexLayout>
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white dark:bg-dark-box border border-gray-200 dark:border-dark-stroke shadow-lg overflow-hidden">
          <LoginView
            onGoSignup={() => {}}
            onGoReset={() => {}}
            redirectTo={redirectTo}
          />
        </div>
      </div>
    </IndexLayout>
  );
}
