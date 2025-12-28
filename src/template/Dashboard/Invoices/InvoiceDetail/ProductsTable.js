"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function ProductsTable({ products }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4 md:p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-title mb-6">لیست کالاها</h3>

      <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-dark-field/50">
            <TableRow className="border-b border-gray-200 dark:border-dark-stroke">
              <TableHead className="text-right py-3 px-4 text-sm  text-gray-500 dark:text-dark-text">
                نام محصول
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm  text-gray-500 dark:text-dark-text">تعداد</TableHead>
              <TableHead className="text-right py-3 px-4 text-sm  text-gray-500 dark:text-dark-text">
                قیمت نماینده
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm text-gray-500 dark:text-dark-text">جمع جزء</TableHead>
              <TableHead className="text-right py-3 px-4 text-sm text-gray-500 dark:text-dark-text">وزن</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-dark-text">
                  محصولی یافت نشد
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow
                  key={product.id}
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
                    index === products.length - 1 && "last:border-b-0"
                  )}
                >
                  <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4 font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-sm dark:text-dark-text py-4 px-4">
                    <div className="bg-primary-100 text-[#1E429F] px-2.5 py-1 w-max rounded-md">
                      {product.quantity} عدد
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900 dark:text-dark-title py-4 px-4">
                    {product.representativePrice?.toLocaleString("fa-IR")} تومان
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900 dark:text-dark-title py-4 px-4">
                    {product.subtotal?.toLocaleString("fa-IR")} تومان
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900 dark:text-dark-title py-4 px-4">
                    {product.weight ? `${product.weight} kg` : "-"}
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




