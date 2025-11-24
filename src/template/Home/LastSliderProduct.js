import React from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

function LastSliderProduct() {
  return (
    <div className="container mb-22">
      <div className="mt-22 categories relative border-2 border-primary-600 bg-primary-50 rounded-2xl overflow-hidden">
        {/* --- Header Section --- */}
        <div className="bg-primary-600 p-4 flex-between">
          <p className="text-2xl text-white">پرینتر های سه بعدی</p>

          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative  rounded-md">
                <Image
                  src="/image/Home/lastSlider.png"
                  width={150}
                  height={30}
                  alt={`three-d-printer-banner-${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Product Cards --- */}
        <div className="grid grid-cols-4 gap-5 p-4">
          {[...Array(4)].map((_, i) => (
            <ProductCard key={i} className="bg-white border-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LastSliderProduct;
