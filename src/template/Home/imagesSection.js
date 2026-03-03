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
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          );
          return (
            <div key={i} className="relative rounded-2xl overflow-hidden">
              {href ? (
                <Link href={href} className="block">
                  {img}
                </Link>
              ) : (
                img
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImagesSection;
