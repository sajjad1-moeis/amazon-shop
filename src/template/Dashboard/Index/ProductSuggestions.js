"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Star, Eye } from "lucide-react";

const products = [
  {
    id: 1,
    title: "ساعت مچی مردانه Invicta مدل ۳۶۱ سری کرونوگراف Reserve",
    price: "۱۳,۴۵۰,۰۰۰ تومان",
    rating: 4.7,
    reviews: 235,
    retailer: "amazon",
    image: "/api/placeholder/200/200",
  },
  {
    id: 2,
    title: "ساعت مچی مردانه Invicta مدل ۳۶۱ سری کرونوگراف Reserve",
    price: "۱۲,۴۵۰,۰۰۰ تومان",
    rating: 4.7,
    reviews: 235,
    retailer: "amazon",
    image: "/api/placeholder/200/200",
  },
];

export default function ProductSuggestions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">پیشنهادهای امروز</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="relative w-full h-48 md:h-56 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400 dark:text-gray-500">
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto mb-2"></div>
                  <p className="text-xs">تصویر محصول</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
                {product.title}
              </h4>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">({product.reviews})</span>
              </div>

              {/* Retailer */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">a</span>
                </div>
                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{product.retailer}</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{product.price}</p>
                <Button size="sm" variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">مشاهده جزئیات</span>
                  <span className="sm:hidden">جزئیات</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
