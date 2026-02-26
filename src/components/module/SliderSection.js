"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import TitleCard from "@/components/TitleCard";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeletonList } from "@/components/ProductCardSkeleton";
import ViewAllProductsCard from "@/components/ViewAllProductsCard";
import { cn } from "@/lib/utils";
import { productService } from "@/services/product/productService";
import { unwrapApiData } from "@/services/api/client";
import { mapProductListDto } from "@/utils/productHelpers";

function SliderSection({ title, content, breakpoints, className, products: productsProp }) {
  const [products, setProducts] = useState(Array.isArray(productsProp) ? productsProp : []);
  const [loading, setLoading] = useState(!Array.isArray(productsProp) || productsProp.length === 0);
  const fromApi = !Array.isArray(productsProp) || productsProp.length === 0;

  useEffect(() => {
    if (!fromApi) return;
    let c = false;
    setLoading(true);
    productService.getFeatured(12).then((res) => {
      if (c) return;
      const data = unwrapApiData(res);
      setProducts((Array.isArray(data) ? data : []).map(mapProductListDto).filter(Boolean));
    }).catch(() => { if (!c) setProducts([]); }).finally(() => { if (!c) setLoading(false); });
    return () => { c = true; };
  }, [fromApi]);

  const list = fromApi ? products : productsProp;
  return (
    <div
      className={cn(
        "mt-22 md:container categories relative max-md:border-y dark:border-dark-field max-md:py-5",
        className,
      )}
    >
      <TitleCard contentHref="/products" title={title} content={content} className={"mb-8"} />

      {loading && list.length === 0 && (
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
          breakpoints={
            breakpoints || {
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 4 },
              1444: { slidesPerView: 5 },
            }
          }
          modules={[Navigation]}
          className="mySwiper"
          style={{ paddingLeft: "2px" }}
        >
          {list.length === 0 ? (
            <SwiperSlide>
              <div className="text-center py-8 text-gray-500 dark:text-dark-text">محصولی یافت نشد.</div>
            </SwiperSlide>
          ) : (
            list.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      )}

      <button className="next-slide  text-gray-600 p-2 mt-4 absolute top-1/2 -translate-y-1/2  xl:-left-5 2xl:left-5 left-5 z-50">
        <ArrowLeft2 />
      </button>
      <button className="prev-slide  text-gray-600 p-2 mt-4 absolute top-1/2 -translate-y-1/2 z-50  xl:-right-5 2xl:right-5 right-5">
        <ArrowRight2 />
      </button>
      <ViewAllProductsCard />
    </div>
  );
}

export default SliderSection;
