import Image from "next/image";
import React from "react";

function RecentVisits() {
  return (
    <div>
      <h3 className="md:text-2xl font-semibold text-right mb-6 text-gray-700">بازدید های اخیر شما</h3>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative aspect-square bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <Image
              src="/image/Home/product.png"
              alt={`محصول بازدید شده شماره ${i}`}
              fill
              className="object-cover rounded-md"
              priority={i === 1} // سئو بهتر برای اولین تصویر
            />
          </div>
        ))}
      </div>

      <div className="h-px bg-gray-200 mb-6" />
    </div>
  );
}

export default RecentVisits;
