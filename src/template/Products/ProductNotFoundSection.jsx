"use client";

import React from "react";
import { AMAZON_REGIONS, getRegionSearchUrl } from "@/data/amazonRegions";

const DEFAULT_TITLE = "محصول خود را پیدا نکردید؟";
const DEFAULT_DESCRIPTION =
  "با استفاده از دکمه‌های زیر، می‌توانید نتایج به‌روزتری را با جستجوی لحظه‌ای در آمازون کشورهای زیر مشاهده کنید.";

/**
 * بخش «محصول خود را پیدا نکردید؟» — داینامیک و کامپوننت‌بندی شده.
 * @param {string} [searchQuery] - عبارت جستجو (در لینک دکمه‌ها استفاده می‌شود)
 * @param {Array<{ id: string, name: string, flag: string, baseUrl: string, searchParam?: string }>} [regions] - لیست مناطق آمازون (پیش‌فرض: AMAZON_REGIONS)
 * @param {string} [title]
 * @param {string} [description]
 */
export default function ProductNotFoundSection({
  searchQuery = "",
  regions: regionsProp,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}) {
  const regions = Array.isArray(regionsProp) && regionsProp.length > 0 ? regionsProp : AMAZON_REGIONS;

  return (
    <section
      className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-700"
      aria-labelledby="product-not-found-title"
    >
      <h2
        id="product-not-found-title"
        className="text-xl md:text-2xl font-bold text-primary-700 dark:text-[#B1B1FF] text-center mb-2"
      >
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base text-center mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {regions.map((region) => {
          const href = getRegionSearchUrl(region, searchQuery);
          return (
            <div
              key={region.id}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-field p-5 flex flex-col items-center text-center"
            >
              <span className="text-3xl mb-3" role="img" aria-hidden>
                {region.flag}
              </span>
              <p className="text-gray-800 dark:text-gray-200 text-sm font-medium mb-4">
                {region.name}
              </p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white text-sm font-medium transition-colors"
              >
                مشاهده وبسایت
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
