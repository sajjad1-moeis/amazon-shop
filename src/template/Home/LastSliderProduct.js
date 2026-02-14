"use client";
import React from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

function LastSliderProduct() {
  return (
    <div className="container mb-22">
      <div className="mt-22 categories relative border-2 border-primary-600 dark:bg-[#191C24] bg-primary-50 rounded-2xl overflow-hidden">
        {/* --- Header Section --- */}
        <div className="bg-primary-600 dark:bg-[#32419166] p-4 flex-between">
          <p className="text-xl lg:text-2xl text-white">پرینتر های سه بعدی</p>

          <div className="grid grid-cols-4 gap-4 max-lg:hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative my-auto rounded-md max-w-28">
                <Image
                  src={`/image/Home/logo${i + 1}.png`}
                  width={150}
                  height={30}
                  alt={`three-d-printer-banner-${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Product Cards --- */}
        <div className="grid grid-cols-4 gap-5 p-4 max-lg:hidden ">
          {[...Array(4)].map((_, i) => (
            <ProductCard key={i} className="bg-white border-0" />
          ))}
        </div>

        <div className="lg:hidden p-4">
          {" "}
          <Swiper
            slidesPerView={1.5}
            spaceBetween={10}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={{
              nextEl: ".categories .next-slide",
              prevEl: ".categories .prev-slide",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3 },
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {[...Array(9)].map((_, i) => (
              <SwiperSlide key={i}>
                <ProductCard key={i} className="bg-white border-0" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-nowrap overflow-auto gap-4 lg:hidden bg-primary-600 p-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative  rounded-md my-auto">
              <Image
                src={`/image/Home/logo${i + 1}.png`}
                width={150}
                height={30}
                alt={`three-d-printer-banner-${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LastSliderProduct;
