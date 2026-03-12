"use client";

import DashboardLayout from "@/layout/DashboardLayout";
import React, { useState, useEffect, useMemo } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import CommentsFilter from "@/template/Dashboard/Comments/CommentsFilter";
import CommentsList from "@/template/Dashboard/Comments/CommentsList";
import { productReviewService } from "@/services/review/productReviewService";
import { useAuth } from "@/contexts/AuthContext";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function CommentsPage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
  });

  useEffect(() => {
    if (userId == null) {
      setComments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    productReviewService
      .getByUserId(userId)
      .then((res) => {
        const data = unwrapApiData(res);
        const list = Array.isArray(data) ? data : data?.items ?? data?.reviews ?? [];
        setComments(list);
      })
      .catch((err) => {
        toast.error(err?.message ?? "خطا در دریافت نظرات");
        setComments([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const filteredComments = useMemo(() => {
    let list = [...comments];
    if (filters.status && filters.status !== "all") {
      list = list.filter((c) => String(c.status ?? "").toLowerCase() === String(filters.status).toLowerCase());
    }
    if (filters.sortBy === "newest") {
      list.sort((a, b) => {
        const da = new Date(a.createdAt ?? 0).getTime();
        const db = new Date(b.createdAt ?? 0).getTime();
        return db - da;
      });
    } else if (filters.sortBy === "oldest") {
      list.sort((a, b) => {
        const da = new Date(a.createdAt ?? 0).getTime();
        const db = new Date(b.createdAt ?? 0).getTime();
        return da - db;
      });
    }
    return list;
  }, [comments, filters]);

  const handleFiltersChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (userId == null) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده نظرات وارد شوید.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader title="نظرات من" description="نظراتی که روی محصولات ثبت کرده اید و وضعیت بررسی آنها." />

      <div className="flex-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <CommentsFilter filters={filters} onFiltersChange={handleFiltersChange} />
        <div className="text-xs sm:text-sm text-gray-700 dark:text-dark-text whitespace-nowrap">
          کل نظرات : <span className="font-semibold text-yellow-600 dark:text-yellow-400">{filteredComments.length} نظر</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <CommentsList comments={filteredComments} setComments={setComments} />
      )}
    </DashboardLayout>
  );
}
