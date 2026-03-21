"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import ByAmazonSlider from "./ByAmazonSlider";
import QualityShieldModal from "./QualityShieldModal";
import { HERO_SLIDES } from "@/config/homepageImages";
import { SLIDER_AUTOPLAY_DELAY } from "@/config/sliderConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SliderNavButton from "@/components/SliderNavButton";

/**
 * تخفیف انفجاری — تعداد ساعات باقی‌مانده تا پایان تخفیف را اینجا بده.
 * شمارش معکوس از همین مقدار شروع می‌شود و کم می‌کند.
 * مثال: 24 یعنی از ۲۴ ساعت شروع کن و کم کن.
 */
const FLASH_SALE_HOURS_LEFT = 24;

function ExplosionOfferBox() {
  const endTime = useMemo(
    () => Date.now() + FLASH_SALE_HOURS_LEFT * 60 * 60 * 1000,
    []
  );
  const totalSecondsForSale = FLASH_SALE_HOURS_LEFT * 60 * 60;
  const [remaining, setRemaining] = useState({ h: 0, m: 0, s: 0, totalSeconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((endTime - now) / 1000));
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      setRemaining({ h, m, s, totalSeconds: diff });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const progressPercent = totalSecondsForSale > 0
    ? Math.min(100, (remaining.totalSeconds / totalSecondsForSale) * 100)
    : 0;
  const radius = 48;
  const halfCircleLength = Math.PI * radius;
  const strokeDashoffset = halfCircleLength - (progressPercent / 100) * halfCircleLength;

  const pad = (n) => String(Math.max(0, Math.floor(n))).padStart(2, "0");

  return (
    <div className="min-w-[150px] lg:min-w-[200px] rounded-xl p-4 flex justify-center items-center text-center max-md:hidden">
      <div>
        <div className="flex items-center justify-center relative">
          {/* فقط یک نیم‌دایره — طبق زمان باقی‌مانده کم و زیاد می‌شود (بدون دایرهٔ دوم) */}
          <svg className="absolute inset-0 w-[135px] h-[105px]" viewBox="0 0 135 105" style={{ transform: "rotate(-90deg)" }}>
            <path
              d={`M ${67.5 + radius} 52.5 A ${radius} ${radius} 0 0 0 ${67.5 - radius} 52.5`}
              fill="none"
              stroke="url(#explosionSemiGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={halfCircleLength}
              strokeDashoffset={strokeDashoffset}
              className="transition-[stroke-dashoffset] duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="explosionSemiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9900" />
                <stop offset="100%" stopColor="#F05252" />
              </linearGradient>
            </defs>
          </svg>
          {/* آیکون ساعت — خاکستری (پس‌زمینه) + نارنجی. نیم‌دایرهٔ نارنجی که خط کشیدی همون بالاست که کم و زیاد می‌شود */}
          <div className="relative z-10">
            <svg width="135" height="105" viewBox="0 0 135 105" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
              <path
                d="M67.0459 0.00152588C79.1852 -0.0800847 91.1219 3.11408 101.599 9.24664C112.075 15.3792 120.705 24.2235 126.577 34.8482C132.449 45.4729 135.348 57.4852 134.967 69.6187C134.586 81.7523 130.939 93.5591 124.412 103.794L115.985 98.4205C121.691 89.4917 125 78.8826 125 67.5005C125 35.7444 99.2562 10.0007 67.5 10.0005C35.7437 10.0005 10.0001 35.7443 10 67.5005C10.0001 79.1596 13.4699 90.0083 19.4336 99.0699L11.0811 104.556C4.4167 94.4095 0.611537 82.6533 0.0673828 70.5259C-0.476721 58.3986 2.26038 46.3488 7.98926 35.6461C13.7181 24.9434 22.227 15.9834 32.6201 9.71051C43.0135 3.43762 54.9065 0.0831397 67.0459 0.00152588Z"
                fill="#D9D9D9"
              />
              <path
                d="M62.1357 0.214233C77.7256 -1.02848 93.264 3.18029 106.095 12.1224L100.379 20.3226C91.0612 13.8169 79.7262 10.0004 67.5 10.0004C35.7438 10.0004 10.0002 35.7442 10 67.5004C10 78.9998 13.3759 89.711 19.1904 98.6967L10.7959 104.119C2.31173 90.9806 -1.34721 75.3043 0.444336 59.7679C2.23599 44.2315 9.36718 29.799 20.6191 18.9369C31.8711 8.07493 46.5459 1.45711 62.1357 0.214233Z"
                fill="url(#paint0_linear_1_6)"
              />
              <path
                d="M79.1668 47.3338C78.0735 47.3338 77.1668 46.4271 77.1668 45.3338V36.0005C77.1668 33.1205 75.3802 31.3338 72.5002 31.3338H64.5002C61.6202 31.3338 59.8335 33.1205 59.8335 36.0005V45.3338C59.8335 46.4271 58.9268 47.3338 57.8335 47.3338C56.7402 47.3338 55.8335 46.4271 55.8335 45.3338V36.0005C55.8335 30.9071 59.4068 27.3338 64.5002 27.3338H72.5002C77.5935 27.3338 81.1668 30.9071 81.1668 36.0005V45.3338C81.1668 46.4271 80.2602 47.3338 79.1668 47.3338Z"
                fill="url(#paint1_linear_1_6)"
              />
              <path
                d="M57.8336 71.4138C56.7402 71.4138 55.8336 70.5071 55.8336 69.4138C55.8336 68.2938 56.7402 67.4138 57.8336 67.4138H89.1936C89.9936 67.4138 90.6069 66.7205 90.5269 65.9205L88.7136 50.7471C88.0736 45.5738 87.1669 41.3338 78.1002 41.3338H58.9002C49.8336 41.3338 48.9269 45.5738 48.3136 50.7471L45.9136 70.7471C45.1402 77.3071 47.1669 82.6671 56.5269 82.6671H80.4736C88.9002 82.6671 91.3802 78.3205 91.2469 72.6671C91.2202 71.9471 90.6336 71.4138 89.9136 71.4138H57.8336Z"
                fill="url(#paint2_linear_1_6)"
              />
              <defs>
                <linearGradient id="paint0_linear_1_6" x1="158" y1="8.50049" x2="-11" y2="106" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9900" />
                  <stop offset="1" stopColor="#F05252" />
                </linearGradient>
                <linearGradient id="paint1_linear_1_6" x1="88.6881" y1="29.3582" x2="51.3287" y2="48.1767" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9900" />
                  <stop offset="1" stopColor="#F05252" />
                </linearGradient>
                <linearGradient id="paint2_linear_1_6" x1="104.757" y1="45.5176" x2="34.1733" y2="76.4082" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9900" />
                  <stop offset="1" stopColor="#F05252" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <p className="dark:text-white text-[#333] font-semibold text-lg -mt-2">تخفیف های</p>
        <p className="my-7 font-bold text-3xl">انفجاری</p>

        <div
          dir="ltr"
          className="py-2 flex items-center justify-center gap-1 dark:bg-black dark:text-[#B0B9CA] dark:border-[#7F4142] text-gray-700 border-red-400 border text-xl rounded-xl font-bold tabular-nums"
        >
          <span>{pad(Math.min(23, remaining.h))}</span>
          <span>:</span>
          <span>{pad(Math.min(59, remaining.m))}</span>
          <span>:</span>
          <span>{pad(Math.min(59, remaining.s))}</span>
        </div>
      </div>
    </div>
  );
}

export default function AmazonSection() {
  const [isQualityShieldOpen, setIsQualityShieldOpen] = useState(false);
  return (
    <div className="w-full bg-white dark:bg-dark-bg">
      {/* Hero Slider — اتوپلی، گریدنت پایین مثل بنر فروشگاه‌ها (لایت/دارک) */}
      <div className="hero-main-slider relative w-full overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-2/4 z-[5] dark:hidden liner-shop-bg-white pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-2/4 z-[5] hidden dark:block liner-shop-bg-dark pointer-events-none" />
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: SLIDER_AUTOPLAY_DELAY,
            disableOnInteraction: false,
          }}
          loop={HERO_SLIDES.length > 1}
          navigation={{
            nextEl: ".hero-main-slider .next-slide",
            prevEl: ".hero-main-slider .prev-slide",
          }}
          className="w-full"
        >
          {HERO_SLIDES.map((slide, index) => (
            <SwiperSlide key={index}>
              <Link href={slide.href} className="block w-full focus:outline-none">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={1200}
                  height={500}
                  priority={index === 0}
                  className="w-full h-auto min-h-[200px] object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {HERO_SLIDES.length > 1 && (
          <>
            <SliderNavButton
              direction="next"
              className="next-slide absolute left-3 top-1/2 -translate-y-1/2 z-10 opacity-90"
              size={24}
            />
            <SliderNavButton
              direction="prev"
              className="prev-slide absolute right-3 top-1/2 -translate-y-1/2 z-10 opacity-90"
              size={24}
            />
          </>
        )}
      </div>
      {/* Product Slider Box */}
      <div className="w-full container -mt-[12%] relative z-50">
        <div className="w-full border-2  dark:border-[#50578152] border-primary-300 rounded-2xl p-4 flex gap-4 overflow-x-auto bg-white dark:bg-dark-bg shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          {/* Explosion Offer Box — شمارش معکوس واقعی + گردانهٔ نارنجی متحرک */}
          <ExplosionOfferBox />

          {/* Product Card */}

          <ByAmazonSlider />

          <QualityShieldModal open={isQualityShieldOpen} onOpenChange={setIsQualityShieldOpen} />
        </div>
      </div>
    </div>
  );
}
