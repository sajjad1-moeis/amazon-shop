"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { SLIDER_AUTOPLAY_DELAY } from "@/config/sliderConfig";
import SliderNavButton from "@/components/SliderNavButton";
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
      .getFeatured(24)
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
    <div className="by-amazon-slider relative w-full">
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <ProductCardSkeletonList count={4} className="border-[#D1D9FF]" />
        </div>
      ) : (
        <Swiper
          slidesPerView={1.5}
          spaceBetween={10}
          autoplay={{
            delay: SLIDER_AUTOPLAY_DELAY,
            disableOnInteraction: false,
          }}
          loop={products.length > 1}
          navigation={{
            nextEl: ".by-amazon-slider .next-slide",
            prevEl: ".by-amazon-slider .prev-slide",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1350: {
              slidesPerView: 4.5,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!loading && products.length > 1 && (
        <>
          <SliderNavButton
            direction="next"
            className="next-slide absolute left-4 top-1/2 -translate-y-1/2 z-10"
            size={20}
          />
          <SliderNavButton
            direction="prev"
            className="prev-slide absolute right-4 top-1/2 -translate-y-1/2 z-10"
            size={20}
          />
        </>
      )}
    </div>
  );
}
