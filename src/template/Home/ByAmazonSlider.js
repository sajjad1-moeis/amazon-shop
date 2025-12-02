"use client";

import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/ProductCard";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
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
