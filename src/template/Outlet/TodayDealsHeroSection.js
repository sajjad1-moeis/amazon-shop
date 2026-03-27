"use client";

import React, { useEffect, useMemo, useState } from "react";
import ByAmazonSlider from "@/template/Home/ByAmazonSlider";
import { ExplosionOfferBox } from "../Home/ByAmazonSection";

const FLASH_SALE_HOURS_LEFT = 24;


export default function TodayDealsHeroSection({
  backgroundSrc = "/image/Outlet/outletBg.jpg",
  backgroundWrapperClassName = "w-full md:container py-6 md:py-8",
  productsWrapperClassName = "w-full container -mt-[12%] relative z-50",
}) {
  return (
    <div className="w-full bg-white dark:bg-dark-bg px-4 md:container">
      {/* بک‌گراند/بنر - جدا */}
      <div className={backgroundWrapperClassName}>
        <img src={backgroundSrc} alt="today deals banner" className="w-full h-auto object-cover rounded-lg md:rounded-[28px]" />
      </div>

      {/* لیست محصولات - جدا */}
    <div className=" md:px-10 lg:px-20 ">
      
      <div className={productsWrapperClassName}>
        <div className="w-full border-2 dark:border-[#50578152] border-primary-300 rounded-2xl p-4 flex gap-4 overflow-x-auto bg-white dark:bg-dark-bg shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          <ExplosionOfferBox />
          <ByAmazonSlider />
        </div>
      </div>
      </div>
    </div>
  );
}
