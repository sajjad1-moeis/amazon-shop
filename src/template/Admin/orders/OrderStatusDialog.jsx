"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderService, OrderStatus } from "@/services/order/orderService";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { value: OrderStatus.Pending, label: "در انتظار" },
  { value: OrderStatus.Paid, label: "پرداخت شده" },
  { value: OrderStatus.Processing, label: "در حال پردازش" },
  { value: OrderStatus.Shipped, label: "ارسال شده" },
  { value: OrderStatus.Delivered, label: "تحویل شده" },
  { value: OrderStatus.Cancelled, label: "لغو شده" },
  { value: OrderStatus.Refunded, label: "بازگشت داده شده" },
  { value: OrderStatus.Failed, label: "ناموفق" },
];

export default function OrderStatusDialog({ open, onOpenChange, orderId, currentStatus, onSuccess }) {
  const [status, setStatus] = useState(String(currentStatus ?? ""));
  const [adminNotes, setAdminNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId || !status) return;
    try {
      setLoading(true);
      await orderService.updateStatus(orderId, {
        status: Number(status),
        adminNotes: adminNotes || undefined,
      });
      toast.success("وضعیت سفارش به‌روزرسانی شد");
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      toast.error(err?.message ?? "خطا در به‌روزرسانی وضعیت");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (v) => {
    if (!v) {
      setStatus(String(currentStatus ?? ""));
      setAdminNotes("");
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-600 text-gray-100 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">تغییر وضعیت سفارش</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-300">وضعیت جدید</Label>
            <Select value={status} onValueChange={setStatus} dir="rtl">
              <SelectTrigger className="mt-2 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="انتخاب وضعیت" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-300">یادداشت ادمین (اختیاری)</Label>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="یادداشت..."
              className="mt-2 bg-gray-700 border-gray-600 text-white min-h-[80px]"
              dir="rtl"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className="border-gray-600">
              انصراف
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
