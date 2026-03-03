"use client";

import React from "react";
import { AMAZON_REGIONS, getRegionSearchUrl } from "@/data/amazonRegions";
import Image from "next/image";

const DEFAULT_TITLE = "محصول خود را پیدا نکردید؟";
const DEFAULT_DESCRIPTION =
  "با استفاده از دکمه‌های زیر می‌توانید نتایج به‌روزتری را با جستجوی لحظه‌ای در آمازون کشورهای زیر مشاهده کنید.";

/**
 * بخش «محصول خود را پیدا نکردید؟» — چهار دکمه جستجو در آمازون (آلمان، انگلستان، آمریکا، امارات)
 * @param {string} [searchQuery] - عبارت جستجو (در لینک دکمه‌ها استفاده می‌شود)
 */
export default function ProductNotFoundSection({
  searchQuery = "",
  regions: regionsProp,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}) {
  const regions = Array.isArray(regionsProp) && regionsProp.length > 0 ? regionsProp : AMAZON_REGIONS;

  return (
    <section className="mt-12 pt-10" aria-labelledby="product-not-found-title">
      <h2 id="product-not-found-title" className="text-xl md:text-2xl text-dark-primary dark:text-[#B1B1FF] mb-2">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base  mb-8  ">{description}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {regions.map((region) => {
          const href = getRegionSearchUrl(region, searchQuery);
          return (
            <a
              key={region.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2 sm:p-5 rounded-xl border border-gray-200 dark:border-dark-stroke bg-gray-50 dark:bg-dark-box hover:bg-gray-100 dark:hover:bg-dark-field/80 transition-colors"
            >
              {/* آیکون ذره‌بین با پرچم داخل لنز */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-3 flex items-center justify-center">
                <div className="relative">
                  <Image
                    src={`/image/Products${region.src}`}
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-sm font-medium text-center">
                جستجو در <span className="text-dark-primary dark:text-dark-title">{region.name}</span>
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
