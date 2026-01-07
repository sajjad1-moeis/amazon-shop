"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import OrdersTable from "@/template/Admin/orders/OrdersTable";
import OrdersFilters from "@/template/Admin/orders/OrdersFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { orderService } from "@/services/order/orderService";

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParam = searchParams.get("search");
  const searchTerm = searchParam || "";
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getPaginated({
        pageNumber,
        pageSize,
        status: statusParam || undefined,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setOrders(response.data.orders || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت سفارشات");
      console.error("Error fetching orders:", error);
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
    fetchOrders();
  }, [pageNumber, searchParams, statusParam]);

  return (
    <div className="space-y-6">
      <div className="">
        <div className="mb-5">
          <h1 className="text-lg md:text-xl text-gray-100 mb-4">فاکتور ها</h1>
          <OrdersFilters />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <OrdersTable orders={orders} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
