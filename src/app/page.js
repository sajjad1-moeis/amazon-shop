import React from "react";
import AmazonSection from "@/template/Home/ByAmazonSection";
import Categories from "@/template/Home/categories";
import CheapProducts from "@/template/Home/CheapProducts";
import ImagesSection from "@/template/Home/imagesSection";
import FeaturedProductsSlider from "@/template/Home/FeaturedProductsSlider";
import LastSliderProduct from "@/template/Home/LastSliderProduct";
import IndexLayout from "@/layout/IndexLayout";

function Page() {
  return (
    <IndexLayout>
      <AmazonSection />
      <Categories />
      <CheapProducts />
      <ImagesSection />
      <FeaturedProductsSlider />
      <LastSliderProduct />
    </IndexLayout>
  );
}

export default Page;
