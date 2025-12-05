"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

function Categories() {
  return (
    <div className="my-20 md:my-36  categories relative  max-md:py-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        پرفروش‌ترین گیفت کارت‌ها
      </h2>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={10}
        navigation={{
          nextEl: ".categories .next-slide",
          prevEl: ".categories .prev-slide",
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3 },
          1444: { slidesPerView: 5 },
        }}
        modules={[Navigation]}
        className="mySwiper relative"
      >
        {[...Array(9)].map((_, i) => (
          <SwiperSlide key={i}>
            <div className="relative aspect-square max-h-32 w-full z-[252]">
              <Image
                src="/image/GiftCart/bestSellingBanner.png"
                alt={`محصول بازدید شده شماره `}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="relative aspect-square h-10 mt-4 w-full">
              <Image
                src="/image/GiftCart/bestSellingLogo.png"
                alt={`محصول بازدید شده شماره `}
                fill
                className="object-contain rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
        <div
          class="absolute size-full inset-0"
          style={{
            background:
              "linear-gradient(90deg, #FAFAFA 2.72%, rgba(250, 250, 250, 0) 24.52%, rgba(250, 250, 250, 0) 76.18%, #FAFAFA 97.21%)",
          }}
        ></div>
      </Swiper>
    </div>
  );
}

export default Categories;
