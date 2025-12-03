import React from "react";
import Image from "next/image";

export default function AmazonSection() {
  return (
    <div className="">
      <div className="w-full container relative">
        <h2 className="text-gray-700 dark:text-dark-title text-lg md:text-3xl text-center mb-4 md:mb-8">دسته بندی </h2>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
        {[1, 2, 3, 5, 5, 5, 5, 8].map((i) => (
          <div className="relative aspect-square max-md:h-32 w-full">
            <Image
              src="/image/Category/category1.png"
              alt={`محصول بازدید شده شماره `}
              fill
              className=" rounded-md w-full"
              priority={1}
            />
          </div>
        ))}

        {/* Product Slider Box */}
      </div>
    </div>
  );
}
