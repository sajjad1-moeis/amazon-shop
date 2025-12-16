"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { paymentService } from "@/services/payment/paymentService";

export default function RefundsPage() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getPaginated({
        pageNumber,
        pageSize,
        status: "refund",
      });

      if (response.success && response.data) {
        const formattedRefunds = response.data.payments
          .filter((p) => p.status === "refund" || p.refundAmount)
          .map((payment) => ({
            id: payment.id,
            orderNumber: payment.orderNumber || "-",
            amount: payment.refundAmount || payment.amount || 0,
            reason: payment.refundReason || "-",
            status: payment.refundStatus === 1 ? "approved" : "pending",
            date: payment.createdAt
              ? new Date(payment.createdAt).toLocaleDateString("fa-IR")
              : "-",
          }));
        setRefunds(formattedRefunds);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت درخواست‌های بازگشت وجه");
      console.error("Error fetching refunds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, [pageNumber]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">درخواست‌های بازگشت وجه</h1>
        <p className="text-gray-400">مدیریت درخواست‌های بازگشت وجه</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-400">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-700/50">
                    <TableHead className="text-gray-300">شماره سفارش</TableHead>
                    <TableHead className="text-gray-300">مبلغ</TableHead>
                    <TableHead className="text-gray-300">دلیل</TableHead>
                    <TableHead className="text-gray-300">وضعیت</TableHead>
                    <TableHead className="text-gray-300">تاریخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refunds.map((refund) => (
                    <TableRow key={refund.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium">{refund.orderNumber}</TableCell>
                      <TableCell className="text-gray-300">{refund.amount.toLocaleString()} تومان</TableCell>
                      <TableCell className="text-gray-300">{refund.reason}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            refund.status === "approved"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {refund.status === "approved" ? "تایید شده" : "در انتظار"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{refund.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 pt-6 border-t border-gray-700 p-4">
                <AdminPagination
                  currentPage={pageNumber}
                  totalPages={totalPages}
                  onPageChange={setPageNumber}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

