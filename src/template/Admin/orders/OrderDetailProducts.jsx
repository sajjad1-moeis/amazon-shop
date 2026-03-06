"use client";

import React from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Box1 } from "iconsax-reactjs";

export default function AdminOrderDetailProducts({ products = [] }) {
  if (!products?.length) {
    return (
      <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Box1 size={20} />
          لیست محصولات
        </h2>
        <p className="text-gray-400 text-center py-8">محصولی در این سفارش ثبت نشده</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 overflow-hidden">
      <div className="p-4 border-b border-gray-600">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Box1 size={20} />
          لیست محصولات ({products.length})
        </h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600 hover:bg-gray-700/50">
              <TableHead className="text-gray-400">تصویر</TableHead>
              <TableHead className="text-gray-400">نام محصول</TableHead>
              <TableHead className="text-gray-400">تعداد</TableHead>
              <TableHead className="text-gray-400">قیمت واحد</TableHead>
              <TableHead className="text-gray-400">قیمت کل</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => {
              const qty = item.quantity ?? item.count ?? item.qty ?? 1;
              const unitPrice = item.unitPrice ?? item.price ?? item.finalPrice ?? 0;
              const totalPrice = item.totalPrice ?? item.amount ?? item.finalPrice ?? qty * unitPrice;
              const imgSrc = item.image ?? item.productImageUrl ?? item.imageUrl ?? item.thumbnailUrl ?? (Array.isArray(item.images) && item.images[0]);
              return (
                <TableRow key={item.id ?? item.productId ?? Math.random()} className="border-gray-600 hover:bg-gray-700/50">
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-600 shrink-0">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <Box1 size={24} />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-200 font-medium">
                    {item.name ?? item.productName ?? item.title ?? item.productTitle ?? "-"}
                  </TableCell>
                  <TableCell className="text-gray-300">{qty}</TableCell>
                  <TableCell className="text-gray-300">
                    {unitPrice ? `${Number(unitPrice).toLocaleString("fa-IR")} تومان` : "-"}
                  </TableCell>
                  <TableCell className="text-gray-200 font-medium">
                    {totalPrice ? `${Number(totalPrice).toLocaleString("fa-IR")} تومان` : "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
