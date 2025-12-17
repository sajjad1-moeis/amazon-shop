"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const FILTER_OPTIONS = [
  { value: null, label: "همه" },
  { value: false, label: "خوانده نشده" },
  { value: true, label: "خوانده شده" },
];

export default function FilterButtons({ currentFilter, onFilterChange }) {
  return (
    <div className="flex gap-2">
      {FILTER_OPTIONS.map((option) => (
        <Button
          key={option.label}
          variant={currentFilter === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

