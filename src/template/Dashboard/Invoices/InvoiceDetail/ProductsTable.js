"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function ProductsTable({ products }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">لیست کالاها</h3>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-700/50">
            <TableRow className="border-b border-gray-200 dark:border-gray-700">
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                نام محصول
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                تعداد
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                قیمت نماینده
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                جمع جزء
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  محصولی یافت نشد
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow
                  key={product.id}
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                    index === products.length - 1 && "last:border-b-0"
                  )}
                >
                  <TableCell className="text-sm text-gray-900 dark:text-white py-4 px-4 font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">
                    {product.quantity} عدد
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900 dark:text-white py-4 px-4">
                    {product.representativePrice.toLocaleString("fa-IR")} تومان
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900 dark:text-white py-4 px-4">
                    {product.subtotal.toLocaleString("fa-IR")} تومان
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}




