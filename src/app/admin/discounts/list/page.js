"use client";

import React, { useState, useEffect } from "react";
import { Add } from "iconsax-reactjs";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import DiscountsTable from "@/template/Admin/discounts/list/DiscountsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { discountService } from "@/services/discount/discountService";

export default function DiscountsListPage() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const response = await discountService.getDiscountCodesPaginated({
        pageNumber,
        pageSize,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setDiscounts(response.data.discounts || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت کوپن‌ها");
      console.error("Error fetching discounts:", error);
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
    fetchDiscounts();
  }, [pageNumber, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="">
        <PageHeader
          title="لیست کوپن‌ها"
          buttonText="کوپن جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          buttonHref="/admin/discounts/create"
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
            <DiscountsTable discounts={discounts} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
