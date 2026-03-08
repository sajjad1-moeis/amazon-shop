"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Star } from "iconsax-reactjs";
import ReviewsTable from "@/template/Admin/reviews/ReviewsTable";
import ReviewsFilters from "@/template/Admin/reviews/ReviewsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { productReviewService } from "@/services/review/productReviewService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

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
        const response = await productReviewService.getPaginated({
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

  const handleApprove = async (id) => {
    try {
      await productReviewService.approve(id);
      toast.success("نظر تأیید شد");
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 2 } : r)));
    } catch (e) {
      toast.error(e?.message || "خطا در تأیید نظر");
    }
  };

  const handleReject = async (id, reason) => {
    try {
      await productReviewService.reject(id, reason);
      toast.success("نظر رد شد");
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 3 } : r)));
    } catch (e) {
      toast.error(e?.message || "خطا در رد نظر");
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="نظرات و امتیازات" subtitle="مدیریت نظرات و تأیید/رد" icon={Star}>
        <ReviewsFilters />
      </AdminPageHeader>
      <AdminSectionCard title="لیست نظرات">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ReviewsTable
              reviews={reviews}
              onApprove={handleApprove}
              onReject={handleReject}
            />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </AdminSectionCard>
    </div>
  );
}
