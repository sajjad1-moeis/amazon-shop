"use client";

import { testimonials } from "@/data";
import RenderStars from "@/components/RenderStars";
import TitreCard from "@/components/TitreCard";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const CommentBox = ({ t }) => {
  return (
    <div
      key={t.id}
      className=" bg-white dark:bg-dark-box rounded-2xl border border-gray-200 dark:border-dark-field p-3 flex flex-col"
    >
      <div class="flex border-b pb-3 mb-3 dark:border-dark-stroke">
        <div className="relative aspect-square size-8 rounded-full">
          <Image
            src="/image/GiftCart/bestSellingBanner.png"
            alt={`محصول بازدید شده شماره `}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        <h3 className="text-lg text-gray-900  px-3 border-gray-200 dark:text-white mb-3">{t.name}</h3>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 mb-4">
        تو دنیای امروز هر کسب‌وکاری که داشته باشی به پرداخت ارزی نیاز پیدا میکنی؛ اینجاست که مالتینا پی به دادت میرسه.
      </p>

      <div className="flex items-center gap-2">
        <RenderStars rating={t.rating} />
        <span className="text-sm text-gray-600 dark:text-gray-400">{t.rating} از ۵</span>
      </div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <div className="mt-20 md:mt-36">
      <div className=" dark:bg-transparent rounded-lg container">
        <TitreCard titleClassName={"text-primary-700 md:text-3xl"} title="نظرات کاربران درباره میکرولس پی" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-lg:hidden mt-8">
          {testimonials.map((t) => (
            <CommentBox t={t} />
          ))}
        </div>

        <div class="lg:hidden">
          <Swiper
            slidesPerView={1.5}
            spaceBetween={10}
            navigation={{
              nextEl: ".categories .next-slide",
              prevEl: ".categories .prev-slide",
            }}
            breakpoints={{
              640: { slidesPerView: 2.5, spaceBetween: 20 },
            }}
            modules={[Navigation]}
            className="mySwiper "
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <CommentBox t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
