import IndexLayout from "@/layout/IndexLayout";
import BestSellingGadgets from "@/template/Categories/BestSellingGadgets";
import BiggestDiscounts from "@/template/Categories/BiggestDiscounts";
import Category from "@/template/Categories/category";
import MicroLessDescription from "@/template/Categories/MicroLessDescription";
import Image from "next/image";
import React from "react";

function Page() {
  return (
    <IndexLayout>
      <Image
        src="/image/Category/categoryLogo.png"
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
      />
      <div
        className="bg-[#FBFBFB] container rounded-[32px] relative  -mt-[10%] p-6 mb-22"
        style={{ boxShadow: "0px 0px 20px 0px #00000029" }}
      >
        <Category />
        <BestSellingGadgets />
        <BiggestDiscounts />
        <MicroLessDescription />
      </div>
    </IndexLayout>
  );
}

export default Page;
