"use client";

import TitleCard from "@/components/TitleCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown2 } from "iconsax-reactjs";
import React from "react";

export default function BlogFilter({
  categories = [],
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="flex-between mb-8">
      <TitleCard title={"لیست مقالات ما"} />
      <div className="flex-between gap-2">
        <Select value={selectedCategory || "all"} onValueChange={(value) => onCategoryChange(value === "all" ? null : parseInt(value))}>
          <SelectTrigger className="max-md:p-1 dark:border-dark-stroke border-2 dark:bg-dark-field dark:border-none dark:text-dark-titre max-md:h-8 bg-gray-100 border-gray-300 rounded-lg flex-between text-gray-500">
            <SelectValue placeholder="دسته بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه دسته‌بندی‌ها</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="max-md:p-1 dark:border-dark-stroke border-2 dark:bg-dark-field dark:border-none dark:text-dark-titre max-md:h-8 bg-gray-100 border-gray-300 rounded-lg flex-between text-gray-500">
            <SelectValue placeholder="ترتیب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="mostViewed">پر بازدیدترین</SelectItem>
            <SelectItem value="featured">ویژه</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
