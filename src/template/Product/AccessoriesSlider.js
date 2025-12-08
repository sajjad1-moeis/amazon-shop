import SliderSection from "@/components/module/SliderSection";
import React from "react";

function AccessoriesSlider() {
  return (
    <SliderSection
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 3 },
      }}
      content={"مشاهده محصولات"}
      title={"لوازم جانبی ساعت هوشمند"}
    />
  );
}

export default AccessoriesSlider;
