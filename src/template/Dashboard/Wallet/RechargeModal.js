"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { toast } from "sonner";

export default function RechargeModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !paymentMethod) {
      toast.error("لطفاً تمام فیلدها را پر کنید");
      return;
    }
    toast.success("درخواست شارژ با موفقیت ثبت شد");
    setAmount("");
    setPaymentMethod("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>شارژ کیف پول</DialogTitle>
          <DialogDescription>مبلغ مورد نظر برای شارژ را وارد کنید</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div>
            <Label htmlFor="amount">مبلغ (تومان) *</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مثال: ۱۰۰۰۰۰۰"
              min="1000"
            />
          </div>

          {/* Payment Method */}
          <div>
            <Label className="mb-3 block">روش پرداخت *</Label>
            <PaymentMethodSelector selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
              پرداخت و شارژ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

