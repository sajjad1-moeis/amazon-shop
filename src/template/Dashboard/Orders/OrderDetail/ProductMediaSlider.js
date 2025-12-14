"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import Image from "next/image";
import { Play, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function ProductMediaSlider({ media }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef(null);

  return (
    <div className="bg-white dark:bg-gray-800 h-full rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">عکس و فیلم محصولات</h3>

      <div className="relative">
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={2.5}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
          }}
          className="h-full"
        >
          {media.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => {
                  mainSwiperRef.current?.slideToLoop(index);
                  setSelectedIndex(index);
                }}
                className={cn(
                  "relative w-full h-44 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                  selectedIndex === index
                    ? "border-primary-600 dark:border-primary-400"
                    : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                )}
              >
                {item.type === "video" ? (
                  <>
                    <Image src={item.url} alt="Video thumbnail" fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play size={24} className="text-white" variant="Bold" />
                    </div>
                  </>
                ) : (
                  <Image src={item.url || "/placeholder.jpg"} alt="Product" fill className="object-cover" />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
