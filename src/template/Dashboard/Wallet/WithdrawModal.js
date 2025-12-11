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
import ShabaSelector from "./ShabaSelector";
import { toast } from "sonner";

export default function WithdrawModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [shaba, setShaba] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !shaba) {
      toast.error("لطفاً تمام فیلدها را پر کنید");
      return;
    }
    toast.success("درخواست برداشت با موفقیت ثبت شد");
    setAmount("");
    setShaba("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>برداشت از کیف پول</DialogTitle>
          <DialogDescription>مبلغ مورد نظر برای برداشت را وارد کنید</DialogDescription>
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

          {/* Shaba Number */}
          <div>
            <Label htmlFor="shaba">شماره شبا *</Label>
            <ShabaSelector selectedShaba={shaba} onSelect={setShaba} />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
              ثبت درخواست
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

