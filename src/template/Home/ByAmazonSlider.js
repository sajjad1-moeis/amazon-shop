"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeletonList } from "@/components/ProductCardSkeleton";
import { productService } from "@/services/product/productService";
import { unwrapApiData } from "@/services/api/client";
import { mapProductListDto } from "@/utils/productHelpers";

export default function ByAmazonSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getFeatured(12)
      .then((res) => {
        const data = unwrapApiData(res);
        const list = Array.isArray(data) ? data : [];
        setProducts(list.map(mapProductListDto).filter(Boolean));
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <ProductCardSkeletonList count={4} className="border-[#D1D9FF]" />
        </div>
      ) : (
        <Swiper
          slidesPerView={1.5}
          spaceBetween={10}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={products.length > 1}
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
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} className="border-[#D1D9FF]" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
