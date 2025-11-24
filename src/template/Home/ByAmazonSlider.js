"use client";

import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/ProductCard";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 3.5,
          },
          1444: {
            slidesPerView: 4.5,
          },
        }}
        className="mySwiper"
      >
        {[1, 2, 3, 5, 5, 5, 5].map((i) => (
          <SwiperSlide>
            <ProductCard className={"border-[#D1D9FF]"} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
