"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardPos, Building } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { filterInputStyles } from "@/utils/filterStyles";

const PAYMENT_METHODS = [
  {
    value: "online",
    title: "پرداخت آنلاین با تمامی کارتها",
    description: "پرداخت با تمامی کارتهای عضو شتاب",
    icon: CardPos,
  },
  {
    value: "bank",
    title: "واریز به حساب بانکی",
    description: "پرداخت بصورت کارت به کارت با شماره حساب",
    icon: Building,
  },
];

export default function RechargeModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;

    // submit logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="max-w-md dark:bg-dark-box">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-dark-title">شارژ کیف پول</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-dark-text">مبلغ شارژ</Label>
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مبلغ شارژ را وارد کنید ..."
              className={cn("w-full", filterInputStyles)}
              dir="rtl"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-dark-text">روش پرداخت</Label>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                const isActive = paymentMethod === method.value;

                return (
                  <div
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    className={cn(
                      "flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors",
                      isActive
                        ? "border-primary-700 bg-blue-50 dark:bg-dark-blue dark:border-primary-300"
                        : "border-gray-200 dark:border-dark-stroke hover:border-gray-300"
                    )}
                  >
                    <RadioGroupItem value={method.value} id={method.value} className="mt-1" />

                    <label htmlFor={method.value} className="flex-1 cursor-pointer flex items-start gap-3">
                      <Icon
                        size={24}
                        className={cn(
                          "mt-0.5",
                          isActive ? "text-primary-700 dark:text-blue-400" : "text-gray-600 dark:text-dark-text"
                        )}
                      />

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-dark-title">{method.title}</p>
                        <p className="text-xs text-gray-500 dark:text-dark-text mt-1">{method.description}</p>
                      </div>
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Actions */}
          <DialogFooter className="flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full border-2 dark:border-primary-400 dark:text-primary-400"
            >
              لغو
            </Button>

            <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white">
              ادامه پرداخت
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
