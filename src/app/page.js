import React from "react";
import { createMetadata } from "@/utils/metadata";
import AmazonSection from "@/template/Home/ByAmazonSection";
import Categories from "@/template/Home/categories";
import CheapProducts from "@/template/Home/CheapProducts";
import ImagesSection from "@/template/Home/imagesSection";
import FeaturedProductsSlider from "@/template/Home/FeaturedProductsSlider";
import LastSliderProduct from "@/template/Home/LastSliderProduct";
import IndexLayout from "@/layout/IndexLayout";

export async function generateMetadata() {
  return createMetadata({
    title: "میکرولس | خرید مطمئن از آمازون آمریکا و امارات",
    description:
      "میکرولس پلتفرم مطمئن خرید از آمازون آمریکا و امارات با ارسال سریع به ایران، پشتیبانی واقعی و تضمین اصالت کالا. هزاران محصول اصل با بهترین قیمت.",
    keywords: [
      "میکرولس",
      "خرید از آمازون",
      "آمازون آمریکا",
      "آمازون امارات",
      "خرید آنلاین",
      "ارسال به ایران",
      "فروشگاه آنلاین",
    ],
    url: "/",
  });
}

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
