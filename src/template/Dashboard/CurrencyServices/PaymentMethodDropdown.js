"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const paymentMethods = [
  { id: "bank", label: "واریز به حساب بانکی" },
  { id: "wallet", label: "کیف پول" },
  { id: "card", label: "کارت به کارت" },
];

export default function PaymentMethodDropdown({ selectedMethod, onSelect }) {
  return (
    <Select value={selectedMethod} onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="انتخاب روش پرداخت" />
      </SelectTrigger>
      <SelectContent>
        {paymentMethods.map((method) => (
          <SelectItem key={method.id} value={method.id}>
            {method.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

