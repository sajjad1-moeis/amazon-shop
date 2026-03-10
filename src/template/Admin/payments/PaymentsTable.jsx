"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MoneyRecive } from "iconsax-reactjs";
import { formatDateFa } from "@/utils/adminDateUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const getPaymentStatusBadge = (status) => {
  const statusMap = {
    1: { label: "موفق", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    2: { label: "ناموفق", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    3: { label: "در انتظار", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    4: { label: "استرداد شده", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  };
  const statusInfo = statusMap[status] || statusMap[3];
  return (
    <Badge variant="outline" className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  );
};

export default function PaymentsTable({ payments, onRefund, onView }) {
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundLoading, setRefundLoading] = useState(false);

  const handleRefundClick = (payment) => {
    setSelectedPayment(payment);
    setRefundAmount("");
    setRefundReason("");
    setRefundDialogOpen(true);
  };

  const handleRefundConfirm = async () => {
    if (!selectedPayment || !onRefund) return;
    const orderId = selectedPayment.orderId ?? selectedPayment.id;
    if (!orderId) return;
    setRefundLoading(true);
    try {
      await onRefund(orderId, {
        amount: refundAmount ? parseFloat(refundAmount) : undefined,
        reason: refundReason.trim() || undefined,
      });
      setRefundDialogOpen(false);
      setSelectedPayment(null);
    } finally {
      setRefundLoading(false);
    }
  };

  if (payments.length === 0) {
    return <div className="p-8 text-center text-gray-400">پرداختی یافت نشد</div>;
  }

  return (
    <>
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
          {payments.map((payment) => {
            const orderId = payment.orderId ?? payment.id;
            const canRefund = payment.status === 1 && orderId && onRefund;
            return (
              <TableRow key={payment.id} className="border-gray-700 hover:bg-gray-700/50">
                <TableCell className="text-white font-medium">
                  {payment.transactionId || payment.transactionNumber || payment.id}
                </TableCell>
                <TableCell className="text-gray-300">{payment.orderNumber || payment.orderId || "-"}</TableCell>
                <TableCell className="text-gray-300">
                  {payment.amount ? `${Number(payment.amount).toLocaleString("fa-IR")} تومان` : "-"}
                </TableCell>
                <TableCell className="text-gray-300">
                  {payment.method || payment.paymentMethod || payment.paymentMethodName || "-"}
                </TableCell>
                <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                <TableCell className="text-gray-300">
                  {payment.createdAt ? formatDateFa(payment.createdAt) : payment.date || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-400 hover:bg-blue-400/20"
                        onClick={() => onView(payment)}
                      >
                        <Eye size={18} />
                      </Button>
                    )}
                    {canRefund && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-400 hover:bg-amber-400/20"
                        onClick={() => handleRefundClick(payment)}
                        title="استرداد"
                      >
                        <MoneyRecive size={18} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-600 text-white">
          <DialogHeader>
            <DialogTitle>استرداد پرداخت</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedPayment && (
              <p className="text-gray-300 text-sm">
                مبلغ پرداخت: {selectedPayment.amount ? `${Number(selectedPayment.amount).toLocaleString("fa-IR")} تومان` : "-"}
              </p>
            )}
            <div className="space-y-2">
              <Label className="text-gray-400">مبلغ استرداد (خالی = کل مبلغ)</Label>
              <Input
                type="number"
                placeholder="خالی"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">دلیل استرداد (اختیاری)</Label>
              <Input
                placeholder="دلیل"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)} className="border-gray-600">
              انصراف
            </Button>
            <Button
              onClick={handleRefundConfirm}
              disabled={refundLoading}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {refundLoading ? "در حال استرداد..." : "تأیید استرداد"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}


