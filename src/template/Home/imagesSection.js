import Image from "next/image";
import Link from "next/link";
import React from "react";

function ImagesSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-14 md:mt-22 container ">
      <Link href="/products?category=digital" className="relative group block">
        <div className="w-full rounded-2xl overflow-hidden relative">
          <Image
            src="/image/Home/category.png"
            alt="کالای دیجیتال"
            width={1200}
            height={800}
            className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-95"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl" aria-hidden />
        </div>
      </Link>
      <Link href="/products?category=fashion" className="group block">
        <div className="w-full rounded-2xl overflow-hidden relative">
          <Image
            src="/image/Home/category.png"
            alt="مد و پوشاک"
            width={1200}
            height={800}
            className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-95"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl" aria-hidden />
        </div>
      </Link>
    </div>
  );
}

export default ImagesSection;
