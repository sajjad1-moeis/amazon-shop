"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * نمایش واریانت‌های محصول (رنگ، سایز، استایل) با استایل شبیه آمازون.
 * variationDimensions: { [dimId]: { label, selected_value, swatch_type: "image"|"text", options: [...] } }
 * currentAsin: ASIN فعلی صفحه.
 * کلیک روی گزینهٔ دیگر → ناوبری به /product/[asin] و لود همان واریانت (مثل آمازون).
 */
export default function ProductVariationDimensions({ variationDimensions, currentAsin }) {
  const dimensions = variationDimensions && typeof variationDimensions === "object" ? variationDimensions : {};
  const dimIds = Object.keys(dimensions);
  if (dimIds.length === 0) return null;

  return (
    <div className="variation-dimensions-wrapper mt-6 mb-6 space-y-6 border-b border-gray-200 dark:border-gray-700 pb-6">
      {dimIds.map((dimId) => {
        const dim = dimensions[dimId];
        if (!dim || !Array.isArray(dim.options) || dim.options.length === 0) return null;
        const label = dim.label || dimId.replace(/_/g, " ");
        const selectedValue = dim.selected_value ?? "";
        const isImageSwatch = dim.swatch_type === "image";

        return (
          <div
            key={dimId}
            className="inline-twister-row a-section a-spacing-none"
            data-dimension-id={dimId}
          >
            {/* عنوان — استایل آمازون: a-size-base, a-color-secondary + a-text-bold */}
            <div className="dimension-heading a-section a-spacing-none mb-3">
              <div className="dimension-text inline-twister-dim-title-value-truncate-expanded text-right">
                <span className="a-size-base a-color-secondary text-[13px] text-gray-600 dark:text-gray-400">
                  {label}:{" "}
                </span>
                <span className="a-size-base a-color-base inline-twister-dim-title-value a-text-bold text-[13px] font-bold text-gray-900 dark:text-white">
                  {selectedValue || ""}
                </span>
              </div>
            </div>

            {/* لیست سواچ‌ها — grid افقی مثل dimension-values-list */}
            <ul
              className="a-unordered-list a-nostyle a-horizontal dimension-values-list grid list-none p-0 m-0 gap-x-3 gap-y-3"
              style={{
                gridTemplateColumns: isImageSwatch
                  ? "repeat(auto-fill, minmax(72px, 1fr))"
                  : "repeat(auto-fill, minmax(140px, 1fr))",
              }}
              role="radiogroup"
              aria-label={`انتخاب ${label}`}
            >
              {dim.options.map((opt) => {
                const isSelected = !!opt.selected;
                const isUnavailable = opt.available === false;
                const isCurrentAsin = (opt.asin || "") === (currentAsin || "");
                const href = opt.asin ? `/product/${opt.asin}` : null;

                const content = (
                  <>
                    {isImageSwatch && opt.image_url ? (
                      <div className="swatch-image-container flex flex-col items-center w-full">
                        <div
                          className={cn(
                            "swatch-image-wrapper a-section a-spacing-none w-[64px] h-[64px] flex-shrink-0 rounded overflow-hidden border-2 bg-white dark:bg-gray-100 flex items-center justify-center transition-colors",
                            isSelected
                              ? "border-[#007185] dark:border-[#00a2b8] ring-[1px] ring-[#007185]/40"
                              : "border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-400",
                            isUnavailable && "opacity-55"
                          )}
                          style={isSelected ? { boxShadow: "0 0 0 1px #007185" } : undefined}
                        >
                          <Image
                            src={opt.image_url}
                            alt={opt.label || ""}
                            width={64}
                            height={64}
                            className="object-contain w-full h-full"
                            unoptimized
                          />
                        </div>
                        {/* خط جداکننده مثل آمازون */}
                        <hr className="a-spacing-none a-divider-normal w-full border-0 border-t border-gray-200 dark:border-gray-600 my-1.5" />
                        <div className="swatch-text a-section w-full text-center">
                          <span
                            className={cn(
                              "a-size-base swatch-title-text-display text-[13px] line-clamp-2 block",
                              isSelected ? "font-bold text-[#007185] dark:text-[#00a2b8]" : "text-gray-700 dark:text-gray-300"
                            )}
                          >
                            {opt.label}
                          </span>
                          {opt.price && (
                            <span className="a-size-small text-[12px] text-gray-600 dark:text-gray-400 block mt-0.5">
                              {opt.price}
                            </span>
                          )}
                          {isUnavailable && (
                            <span className="a-size-small a-color-state text-[12px] text-red-600 dark:text-red-400 block mt-0.5">
                              {opt.unavailable_message || "See available options"}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-swatch-container flex flex-col items-stretch w-full">
                        <div
                          className={cn(
                            "text-swatch-button swatch-title-text-container a-section min-h-[40px] px-3 py-2 rounded border-2 flex items-center justify-center text-center transition-colors",
                            isSelected
                              ? "border-[#007185] dark:border-[#00a2b8] bg-[#f0f8f9] dark:bg-[#007185]/10 ring-[1px] ring-[#007185]/30"
                              : "border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-400",
                            isUnavailable && "opacity-55"
                          )}
                          style={isSelected ? { boxShadow: "0 0 0 1px #007185" } : undefined}
                        >
                          <span
                            className={cn(
                              "a-size-base swatch-title-text-display text-[13px] line-clamp-2",
                              isSelected ? "font-bold text-[#007185] dark:text-[#00a2b8]" : "text-gray-700 dark:text-gray-300"
                            )}
                          >
                            {opt.label}
                          </span>
                        </div>
                        {isUnavailable && opt.unavailable_message && (
                          <span className="a-size-small a-color-state text-[12px] text-red-600 dark:text-red-400 mt-1 block text-center">
                            {opt.unavailable_message}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                );

                const wrapperClass = cn(
                  "dimension-value-list-item-wrapper block rounded transition-all duration-150",
                  isUnavailable && "cursor-not-allowed",
                  !isUnavailable && "hover:opacity-90"
                );

                const liClass = cn(
                  "dimension-value-list-item inline-twister-swatch a-list-item",
                  isImageSwatch ? "dimension-value-list-item-square-image" : "swatch-list-item-text"
                );

                if (href && !isCurrentAsin) {
                  return (
                    <li key={opt.asin} className={liClass} data-asin={opt.asin} role="radio" aria-checked={isSelected} aria-label={opt.label}>
                      <Link
                        href={href}
                        className={wrapperClass}
                        aria-pressed={isSelected}
                        aria-label={`${opt.label}${isUnavailable ? " (ناموجود)" : ""}`}
                      >
                        {content}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={opt.asin || opt.label} className={liClass} data-asin={opt.asin} role="radio" aria-checked={isSelected} aria-label={opt.label}>
                    <div
                      className={cn(
                        wrapperClass,
                        isCurrentAsin && "ring-1 ring-[#007185]/50 rounded-md cursor-default"
                      )}
                      aria-current={isSelected ? "true" : undefined}
                      aria-label={`${opt.label} — انتخاب شده`}
                    >
                      {content}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
