"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import SliderNavButton from "@/components/SliderNavButton";
import TitleCard from "@/components/TitleCard";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeletonList } from "@/components/ProductCardSkeleton";
import ViewAllProductsCard from "@/components/ViewAllProductsCard";
import { SLIDER_AUTOPLAY_DELAY } from "@/config/sliderConfig";
import { productService } from "@/services/product/productService";
import { unwrapApiData } from "@/services/api/client";
import { mapProductListDto } from "@/utils/productHelpers";

function FeaturedProductsSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    productService
      .getBestSellers(24)
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        const list = Array.isArray(data) ? data : [];
        setProducts(list.map(mapProductListDto).filter(Boolean));
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mt-22 container featured-products-slider relative max-md:border-y dark:border-dark-field max-md:py-5">
      <TitleCard title="برای یک خانه هوشمندتر" content="مشاهده همه محصولات" className="mb-8" contentHref="/products" />

      {loading && products.length === 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductCardSkeletonList count={4} />
        </div>
      )}

      {!loading && (
        <Swiper
          slidesPerView={1.5}
          spaceBetween={10}
          autoplay={{
            delay: SLIDER_AUTOPLAY_DELAY,
            disableOnInteraction: false,
          }}
          loop={products.length > 1}
          navigation={{
            nextEl: ".featured-products-slider .next-slide",
            prevEl: ".featured-products-slider .prev-slide",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4 },
            1444: { slidesPerView: 5 },
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {products.length === 0 ? (
            <SwiperSlide>
              <div className="text-center py-8 text-gray-500 dark:text-dark-text">محصولی یافت نشد.</div>
            </SwiperSlide>
          ) : (
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      )}

      {products.length > 1 && (
        <>
          <SliderNavButton
            direction="next"
            className="next-slide absolute top-1/2 -translate-y-1/2 xl:-left-3 2xl:left-8 left-6 z-50"
          />
          <SliderNavButton
            direction="prev"
            className="prev-slide absolute top-1/2 -translate-y-1/2 z-50 xl:-right-3 2xl:right-8 right-6"
          />
        </>
      )}

      <ViewAllProductsCard />
    </div>
  );
}

export default FeaturedProductsSlider;
