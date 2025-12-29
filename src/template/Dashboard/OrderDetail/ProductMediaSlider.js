"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function ProductMediaSlider({ media = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-dark-title mb-4 text-right">عکس و فیلم محصولات</h3>
        <div className="flex items-center justify-center h-64 bg-white dark:bg-dark-box rounded-lg">
          <p className="text-gray-500 dark:text-dark-text">محتوایی برای نمایش وجود ندارد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-4">
      <h3 className="text-lg  text-gray-900 dark:text-dark-title mb-4 text-right">عکس و فیلم محصولات</h3>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={10}
        navigation={{
          nextEl: ".categories .next-slide",
          prevEl: ".categories .prev-slide",
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
        }}
        modules={[Navigation]}
        className="mySwiper"
        style={{ paddingLeft: "2px" }}
      >
        {[...Array(9)].map((_, i) => (
          <SwiperSlide key={i}>
            <div className="relative aspect-square max-h-60 w-full">
              <Image src="/image/Home/product.png" alt="تصویر محصول" fill className="object-cover w-full rounded-xl " />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col md:flex-row gap-4">{/* Main Media Display */}</div>
    </div>
  );
}
