"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ReviewsTable from "@/template/Admin/reviews/ReviewsTable";
import ReviewsFilters from "@/template/Admin/reviews/ReviewsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { reviewService } from "@/services/review/reviewService";
import { unwrapApiData } from "@/services/api/client";

export default function ReviewsPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const statusFilter =
    statusParam && statusParam !== "all"
      ? statusParam === "pending"
        ? 1
        : statusParam === "approved"
          ? 2
          : statusParam === "rejected"
            ? 3
            : undefined
      : undefined;
  const searchTerm = searchParams.get("search") || "";
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await reviewService.getPaginated({
          pageNumber,
          pageSize,
          status: statusFilter,
          searchTerm: searchTerm || undefined,
        });
        if (cancelled) return;
        const data = unwrapApiData(response);
        setReviews(data?.reviews || data || []);
        setTotalPages(data?.totalPages || 1);
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message || "خطا در دریافت نظرات");
          console.error("Error fetching reviews:", error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pageNumber, pageSize, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="">
        <div className="mb-5">
          <h1 className="text-lg md:text-xl text-gray-100 mb-4">نظرات و امتیازات</h1>
          <ReviewsFilters />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ReviewsTable reviews={reviews} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
