"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";

export default function ComparisonCard({ comparison, onDelete }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{comparison.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">ایجاد شده در: {comparison.createdAt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">مشاهده</span>
            <span className="sm:hidden">👁</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 text-xs"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">حذف</span>
            <span className="sm:hidden">🗑</span>
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparison.products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="relative w-full h-32 mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {product.title}
            </h4>
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-gray-900 dark:text-white">{product.price}</p>
              <span className="text-xs text-gray-500 dark:text-gray-400">{product.retailer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

