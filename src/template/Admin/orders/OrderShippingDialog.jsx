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
import { Input } from "@/components/ui/input";
import { orderService, DomesticShippingMethod } from "@/services/order/orderService";
import { toast } from "sonner";

const SHIPPING_METHOD_OPTIONS = [
  { value: DomesticShippingMethod.Post, label: "پست" },
  { value: DomesticShippingMethod.Tipax, label: "تیپاکس" },
  { value: DomesticShippingMethod.BarBari, label: "باربری" },
];

export default function OrderShippingDialog({ open, onOpenChange, orderId, onSuccess }) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shippingCompany, setShippingCompany] = useState("");
  const [domesticShippingMethod, setDomesticShippingMethod] = useState("");
  const [estimatedDeliveryDays, setEstimatedDeliveryDays] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId) return;
    try {
      setLoading(true);
      await orderService.updateShipping(orderId, {
        trackingNumber: trackingNumber || undefined,
        shippingCompany: shippingCompany || undefined,
        domesticShippingMethod: domesticShippingMethod ? Number(domesticShippingMethod) : undefined,
        estimatedDeliveryDays: estimatedDeliveryDays ? Number(estimatedDeliveryDays) : undefined,
      });
      toast.success("اطلاعات ارسال به‌روزرسانی شد");
      onOpenChange(false);
      onSuccess?.();
      setTrackingNumber("");
      setShippingCompany("");
      setDomesticShippingMethod("");
      setEstimatedDeliveryDays("");
    } catch (err) {
      toast.error(err?.message ?? "خطا در به‌روزرسانی ارسال");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (v) => {
    if (!v) {
      setTrackingNumber("");
      setShippingCompany("");
      setDomesticShippingMethod("");
      setEstimatedDeliveryDays("");
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-600 text-gray-100 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">ثبت/ویرایش اطلاعات ارسال</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-300">کد رهگیری</Label>
            <Input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="کد رهگیری"
              className="mt-2 bg-gray-700 border-gray-600 text-white"
              dir="ltr"
            />
          </div>
          <div>
            <Label className="text-gray-300">شرکت ارسال</Label>
            <Input
              value={shippingCompany}
              onChange={(e) => setShippingCompany(e.target.value)}
              placeholder="مثلاً پست، تیپاکس"
              className="mt-2 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300">روش ارسال داخلی</Label>
            <select
              value={domesticShippingMethod}
              onChange={(e) => setDomesticShippingMethod(e.target.value)}
              className="mt-2 w-full rounded-md bg-gray-700 border border-gray-600 text-white p-2"
              dir="rtl"
            >
              <option value="">انتخاب کنید</option>
              {SHIPPING_METHOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-gray-300">تخمین روز تحویل</Label>
            <Input
              type="number"
              min={1}
              value={estimatedDeliveryDays}
              onChange={(e) => setEstimatedDeliveryDays(e.target.value)}
              placeholder="مثلاً ۳"
              className="mt-2 bg-gray-700 border-gray-600 text-white"
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
