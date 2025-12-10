"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FilterBar({ filters = [] }) {
  if (filters.length === 0) return null;

  return (
    <>
      {filters.map((filter, index) => (
        <Select key={index} value={filter.value} onValueChange={filter.onChange}>
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px]">
            <SelectValue placeholder={filter.placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </>
  );
}


