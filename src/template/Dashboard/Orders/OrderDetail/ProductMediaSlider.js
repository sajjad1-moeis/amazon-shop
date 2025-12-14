"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Play, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function ProductMediaSlider({ media }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">عکس و فیلم محصولات</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Main Image/Video */}
        <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          {media[selectedIndex]?.type === "video" ? (
            <div className="relative w-full h-full">
              <Image
                src={media[selectedIndex].thumbnail || media[selectedIndex].url}
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                  <Play size={32} className="text-primary-600 mr-1" variant="Bold" />
                </div>
              </div>
            </div>
          ) : (
            <Image
              src={media[selectedIndex]?.url || "/placeholder.jpg"}
              alt="Product image"
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-3">
          {media.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative w-full h-44 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                selectedIndex === index
                  ? "border-primary-600 dark:border-primary-400"
                  : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
              )}
            >
              {item.type === "video" ? (
                <>
                  <Image src={item.thumbnail || item.url} alt="Video thumbnail" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play size={24} className="text-white" variant="Bold" />
                  </div>
                </>
              ) : (
                <Image src={item.url || "/placeholder.jpg"} alt="Product" fill className="object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
