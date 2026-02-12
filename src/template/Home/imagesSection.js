import Image from "next/image";
import Link from "next/link";
import React from "react";

function ImagesSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-14 md:mt-22 container ">
      <Link href="/products?featured=true" className="relative group">
        <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/image/Home/image1.png"
            alt="بنر تبلیغاتی ۱"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
      <Link href="/products?new=true" className="relative group">
        <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/image/Home/image1.png"
            alt="بنر تبلیغاتی ۲"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
    </div>
  );
}

export default ImagesSection;
