"use client";

import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "@/components/ProductCard";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={10}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },

          1350: {
            slidesPerView: 4.5,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper "
      >
        {[1, 2, 3, 5, 5, 5, 5].map((i, index) => (
          <SwiperSlide key={index}>
            <ProductCard className={"border-[#D1D9FF]"} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
