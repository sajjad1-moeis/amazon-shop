"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const banks = [
  { value: "melli", label: "بانک ملی ایران" },
  { value: "mellat", label: "بانک ملت" },
  { value: "saderat", label: "بانک صادرات ایران" },
  { value: "tejarat", label: "بانک تجارت" },
  { value: "pasargad", label: "بانک پاسارگاد" },
  { value: "parsian", label: "بانک پارسیان" },
  { value: "saman", label: "بانک سامان" },
  { value: "sarmayeh", label: "بانک سرمایه" },
  { value: "tosee", label: "بانک توسعه صادرات" },
  { value: "tosee-taavon", label: "بانک توسعه تعاون" },
  { value: "keshavarzi", label: "بانک کشاورزی" },
  { value: "maskan", label: "بانک مسکن" },
  { value: "post", label: "پست بانک ایران" },
  { value: "ansar", label: "بانک انصار" },
  { value: "hekmat", label: "بانک حکمت ایرانیان" },
  { value: "karafarin", label: "بانک کارآفرین" },
  { value: "dey", label: "بانک دی" },
  { value: "eghtesad-novin", label: "بانک اقتصاد نوین" },
  { value: "iran-zamin", label: "بانک ایران زمین" },
  { value: "ayandeh", label: "بانک آینده" },
  { value: "ghavamin", label: "بانک قوامین" },
  { value: "mehr-iran", label: "بانک مهر ایران" },
  { value: "shahr", label: "بانک شهر" },
  { value: "sina", label: "بانک سینا" },
  { value: "tosee-saderat", label: "بانک توسعه صادرات" },
];

export default function BankSelector({ value, onChange }) {
  return (
    <Select value={value || undefined} onValueChange={onChange} dir="rtl">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="انتخاب بانک" />
      </SelectTrigger>
      <SelectContent>
        {banks.map((bank) => (
          <SelectItem key={bank.value} value={bank.value}>
            {bank.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

