import Image from "next/image";
import Link from "next/link";
import React from "react";

function ImagesSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-14 md:mt-22 container ">
      <Link href="/products?featured=true" className="relative group">
        <div className="w-full rounded-2xl overflow-hidden">
          <Image
            src="/image/Home/image1.png"
            alt="بنر تبلیغاتی ۲"
            width={1200}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
      <Link href="/products?new=true" className="group block">
        <div className="w-full rounded-2xl overflow-hidden">
          <Image
            src="/image/Home/image2.png"
            alt="بنر تبلیغاتی ۲"
            width={1200}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
    </div>
  );
}

export default ImagesSection;
