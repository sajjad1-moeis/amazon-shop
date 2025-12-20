"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">خطایی رخ داد!</h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید یا به صفحه اصلی برگردید.
        </p>

        {error && process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-right">
            <p className="text-sm text-red-800 dark:text-red-300 font-mono break-all">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            تلاش مجدد
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Home className="w-4 h-4" />
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
