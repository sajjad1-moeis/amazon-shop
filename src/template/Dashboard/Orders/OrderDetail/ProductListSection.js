"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Paintbucket } from "iconsax-reactjs";

export default function ProductListSection({ products, title = "لیست محصولات" }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl text-gray-700 dark:text-white mb-4 flex gap-3">
        {title} <div className="px-1 rounded bg-primary-100 text-primary-500">{products.length}</div>
      </h2>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="products-list-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-700">
              {/* Product Image */}
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-4">
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

              <div className="p-3">
                {/* Product Name */}
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[40px]">
                  {product.name}
                </h4>

                {/* Product Details */}
                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  {product.color && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span>رنگ:</span>
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: product.colorCode || "#FFD700" }}
                        />
                        <span className="font-medium text-gray-900 dark:text-white">{product.color}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span>تعداد: </span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.quantity} عدد</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg text-center flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-3">
                        {product.unitPrice.toLocaleString("fa-IR")}
                      </p>
                      <p>قیمت واحد (ت): </p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg text-center flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-3">
                        {product.totalPrice.toLocaleString("fa-IR")}
                      </p>
                      <p>قیمت کل (ت): </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}





