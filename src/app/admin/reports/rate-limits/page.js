"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import RateLimitsTable from "@/template/Admin/reports/rateLimits/RateLimitsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { rateLimitService } from "@/services/rateLimit/rateLimitService";

export default function RateLimitsPage() {
  const [rateLimits, setRateLimits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
    if (searchTerm) {
      setPageNumber(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchRateLimits();
  }, [pageNumber, searchTerm]);

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
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeaderWithSearch
          title="گزارشات Rate Limit"
          searchPlaceholder="جستجو..."
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <RateLimitsTable rateLimits={rateLimits} onReset={handleReset} />
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

