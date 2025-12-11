"use client";

import React from "react";
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

export default function ShabaSelector({ selectedShaba, onSelect }) {
  return (
    <Select value={selectedShaba} onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="انتخاب شماره شبا" />
      </SelectTrigger>
      <SelectContent>
        {shabaNumbers.map((shaba) => (
          <SelectItem key={shaba.id} value={shaba.id}>
            {shaba.number}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

