"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BottomActions({ onSubmit, onCancel }) {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/dashboard/return-requests");
    }
  };

  return (
    <div className="flex gap-3 max-md:mt-10 mt-6 max-md:dark:bg-dark-box max-md:p-3 rounded-lg">
      <Button
        type="button"
        variant="ghost"
        onClick={handleCancel}
        className="md:w-48 h-11 max-lg:w-full bg-gray-200 dark:bg-dark-field"
      >
        انصراف
      </Button>
      <Button type="submit" className="h-11 max-lg:w-full bg-yellow-500 text-gray-800 hover:bg-yellow-600 text-sm">
        ثبت درخواست مرجوعی
      </Button>
    </div>
  );
}
