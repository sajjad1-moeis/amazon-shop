"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShoppingCart } from "iconsax-reactjs";
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

  return (
    <div className="space-y-6">
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
