"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import TitleCard from "@/components/TitleCard";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeletonList } from "@/components/ProductCardSkeleton";
import ViewAllProductsCard from "@/components/ViewAllProductsCard";
import { productService } from "@/services/product/productService";
import { unwrapApiData } from "@/services/api/client";
import { mapProductListDto } from "@/utils/productHelpers";

function FeaturedProductsSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    productService
      .getFeatured(15)
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
    <div className="mt-22 container categories relative max-md:border-y dark:border-dark-field max-md:py-5">
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
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={products.length > 1}
          navigation={{
            nextEl: ".categories .next-slide",
            prevEl: ".categories .prev-slide",
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

      <button
        className="next-slide text-gray-600 p-2 mt-4 absolute top-1/2 -translate-y-1/2 xl:-left-5 2xl:left-5 left-5 z-50"
        aria-label="اسلاید بعدی"
      >
        <ArrowLeft2 />
      </button>
      <button
        className="prev-slide text-gray-600 p-2 mt-4 absolute top-1/2 -translate-y-1/2 z-50 xl:-right-5 2xl:right-5 right-5"
        aria-label="اسلاید قبلی"
      >
        <ArrowRight2 />
      </button>

      <ViewAllProductsCard />
    </div>
  );
}

export default FeaturedProductsSlider;
