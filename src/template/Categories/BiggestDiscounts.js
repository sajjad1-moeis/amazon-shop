"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import TitleCard from "@/components/TitleCard";
import ProductCard from "@/components/ProductCard";

function BiggestDiscounts() {
  return (
    <div className="mt-22 container categories relative">
      <TitleCard title={"بیشترین تخفیف‌ها"} content={"مشاهده همه محصولات"} className={"mb-8"} />

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          nextEl: ".categories .next-slide",
          prevEl: ".categories .prev-slide",
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 4 },
          1444: { slidesPerView: 4 },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {[...Array(9)].map((_, i) => (
          <SwiperSlide key={i}>
            <ProductCard />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="next-slide  text-gray-600 p-2 mt-4 absolute top-1/2 -translate-y-1/2  xl:-left-5 2xl:left-5 left-5 z-50">
        <ArrowLeft2 />
      </button>
      <button className="prev-slide  text-gray-600 p-2 mt-4 absolute top-1/2 -translate-y-1/2 z-50  xl:-right-5 2xl:right-5 right-5">
        <ArrowRight2 />
      </button>
    </div>
  );
}

export default BiggestDiscounts;
