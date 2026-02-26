"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeletonList } from "@/components/ProductCardSkeleton";
import { productService } from "@/services/product/productService";
import { unwrapApiData } from "@/services/api/client";
import { mapProductListDto } from "@/utils/productHelpers";

function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let c = false;
    productService.getBestSellers(12).then((res) => {
      if (c) return;
      const data = unwrapApiData(res);
      setProducts((Array.isArray(data) ? data : []).map(mapProductListDto).filter(Boolean));
    }).catch(() => { if (!c) setProducts([]); }).finally(() => { if (!c) setLoading(false); });
    return () => { c = true; };
  }, []);

  return (
    <div className="my-20 md:my-36  categories relative  max-md:py-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        پرفروش‌ترین گیفت کارت‌ها
      </h2>

      {loading && products.length === 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductCardSkeletonList count={8} />
        </div>
      )}

      {!loading && (
        <Swiper
          slidesPerView={1.5}
          spaceBetween={10}
          navigation={{
            nextEl: ".categories .next-slide",
            prevEl: ".categories .prev-slide",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3 },
            1444: { slidesPerView: 5 },
          }}
          modules={[Navigation]}
          className="mySwiper relative"
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
          <div
            className="absolute size-full inset-0"
            style={{
              background:
                "linear-gradient(90deg, #FAFAFA 2.72%, rgba(250, 250, 250, 0) 24.52%, rgba(250, 250, 250, 0) 76.18%, #FAFAFA 97.21%)",
            }}
          ></div>
        </Swiper>
      )}
    </div>
  );
}

export default Categories;
