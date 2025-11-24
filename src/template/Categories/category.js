import React from "react";
import Image from "next/image";

export default function AmazonSection() {
  return (
    <div className="">
      <div className="w-full container relative">
        <h2 className="text-gray-700 text-3xl text-center mb-8">دسته بندی </h2>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {[1, 2, 3, 5, 5, 5, 5, 8].map((i) => (
          <div className="relative aspect-square">
            <Image
              src="/image/Category/category1.png"
              alt={`محصول بازدید شده شماره `}
              fill
              className="object-cover rounded-md"
              priority={1}
            />
          </div>
        ))}

        {/* Product Slider Box */}
      </div>
    </div>
  );
}
