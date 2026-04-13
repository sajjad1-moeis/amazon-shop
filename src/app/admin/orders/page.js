"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShoppingCart } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import OrdersTable from "@/template/Admin/orders/OrdersTable";
import OrdersFilters from "@/template/Admin/orders/OrdersFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { orderService } from "@/services/order/orderService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const pageParam = searchParams.get("page");
  const statusFilter = statusParam && statusParam !== "all" ? statusParam : undefined;
  const searchTerm = searchParams.get("search") || "";
  const manualOrderHint = searchParams.get("manualOrder") === "1";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(pageParam ? parseInt(pageParam, 10) || 1 : 1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setPageNumber(parseInt(page, 10) || 1);
    } else {
      setPageNumber(1);
    }
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await orderService.getPaginated({
          pageNumber,
          pageSize,
          status: statusFilter,
          searchTerm: searchTerm || undefined,
        });
        if (cancelled) return;
        if (response.success && response.data) {
          setOrders(response.data.orders || response.data || []);
          setTotalPages(response.data.totalPages || 1);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message || "خطا در دریافت سفارشات");
          console.error("Error fetching orders:", error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [pageNumber, statusFilter, searchTerm, pageSize]);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/orders?${params.toString()}`);
  };

  const dismissManualHint = () => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("manualOrder");
    const q = p.toString();
    router.replace(q ? `/admin/orders?${q}` : "/admin/orders");
  };

  return (
    <div className="space-y-6">
      {manualOrderHint ? (
        <div className="rounded-xl border border-amber-500/35 bg-amber-950/25 px-4 py-3 text-sm text-amber-100">
          <p className="font-medium text-amber-50">ثبت سفارش دستی (راهنما)</p>
          <p className="mt-1.5 text-xs leading-relaxed text-amber-200/90">
            از همین صفحه سفارش را پیدا کنید و از جزئیات سفارش، وضعیت و پرداخت را مدیریت کنید. فلو اختصاصی «ایجاد سفارش از صفر در پنل»
            در صورت نیاز در فاز بعد با API اختصاصی اضافه می‌شود.
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2 h-8 text-xs text-amber-300 hover:bg-amber-500/10 hover:text-amber-200"
            onClick={dismissManualHint}
          >
            بستن راهنما
          </Button>
        </div>
      ) : null}
      <AdminPageHeader title="فاکتورها و سفارشات" subtitle="مشاهده و مدیریت سفارشات" icon={ShoppingCart}>
        <OrdersFilters />
      </AdminPageHeader>
      <AdminSectionCard title="لیست سفارشات">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <OrdersTable orders={orders} />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </AdminSectionCard>
    </div>
  );
}
