"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "iconsax-reactjs";

const statusColors = {
  pending: "secondary",
  processing: "outline",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

const statusLabels = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
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
            <TableCell className="text-white font-medium">{order.orderNumber}</TableCell>
            <TableCell className="text-gray-300">{order.customerName}</TableCell>
            <TableCell className="text-gray-300">{order.itemsCount}</TableCell>
            <TableCell className="text-gray-300">{order.totalAmount.toLocaleString()} تومان</TableCell>
            <TableCell>
              <Badge variant={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                {order.paymentStatus === "paid" ? "پرداخت شده" : "در انتظار پرداخت"}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-300">{order.date}</TableCell>
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

