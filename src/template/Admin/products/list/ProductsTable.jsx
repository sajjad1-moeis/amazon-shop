"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash } from "iconsax-reactjs";

const getStatusBadge = (status) => {
  const statusMap = {
    1: { label: "فعال", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    2: { label: "غیرفعال", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    3: { label: "ناموجود", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  };
  const statusInfo = statusMap[status] || statusMap[2];
  return (
    <Badge variant="outline" className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  );
};

export default function ProductsTable({ products, onEdit, onDelete, onView }) {

  if (products.length === 0) {
    return <div className="p-8 text-center text-gray-400">محصولی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام محصول</TableHead>
          <TableHead className="text-gray-300">دسته‌بندی</TableHead>
          <TableHead className="text-gray-300">برند</TableHead>
          <TableHead className="text-gray-300">قیمت</TableHead>
          <TableHead className="text-gray-300">موجودی</TableHead>
          <TableHead className="text-gray-300">فروخته شده</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{product.name || product.title}</TableCell>
            <TableCell className="text-gray-300">{product.categoryName || product.category || "-"}</TableCell>
            <TableCell className="text-gray-300">{product.brandName || product.brand || "-"}</TableCell>
            <TableCell className="text-gray-300">
              {product.price ? `${product.price.toLocaleString()} تومان` : "-"}
            </TableCell>
            <TableCell className="text-gray-300">{product.stock || product.quantity || 0}</TableCell>
            <TableCell className="text-gray-300">{product.soldCount || product.sold || 0}</TableCell>
            <TableCell>{getStatusBadge(product.status)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-400/20" onClick={() => onView && onView(product.id)}>
                  <Eye size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-green-400 hover:bg-green-400/20"
                  onClick={() => onEdit && onEdit(product.id)}
                >
                  <Edit size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-400 hover:bg-red-400/20"
                  onClick={() => onDelete && onDelete(product)}
                >
                  <Trash size={18} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


