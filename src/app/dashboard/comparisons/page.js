"use client";

import DashboardLayout from "@/layout/DashboardLayout";

import React, { useState, useEffect } from "react";
import ComparisonCard from "@/template/Dashboard/Comparisons/ComparisonCard";
import { Button } from "@/components/ui/button";
import { Trash, Add } from "iconsax-reactjs";
import { toast } from "sonner";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { useRouter } from "next/navigation";
import { compareService } from "@/services/compare/compareService";
import { unwrapApiData } from "@/services/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";

function mapApiToComparison(item) {
  const products = item?.products ?? item?.items ?? [];
  const first = products[0];
  const second = products[1];
  return {
    id: item.id ?? item.comparisonId,
    compareId: item.compareId ?? item.id,
    title: item.title ?? item.name ?? "مقایسه",
    category: item.category ?? item.categoryName ?? "-",
    products: [
      { id: first?.id, title: first?.title_fa ?? first?.title ?? first?.name ?? "-", image: first?.image ?? first?.imageUrl },
      { id: second?.id, title: second?.title_fa ?? second?.title ?? second?.name ?? "-", image: second?.image ?? second?.imageUrl },
    ],
    productsCount: item.productsCount ?? products.length ?? 0,
    saveDate: item.saveDate ?? item.createdAt ? new Date(item.createdAt).toLocaleDateString("fa-IR") : "-",
  };
}

export default function ComparisonsList() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    if (userId == null) {
      setComparisons([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    compareService
      .list({ userId })
      .then((res) => {
        const data = unwrapApiData(res);
        const list = Array.isArray(data) ? data : data?.items ?? data?.comparisons ?? [];
        setComparisons(list.map(mapApiToComparison));
      })
      .catch(() => {
        setComparisons([]);
        toast.error("خطا در دریافت مقایسه‌ها");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleDelete = (comparison) => {
    const compareId = comparison.compareId ?? comparison.id;
    if (!compareId) return;
    if (!confirm("آیا از حذف این مقایسه اطمینان دارید؟")) return;
    compareService
      .deleteByCompareId(compareId)
      .then(() => {
        setComparisons((prev) => prev.filter((c) => (c.compareId ?? c.id) !== compareId));
        toast.success("مقایسه با موفقیت حذف شد");
      })
      .catch((err) => {
        toast.error(err?.message || "مقایسه یافت نشد یا دسترسی غیرمجاز.");
      });
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
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : comparisons.length === 0 ? (
        <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-6 sm:p-8 text-center">
          <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text">هیچ مقایسه‌ای ذخیره نشده است</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {comparisons.map((comparison) => (
            <ComparisonCard key={comparison.id} comparison={comparison} onDelete={() => handleDelete(comparison)} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
