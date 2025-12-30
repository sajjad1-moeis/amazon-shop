"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  filterInputStyles,
  filterTextareaStyles,
  filterSelectTriggerStyles,
  filterSelectContentStyles,
} from "@/utils/filterStyles";

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
      <DialogContent className="max-w-md dark:bg-dark-box" dir="rtl">
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
              className={cn("w-full", filterInputStyles)}
              dir="rtl"
            />
          </div>

          {/* IBAN Selection */}
          <div className="space-y-2">
            <Label htmlFor="shaba" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              شماره شبا
            </Label>
            <Select value={shaba} onValueChange={setShaba}>
              <SelectTrigger id="shaba" className={cn("!w-full", filterSelectTriggerStyles)} dir="rtl">
                <SelectValue placeholder="شماره شبا خود را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent className={filterSelectContentStyles} dir="rtl">
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
              className={cn("w-full resize-none", filterTextareaStyles)}
              dir="rtl"
            />
          </div>

          {/* Action Buttons */}
          <DialogFooter className="flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full dark:border-primary-400 border-2 dark:text-primary-400"
            >
              لغو
            </Button>
            <Button type="submit" className="bg-primary-600 w-full hover:bg-primary-700 text-white">
              ثبت درخواست
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
