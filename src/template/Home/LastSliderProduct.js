"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import SliderNavButton from "@/components/SliderNavButton";
import { SLIDER_AUTOPLAY_DELAY } from "@/config/sliderConfig";
import { productService } from "@/services/product/productService";
import { unwrapApiData } from "@/services/api/client";
import { mapProductListDto } from "@/utils/productHelpers";
import { ProductCardSkeleton, ProductCardSkeletonList } from "@/components/ProductCardSkeleton";

const SECTION_TITLE = "پرینتر های سه بعدی";

function LastSliderProduct() {
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
        setProducts(list.slice(0, 24).map(mapProductListDto).filter(Boolean));
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

  const displayProducts = products.length > 0 ? products : [];

  return (
    <div className="container mb-22">
      <div className="mt-22 last-slider-product relative border-2 border-primary-600 dark:bg-[#191C24] bg-primary-50 rounded-2xl overflow-hidden">
        <div className="bg-primary-600 dark:bg-[#32419166] p-4 flex-between">
          <p className="text-xl lg:text-2xl text-white">{SECTION_TITLE}</p>
          <div className="grid grid-cols-4 gap-4 max-lg:hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative my-auto rounded-md max-w-28">
                <Image src={`/image/Home/logo${i}.png`} width={150} height={30} alt={`three-d-printer-banner-${i}`} />
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full p-4">
            <ProductCardSkeletonList count={4} className="border-[#D1D9FF]" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-5 p-4 max-lg:hidden">
              {displayProducts.length === 0 ? (
                <div className="col-span-4 text-center py-8 text-gray-500 dark:text-dark-text">محصولی یافت نشد.</div>
              ) : (
                displayProducts.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)
              )}
            </div>

            <div className="lg:hidden p-4 relative">
              {displayProducts.length > 0 && (
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
              {displayProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-dark-text">محصولی یافت نشد.</div>
              ) : (
                <Swiper
                  slidesPerView={1.5}
                  spaceBetween={10}
                  autoplay={{ delay: SLIDER_AUTOPLAY_DELAY, disableOnInteraction: false }}
                  loop={displayProducts.length > 1}
                  navigation={{
                    nextEl: ".last-slider-product .next-slide",
                    prevEl: ".last-slider-product .prev-slide",
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3 },
                  }}
                  modules={[Navigation, Autoplay]}
                  className="mySwiper"
                >
                  {displayProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductCard product={product} className="bg-white border-0 dark:bg-dark-box" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className="flex flex-nowrap overflow-auto gap-4 lg:hidden bg-primary-600 p-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative rounded-md my-auto">
                  <Image src={`/image/Home/logo${i}.png`} width={150} height={30} alt={`three-d-printer-banner-${i}`} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LastSliderProduct;
