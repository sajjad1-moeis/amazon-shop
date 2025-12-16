"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "iconsax-reactjs";

const getPaymentStatusBadge = (status) => {
  const statusMap = {
    1: { label: "موفق", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    2: { label: "ناموفق", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    3: { label: "در انتظار", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  };
  const statusInfo = statusMap[status] || statusMap[3];
  return (
    <Badge variant="outline" className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  );
};

export default function PaymentsTable({ payments }) {
  if (payments.length === 0) {
    return <div className="p-8 text-center text-gray-400">پرداختی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">شماره تراکنش</TableHead>
          <TableHead className="text-gray-300">شماره سفارش</TableHead>
          <TableHead className="text-gray-300">مبلغ</TableHead>
          <TableHead className="text-gray-300">روش پرداخت</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">
              {payment.transactionId || payment.transactionNumber || payment.id}
            </TableCell>
            <TableCell className="text-gray-300">{payment.orderNumber || payment.orderId || "-"}</TableCell>
            <TableCell className="text-gray-300">
              {payment.amount ? `${payment.amount.toLocaleString()} تومان` : "-"}
            </TableCell>
            <TableCell className="text-gray-300">
              {payment.method || payment.paymentMethod || payment.paymentMethodName || "-"}
            </TableCell>
            <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
            <TableCell className="text-gray-300">
              {payment.createdAt
                ? new Date(payment.createdAt).toLocaleDateString("fa-IR")
                : payment.date || "-"}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-400/20">
                <Eye size={18} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


