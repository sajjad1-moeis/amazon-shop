"use client";

import DashboardLayout from "@/layout/DashboardLayout";

import React, { useState } from "react";
import ComparisonCard from "@/template/Dashboard/Comparisons/ComparisonCard";
import { Button } from "@/components/ui/button";
import { Trash, Add } from "iconsax-reactjs";
import { toast } from "sonner";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { initialComparisons } from "@/data";
import { useRouter } from "next/navigation";

export default function ComparisonsList() {
  const [comparisons, setComparisons] = useState(initialComparisons);
  const route = useRouter();

  const handleDelete = (comparisonId) => {
    if (confirm("آیا از حذف این مقایسه اطمینان دارید؟")) {
      setComparisons(comparisons.filter((c) => c.id !== comparisonId));
      toast.success("مقایسه با موفقیت حذف شد");
    }
  };

  const handleDeleteAll = () => {
    if (confirm("آیا از حذف همه مقایسه‌ها اطمینان دارید؟")) {
      setComparisons([]);
      toast.success("همه مقایسه‌ها با موفقیت حذف شدند");
    }
  };

  const handleCreateNew = () => {
    route.push("/dashboard/compare");
  };

  const ActionBtns = () => (
    <div className="flex-center">
      <Button
        variant="ghost"
        onClick={handleDeleteAll}
        className="gap-2 text-red-600 max-md:w-full dark:text-red-400 hover:bg-gray-100 dark:hover:bg-dark-field"
        disabled={comparisons.length === 0}
      >
        <Trash size={18} />
        حذف همه
      </Button>
      <Button
        onClick={handleCreateNew}
        className="bg-yellow-500 max-md:w-full hover:bg-yellow-600 text-primary-800 font-medium gap-2"
      >
        ایجاد مقایسه جدید
        <Add size={20} />
      </Button>
    </div>
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="مقایسه های ذخیره شده"
        description="مقایسه هایی که ذخیره کرده اید را اینجا ببینید و دوباره بررسی کنید."
        actionButton={
          <div className="md:hidden">
            <ActionBtns />
          </div>
        }
      >
        <div className="max-md:hidden">
          <ActionBtns />
        </div>
      </PageHeader>
      <div className="mb-8" />

      {/* Comparisons Grid */}
      {comparisons.length === 0 ? (
        <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-6 sm:p-8 text-center">
          <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text">هیچ مقایسه‌ای ذخیره نشده است</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {comparisons.map((comparison) => (
            <ComparisonCard key={comparison.id} comparison={comparison} onDelete={() => handleDelete(comparison.id)} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
