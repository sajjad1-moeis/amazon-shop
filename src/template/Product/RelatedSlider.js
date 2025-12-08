import SliderSection from "@/components/module/SliderSection";
import React from "react";

function RelatedSlider() {
  return (
    <SliderSection
      className={"px-5"}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 3 },
      }}
      title={"مدل‌های مشابه از Invicta Reserve"}
      content={"مشاهده همه محصولات"}
    />
  );
}

export default RelatedSlider;
