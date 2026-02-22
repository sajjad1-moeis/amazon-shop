"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";

function Categories() {
  return (
    <div className=" mt-14 lg:mt-20 container categories relative">
      <h2 className="text-primary-600 text-xl lg:text-3xl text-center mb-8 font-semibold dark:text-dark-title">
        دسته بندی{" "}
      </h2>
      <div className="grid grid-cols-3 gap-4 lg:hidden">
        {[...Array(9)].map((_, i) => (
          <div className="relative  h-36 sm:h-60 md:h-80 ">
            <Image src={"/image/Home/category.png"} alt="category" fill className="rounded-md" />
          </div>
        ))}
      </div>
      <div className="max-lg:hidden">
        <Swiper
          slidesPerView={1}
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
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper "
        >
          {[...Array(9)].map((_, i) => (
            <SwiperSlide key={i}>
              <Image
                src={"/image/Home/category.png"}
                alt="category"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
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
    </div>
  );
}

export default Categories;
