"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductsFilters({ filterCategory, setFilterCategory, filterStatus, setFilterStatus }) {
  return (
    <>
      <Select value={filterCategory} onValueChange={setFilterCategory}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px]">
          <SelectValue placeholder="دسته‌بندی" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="لپ تاپ">لپ تاپ</SelectItem>
          <SelectItem value="موبایل">موبایل</SelectItem>
          <SelectItem value="هدفون">هدفون</SelectItem>
          <SelectItem value="ساعت">ساعت</SelectItem>
          <SelectItem value="تبلت">تبلت</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterStatus} onValueChange={setFilterStatus}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px]">
          <SelectValue placeholder="وضعیت" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="published">منتشر شده</SelectItem>
          <SelectItem value="draft">پیش‌نویس</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

