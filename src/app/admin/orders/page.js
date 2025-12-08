"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";

// داده‌های تستی
const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerName: "علی محمدی",
    totalAmount: 45000000,
    status: "processing",
    date: "1403/09/20",
    itemsCount: 2,
    paymentStatus: "paid",
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerName: "مریم احمدی",
    totalAmount: 32000000,
    status: "shipped",
    date: "1403/09/20",
    itemsCount: 1,
    paymentStatus: "paid",
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerName: "حسین رضایی",
    totalAmount: 8500000,
    status: "delivered",
    date: "1403/09/19",
    itemsCount: 1,
    paymentStatus: "paid",
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customerName: "فاطمه کریمی",
    totalAmount: 12000000,
    status: "pending",
    date: "1403/09/19",
    itemsCount: 1,
    paymentStatus: "pending",
  },
  {
    id: 5,
    orderNumber: "ORD-2024-005",
    customerName: "محمد صادقی",
    totalAmount: 55000000,
    status: "processing",
    date: "1403/09/19",
    itemsCount: 3,
    paymentStatus: "paid",
  },
];

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

export default function OrdersPage() {
  const [orders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">سفارشات</h1>
        <p className="text-gray-400">مشاهده و مدیریت تمام سفارشات</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <Input
            placeholder="جستجو در سفارشات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-400">سفارشی یافت نشد</div>
          ) : (
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
                {filteredOrders.map((order) => (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
