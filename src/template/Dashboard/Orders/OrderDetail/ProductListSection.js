"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Paintbucket } from "iconsax-reactjs";

export default function ProductListSection({ products, title = "لیست محصولات" }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        {title} {products.length}
      </h2>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="products-list-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              {/* Product Image */}
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Paintbucket size={48} />
                  </div>
                )}
              </div>

              {/* Product Name */}
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[40px]">
                {product.name}
              </h4>

              {/* Product Details */}
              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                {product.color && (
                  <div className="flex items-center gap-2">
                    <span>رنگ:</span>
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: product.colorCode || "#FFD700" }}
                    />
                    <span className="font-medium text-gray-900 dark:text-white">{product.color}</span>
                  </div>
                )}
                <div>
                  <span>تعداد: </span>
                  <span className="font-medium text-gray-900 dark:text-white">{product.quantity} عدد</span>
                </div>
                <div>
                  <span>قیمت واحد (ت): </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.unitPrice.toLocaleString("fa-IR")}
                  </span>
                </div>
                <div>
                  <span>قیمت کل (ت): </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.totalPrice.toLocaleString("fa-IR")}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

