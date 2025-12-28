"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const shabaNumbers = [
  { id: "1", number: "IR123456789012345678901234" },
  { id: "2", number: "IR987654321098765432109876" },
];

export default function WithdrawModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [shaba, setShaba] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !shaba) {
      return;
    }
    // Handle withdraw logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-dark-title">برداشت از کیف پول</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Withdrawal Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              مبلغ برداشت
            </Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مبلغ برداشت را وارد کنید ..."
              className="w-full"
              dir="rtl"
            />
          </div>

          {/* IBAN Selection */}
          <div className="space-y-2">
            <Label htmlFor="shaba" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              شماره شبا
            </Label>
            <Select value={shaba} onValueChange={setShaba}>
              <SelectTrigger id="shaba" className="w-full" dir="rtl">
                <SelectValue placeholder="شماره شبا خود را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {shabaNumbers.map((shabaItem) => (
                  <SelectItem key={shabaItem.id} value={shabaItem.id}>
                    {shabaItem.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Optional Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              توضیحات (اختیاری)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات خود را وارد کنید ..."
              rows={4}
              className="w-full resize-none"
              dir="rtl"
            />
          </div>

          {/* Action Buttons */}
          <DialogFooter className="flex-row-reverse gap-3 sm:justify-start">
            <Button
              type="submit"
              className="bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white flex-1 sm:flex-initial"
            >
              ثبت درخواست
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-gray-50 dark:hover:bg-dark-box flex-1 sm:flex-initial"
            >
              لغو
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
