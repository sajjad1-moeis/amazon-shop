"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockRefunds = [
  { id: 1, orderNumber: "ORD-2024-001", amount: 45000000, reason: "لغو سفارش", status: "pending", date: "1403/09/20" },
  { id: 2, orderNumber: "ORD-2024-005", amount: 12000000, reason: "کالای معیوب", status: "approved", date: "1403/09/19" },
];

export default function RefundsPage() {
  const [refunds] = useState(mockRefunds);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">درخواست‌های بازگشت وجه</h1>
        <p className="text-gray-400">مدیریت درخواست‌های بازگشت وجه</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
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
                    <Badge variant={refund.status === "approved" ? "default" : "secondary"}>
                      {refund.status === "approved" ? "تایید شده" : "در انتظار"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{refund.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

