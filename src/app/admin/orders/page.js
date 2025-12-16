"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import OrdersTable from "@/template/Admin/orders/OrdersTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { orderService } from "@/services/order/orderService";

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
    if (searchTerm) {
      setPageNumber(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchOrders();
  }, [pageNumber, searchTerm, statusParam]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeaderWithSearch
          title="فاکتور ها"
          searchPlaceholder="جستجو نام"
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <OrdersTable orders={orders} />
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
