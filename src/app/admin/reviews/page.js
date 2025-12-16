"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import ReviewsTable from "@/template/Admin/reviews/ReviewsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { reviewService } from "@/services/review/reviewService";

export default function ReviewsPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const status = statusParam === "pending" ? 1 : statusParam === "approved" ? 2 : undefined;
      const response = await reviewService.getPaginated({
        pageNumber,
        pageSize,
        status,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setReviews(response.data.reviews || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت نظرات");
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setPageNumber(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchReviews();
  }, [pageNumber, searchTerm, statusParam]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="نظرات و امتیازات"
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ReviewsTable reviews={reviews} />
            <div className="mt-6 pt-6 border-t border-gray-700">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
