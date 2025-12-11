"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const similarProducts = [
  {
    id: 1,
    title: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری Reserve کرونوگراف",
    price: "۱۲,۴۵۰,۰۰۰",
    rating: 4.7,
    reviews: 235,
    retailer: "amazon",
    image: "/image/Home/product.png",
  },
  {
    id: 2,
    title: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری Reserve کرونوگراف",
    price: "۱۲,۴۵۰,۰۰۰",
    rating: 4.7,
    reviews: 235,
    retailer: "amazon",
    image: "/image/Home/product.png",
  },
];

export default function SimilarProductsSection() {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 relative"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">پیشنهاد مشابه برای شما</h3>

      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          navigation={{
            nextEl: ".similar-products .next-slide",
            prevEl: ".similar-products .prev-slide",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
          }}
          modules={[Navigation]}
          className="similar-products"
        >
          {similarProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                {/* Product Image */}
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  {/* Title */}
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">{product.title}</h4>

                  {/* Rating and Retailer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/image/amazonLogo.png"
                        alt="amazon"
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{product.retailer}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{product.price} تومان</p>

                  {/* View Details Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                  >
                    <Eye className="h-4 w-4" />
                    مشاهده جزئیات
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          type="button"
          className="similar-products next-slide text-gray-600 p-2 absolute top-1/2 -translate-y-1/2 right-0 md:-right-5 z-50 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowRight size={20} />
        </button>
        <button
          type="button"
          className="similar-products prev-slide text-gray-600 p-2 absolute top-1/2 -translate-y-1/2 left-0 md:-left-5 z-50 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
    </div>
  );
}
