"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TickCircle, CloseCircle, MoneyRecive } from "iconsax-reactjs";

export default function ReturnRequestsTable({ returnRequests, onApprove, onReject, onProcessRefund }) {
  const getStatusBadge = (status) => {
    const statusMap = {
      1: { label: "در انتظار بررسی", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      2: { label: "تایید شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
      3: { label: "رد شده", className: "bg-red-500/20 text-red-400 border-red-500/30" },
      4: { label: "پرداخت شده", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      5: { label: "لغو شده", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    };
    const statusInfo = statusMap[status] || statusMap[1];
    return (
      <Badge variant="outline" className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  if (returnRequests.length === 0) {
    return <div className="p-8 text-center text-gray-400">درخواست مرجوعی‌ای یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">شماره درخواست</TableHead>
          <TableHead className="text-gray-300">شماره سفارش</TableHead>
          <TableHead className="text-gray-300">مشتری</TableHead>
          <TableHead className="text-gray-300">مبلغ مرجوعی</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {returnRequests.map((request) => (
          <TableRow key={request.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">
              {request.returnNumber || `RET-${request.id}`}
            </TableCell>
            <TableCell className="text-gray-300">
              {request.orderNumber || request.orderId || "-"}
            </TableCell>
            <TableCell className="text-gray-300">
              {request.customerName || request.userFullName || request.userName || "-"}
            </TableCell>
            <TableCell className="text-gray-300">
              {request.refundAmount
                ? `${request.refundAmount.toLocaleString()} تومان`
                : request.totalAmount
                ? `${request.totalAmount.toLocaleString()} تومان`
                : "-"}
            </TableCell>
            <TableCell>{getStatusBadge(request.status)}</TableCell>
            <TableCell className="text-gray-300">{formatDate(request.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {request.status === 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-400 hover:bg-green-400/20"
                      onClick={() => onApprove && onApprove(request.id)}
                    >
                      <TickCircle size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:bg-red-400/20"
                      onClick={() => onReject && onReject(request.id)}
                    >
                      <CloseCircle size={18} />
                    </Button>
                  </>
                )}
                {request.status === 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-400 hover:bg-blue-400/20"
                    onClick={() => onProcessRefund && onProcessRefund(request.id)}
                  >
                    <MoneyRecive size={18} />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}





