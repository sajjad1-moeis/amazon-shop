"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "iconsax-reactjs";

const getOrderStatusBadge = (status) => {
  const statusMap = {
    1: { label: "در انتظار", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    2: { label: "در حال پردازش", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    3: { label: "ارسال شده", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    4: { label: "تحویل شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    5: { label: "لغو شده", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  };
  const statusInfo = statusMap[status] || statusMap[1];
  return (
    <Badge variant="outline" className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  );
};

const getPaymentStatusBadge = (status) => {
  const statusMap = {
    1: { label: "پرداخت شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    2: { label: "در انتظار پرداخت", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    3: { label: "ناموفق", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  };
  const statusInfo = statusMap[status] || statusMap[2];
  return (
    <Badge variant="outline" className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  );
};

export default function OrdersTable({ orders }) {
  if (orders.length === 0) {
    return <div className="p-8 text-center text-gray-400">سفارشی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">شماره سفارش</TableHead>
          <TableHead className="text-gray-300">مشتری</TableHead>
          <TableHead className="text-gray-300">تعداد آیتم</TableHead>
          <TableHead className="text-gray-300">مبلغ کل</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">وضعیت پرداخت</TableHead>
          <TableHead className="text-gray-300">تاریخ</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{order.orderNumber || order.id}</TableCell>
            <TableCell className="text-gray-300">
              {order.customerName || order.userFullName || order.userName || "-"}
            </TableCell>
            <TableCell className="text-gray-300">{order.itemsCount || order.itemCount || 0}</TableCell>
            <TableCell className="text-gray-300">
              {order.totalAmount ? `${order.totalAmount.toLocaleString()} تومان` : "-"}
            </TableCell>
            <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
            <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
            <TableCell className="text-gray-300">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("fa-IR")
                : order.date || "-"}
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


