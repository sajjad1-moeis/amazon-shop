"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";

const mockPayments = [
  {
    id: 1,
    transactionId: "TXN-001",
    orderNumber: "ORD-2024-001",
    amount: 45000000,
    status: "success",
    method: "کارت بانکی",
    date: "1403/09/20",
  },
  {
    id: 2,
    transactionId: "TXN-002",
    orderNumber: "ORD-2024-002",
    amount: 32000000,
    status: "success",
    method: "آنلاین",
    date: "1403/09/20",
  },
  {
    id: 3,
    transactionId: "TXN-003",
    orderNumber: "ORD-2024-003",
    amount: 8500000,
    status: "failed",
    method: "کارت بانکی",
    date: "1403/09/19",
  },
];

export default function PaymentsPage() {
  const [payments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = payments.filter(
    (payment) =>
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">پرداخت‌ها</h1>
        <p className="text-gray-400">مدیریت و مشاهده تمام پرداخت‌ها</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <Input
            placeholder="جستجو در پرداخت‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
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
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="text-white font-medium">{payment.transactionId}</TableCell>
                  <TableCell className="text-gray-300">{payment.orderNumber}</TableCell>
                  <TableCell className="text-gray-300">{payment.amount.toLocaleString()} تومان</TableCell>
                  <TableCell className="text-gray-300">{payment.method}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === "success" ? "default" : "destructive"}>
                      {payment.status === "success" ? "موفق" : "ناموفق"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{payment.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-400/20">
                      <Eye size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

