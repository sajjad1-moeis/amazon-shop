"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardPos, Building } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function RechargeModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      return;
    }
    // Handle recharge logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-dark-title">شارژ کیف پول</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recharge Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              مبلغ شارژ
            </Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مبلغ شارژ را وارد کنید ..."
              className="w-full"
              dir="rtl"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-dark-text">روش پرداخت</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              {/* Online Payment */}
              <div
                className={cn(
                  "flex items-start gap-3 p-4 border-2 rounded-lg transition-colors cursor-pointer",
                  paymentMethod === "online"
                    ? "border-primary-700 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-dark-stroke hover:border-gray-300"
                )}
                onClick={() => setPaymentMethod("online")}
              >
                <RadioGroupItem value="online" id="online" className="mt-1" />
                <label htmlFor="online" className="flex-1 cursor-pointer flex items-start gap-3">
                  <CardPos
                    size={24}
                    className={cn(
                      "mt-0.5",
                      paymentMethod === "online"
                        ? "text-primary-700border-primary-700 dark:text-blue-400"
                        : "text-gray-600 dark:text-dark-text"
                    )}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-title">
                      پرداخت آنلاین با تمامی کارتها
                    </p>
                    <p className="text-xs text-gray-500 dark:text-dark-text mt-1">پرداخت با تمامی کارتهای عضو شتاب</p>
                  </div>
                </label>
              </div>

              {/* Bank Transfer */}
              <div
                className={cn(
                  "flex items-start gap-3 p-4 border-2 rounded-lg transition-colors cursor-pointer",
                  paymentMethod === "bank"
                    ? "border-primary-700 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-dark-stroke hover:border-gray-300"
                )}
                onClick={() => setPaymentMethod("bank")}
              >
                <RadioGroupItem value="bank" id="bank" className="mt-1" />
                <label htmlFor="bank" className="flex-1 cursor-pointer flex items-start gap-3">
                  <Building
                    size={24}
                    className={cn(
                      "mt-0.5",
                      paymentMethod === "bank"
                        ? "text-primary-700border-primary-700 dark:text-blue-400"
                        : "text-gray-600 dark:text-dark-text"
                    )}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-title">واریز به حساب بانکی</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text mt-1">
                      پرداخت بصورت کارت به کارت با شماره حساب
                    </p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Action Buttons */}
          <DialogFooter className="grid grid-cols-2 gap-3 sm:justify-start">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-2 border-primary-700 text-primary-700border-primary-700 hover:bg-gray-50 dark:hover:bg-dark-box flex-1 sm:flex-initial"
            >
              لغو
            </Button>
            <Button
              type="submit"
              className="bg-primary-700 border-primary-700 hover:bg-[#2a4a6f] text-white flex-1 sm:flex-initial"
            >
              ادامه پرداخت
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
