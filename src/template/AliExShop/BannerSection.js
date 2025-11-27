import Image from "next/image";
import React from "react";

function BannerSection() {
  return (
    <div class="grid grid-cols-2 gap-5 container my-28">
      <div className="relative aspect-square max-h-[250px] w-full">
        <Image
          src="/image/AliEx/banner1.png"
          alt={`محصول بازدید شده شماره `}
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="relative aspect-square max-h-[250px] w-full">
        <Image
          src="/image/AliEx/banner2.png"
          alt={`محصول بازدید شده شماره `}
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}

export default BannerSection;
