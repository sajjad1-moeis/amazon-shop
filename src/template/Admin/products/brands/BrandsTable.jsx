"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../../TableActions";

const getBrandStatusBadge = (isActive) => {
  return (
    <Badge
      variant="outline"
      className={
        isActive
          ? "bg-green-500/20 text-green-400 border-green-500/30"
          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
      }
    >
      {isActive ? "فعال" : "غیرفعال"}
    </Badge>
  );
};

export default function BrandsTable({ brands }) {
  if (brands.length === 0) {
    return <div className="p-8 text-center text-gray-400">برندی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام برند</TableHead>
          <TableHead className="text-gray-300">تعداد محصولات</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand) => (
          <TableRow key={brand.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{brand.name || "-"}</TableCell>
            <TableCell className="text-gray-300">
              {brand.productsCount || brand.productCount || brand.count || 0}
            </TableCell>
            <TableCell>{getBrandStatusBadge(brand.isActive !== false)}</TableCell>
            <TableCell>
              <TableActions showView={false} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


