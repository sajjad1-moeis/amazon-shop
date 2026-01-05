"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Star, Eye, ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowCircleLeft, ArrowCircleLeft2, ArrowCircleRight, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";

const products = [
  {
    id: 1,
    title: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری Reserve کرونوگراف",
    price: "۱۲,۴۵۰,۰۰۰ تومان",
    rating: 4.7,
    reviews: 235,
    retailer: "amazon",
    image: "/api/placeholder/200/200",
  },
  {
    id: 2,
    title: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری Reserve کرونوگراف",
    price: "۱۲,۴۵۰,۰۰۰ تومان",
    rating: 4.7,
    reviews: 235,
    retailer: "amazon",
    image: "/api/placeholder/200/200",
  },
  {
    id: 3,
    title: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری Reserve کرونوگراف",
    price: "۱۲,۴۵۰,۰۰۰ تومان",
    rating: 4.7,
    reviews: 235,
    retailer: "amazon",
    image: "/api/placeholder/200/200",
  },
  {
    id: 4,
    title: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری Reserve کرونوگراف",
    price: "۱۲,۴۵۰,۰۰۰ تومان",
    rating: 4.7,
    reviews: 235,
    retailer: "amazon",
    image: "/api/placeholder/200/200",
  },
];

export default function ProductSuggestions() {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mb-6 product-suggestions relative">
      <div className="flex-between mb-4 md:mb-6">
        <div className="">
          <h3 className="text-lg text-gray-900 dark:text-dark-titre mb-2">پیشنهادهای مشابه برای شما</h3>
        </div>
        <div className="flex gap-2">
          <button className="next-slide  z-[8888] ">
            <ArrowCircleRight size={36} variant="Bold" className=" text-primary-600 dark:text-dark-title" />
          </button>
          <button className="prev-slide  z-50 ">
            <ArrowCircleLeft size={36} variant="Bold" className=" text-primary-600 dark:text-dark-title" />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        navigation={{
          nextEl: ".product-suggestions .next-slide",
          prevEl: ".product-suggestions .prev-slide",
        }}
        breakpoints={{
          768: { slidesPerView: 1.5, spaceBetween: 20 },
          1080: { slidesPerView: 2, spaceBetween: 16 },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Card className="rounded-xl border overflow-hidden border-gray-200 dark:border-dark-field dark:bg-dark-box shadow-sm hover:shadow-md transition p-0">
              <CardContent className="p-0 grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                {/* Product Image */}
                <div className="relative aspect-square h-full md:h-40 w-full col-span-1">
                  <Image src="/image/Home/product.png" alt={`محصول بازدید شده شماره `} fill className="object-cover" />
                </div>

                {/* Product Info */}
                <div className="space-y-3 col-span-2 md:col-span-3 p-3">
                  <h4 className="text-sm md:text-base max-md:border-b max-md:pb-4 dark:border-dark-stroke border-gray-200  text-gray-900 dark:text-dark-titre line-clamp-2">
                    {product.title}
                  </h4>

                  <div className="flex items-center justify-between gap-2">
                    {/* Retailer */}
                    <div className="flex items-center gap-2">
                      <Image
                        src="/image/amazonLogo.png"
                        alt="amazon"
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-dark-text">{product.retailer}</span>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-dark-text">
                        ({product.reviews.toLocaleString("fa-IR")})
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <p className="text-lg md:text-xl text-gray-900 dark:text-dark-titre">{product.price}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 max-md:hidden text-white bg-dark-primary dark:border-0"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">مشاهده جزئیات</span>
                      <span className="sm:hidden">جزئیات</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
    </div>
  );
}
