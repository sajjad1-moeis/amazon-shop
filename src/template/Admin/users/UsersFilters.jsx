"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UsersFilters({ filterStatus, setFilterStatus, filterVIP, setFilterVIP }) {
  return (
    <>
      <Select value={filterStatus} onValueChange={setFilterStatus}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px]">
          <SelectValue placeholder="وضعیت" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="active">فعال</SelectItem>
          <SelectItem value="inactive">غیرفعال</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterVIP} onValueChange={setFilterVIP}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px]">
          <SelectValue placeholder="نوع کاربر" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="vip">VIP</SelectItem>
          <SelectItem value="normal">عادی</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

