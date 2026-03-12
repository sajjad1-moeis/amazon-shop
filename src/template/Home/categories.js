"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { SLIDER_AUTOPLAY_DELAY } from "@/config/sliderConfig";
import Image from "next/image";
import Link from "next/link";
import SliderNavButton from "@/components/SliderNavButton";
import { HOMEPAGE_CATEGORIES } from "@/config/homepageImages";
import { Button } from "@/components/ui/button";

export default function Categories() {
  const items = HOMEPAGE_CATEGORIES;

  const slideContent = (cat) => (
    <Link
      href={cat.href}
      className="block relative h-full min-h-[140px] rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
    >
      <Image
        src={cat.src}
        alt={cat.label}
        width={1200}
        height={500}
        className="w-full h-auto min-h-[200px] object-cover"
      />
      {/* دکمه فقط روی هاور نمایان */}
      <Button className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)]  rounded-xl bg-[#203190CC] hover:bg-[#203190CC] dark:bg-[#3d4a8a] text-white text-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        مشاهده دسته بندی
      </Button>
    </Link>
  );

  return (
    <div className="mt-14 lg:mt-20 container categories-slider relative">
      <h2 className="text-primary-600 dark:text-dark-title text-xl lg:text-3xl text-center mb-8 font-semibold">
        دسته بندی
      </h2>
      {/* موبایل: گرید */}
      <div className="grid grid-cols-3 gap-4 lg:hidden">
        {items.map((cat, i) => (
          <div key={i} className="relative h-36 sm:h-60 md:h-80">
            {slideContent(cat)}
          </div>
        ))}
      </div>
      {/* دسکتاپ: اسلایدر */}
      <div className="max-lg:hidden relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: SLIDER_AUTOPLAY_DELAY,
            disableOnInteraction: false,
          }}
          loop={items.length > 1}
          navigation={{
            nextEl: ".categories-slider .next-slide",
            prevEl: ".categories-slider .prev-slide",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {items.map((cat, i) => (
            <SwiperSlide key={i}>
              <div className="relative ">{slideContent(cat)}</div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SliderNavButton
          direction="next"
          className="next-slide absolute top-1/2 -translate-y-1/2 xl:-left-3 2xl:left-8 left-6 z-50"
        />
        <SliderNavButton
          direction="prev"
          className="prev-slide absolute top-1/2 -translate-y-1/2 z-50 xl:-right-3 2xl:right-8 right-6"
        />
      </div>
    </div>
  );
}
