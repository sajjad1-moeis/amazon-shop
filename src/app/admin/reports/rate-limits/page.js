"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import RateLimitsTable from "@/template/Admin/reports/rateLimits/RateLimitsTable";
import RateLimitsFilters from "@/template/Admin/reports/rateLimits/RateLimitsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { rateLimitService } from "@/services/rateLimit/rateLimitService";

export default function RateLimitsPage() {
  const searchParams = useSearchParams();
  const [rateLimits, setRateLimits] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParam = searchParams.get("search");
  const searchTerm = searchParam || "";
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [selectedRateLimitId, setSelectedRateLimitId] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);

  const fetchRateLimits = async () => {
    try {
      setLoading(true);
      const response = await rateLimitService.getPaginated({
        pageNumber,
        pageSize,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setRateLimits(response.data.rateLimits || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت گزارشات Rate Limit");
      console.error("Error fetching rate limits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setPageNumber(1);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchRateLimits();
  }, [pageNumber, searchParams]);

  const handleReset = (id) => {
    setSelectedRateLimitId(id);
    setResetDialogOpen(true);
  };

  const handleResetConfirm = async () => {
    if (!selectedRateLimitId) return;

    setResetLoading(true);
    try {
      const response = await rateLimitService.reset(selectedRateLimitId);
      if (response.success) {
        toast.success("Rate Limit با موفقیت ریست شد");
        setResetDialogOpen(false);
        setSelectedRateLimitId(null);
        fetchRateLimits();
      }
    } catch (error) {
      toast.error(error.message || "خطا در ریست Rate Limit");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="">
        <div className="mb-5">
          <h1 className="text-lg md:text-xl text-gray-100 mb-4">گزارشات Rate Limit</h1>
          <RateLimitsFilters />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <RateLimitsTable rateLimits={rateLimits} onReset={handleReset} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        title="ریست Rate Limit"
        description="آیا از ریست کردن این Rate Limit اطمینان دارید؟"
        confirmText="ریست"
        onConfirm={handleResetConfirm}
        loading={resetLoading}
        variant="default"
      />
    </div>
  );
}
