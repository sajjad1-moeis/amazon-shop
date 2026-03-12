import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HOMEPAGE_IMAGES } from "@/config/homepageImages";

/**
 * بنرهای صفحه اول — مسیرها و لینک‌ها از config/homepageImages
 */
function ImagesSection() {
  const banners = HOMEPAGE_IMAGES.banners;
  return (
    <div className="container mt-14 md:mt-22">
      <div dir="ltr" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {banners.map((item, i) => {
          const src = typeof item === "string" ? item : item.src;
          const href = typeof item === "string" ? null : item.href;
          const img = (
            <Image
              src={src}
              alt={`بنر ${i + 1}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          );
          return (
            <div key={i} className="relative rounded-2xl overflow-hidden group">
              {href ? (
                <Link href={href} className="block">
                  {img}
                </Link>
              ) : (
                img
              )}
              {/* افکت محو شدنگی پایین بنر */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/60 dark:via-black/20 opacity-90 group-hover:opacity-70 transition-opacity pointer-events-none rounded-b-2xl"
                aria-hidden
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImagesSection;
