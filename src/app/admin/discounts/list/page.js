"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Add, TicketDiscount, SearchNormal1 } from "iconsax-reactjs";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DiscountsTable from "@/template/Admin/discounts/list/DiscountsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { discountService } from "@/services/discount/discountService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

export default function DiscountsListPage() {
  const router = useRouter();
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

      const data = response?.data ?? response;
      const list = data?.codes ?? data?.discounts ?? [];
      const pages = data?.totalPages ?? 1;
      setDiscounts(Array.isArray(list) ? list : []);
      setTotalPages(pages);
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

  const handleEdit = (id) => {
    router.push(`/admin/discounts/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="لیست کوپن‌ها"
        subtitle="مدیریت کدهای تخفیف"
        icon={TicketDiscount}
        actions={
          <Link href="/admin/discounts/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Add size={20} className="ml-2" />
              <span className="max-md:hidden">کوپن جدید</span>
            </Button>
          </Link>
        }
      >
        <div className="relative flex-1 min-w-[180px] max-w-[260px]">
          <SearchNormal1 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          <Input
            type="text"
            placeholder="جستجو ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white h-10 pl-3 pr-10"
          />
        </div>
      </AdminPageHeader>
      <AdminSectionCard title="جدول کوپن‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <DiscountsTable discounts={discounts} onEdit={handleEdit} />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </AdminSectionCard>
    </div>
  );
}
