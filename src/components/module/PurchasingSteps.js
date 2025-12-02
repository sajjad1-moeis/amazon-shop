import { purchasingSteps } from "@/data";
import Image from "next/image";
import React from "react";

function PurchasingSteps({ title = "مراحل خرید" }) {
  return (
    <div class="container my-14 md:my-28">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-primary-700 mb-2 text-right flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-400 rounded"></div>
          {title}
        </h2>
      </div>
      <div className=" relative ">
        <img
          src="/image/StepPurshing/stepsBorder.png"
          alt={`محصول بازدید شده شماره `}
          fill
          className=" rounded-md absolute max-lg:hidden w-3/4 h-1/2 lg:h-[130%] inset-x-0 mx-auto top-1/2 max-lg:-translate-y-1/2 lg:-top-8  z-0 "
        />
        <img
          src="/image/StepPurshing/stepsBorderMd.png"
          alt={`محصول بازدید شده شماره `}
          fill
          className=" rounded-md absolute max-md:hidden lg:hidden w-2/4 h-3/4 inset-x-0 mx-auto -bottom-8  lg:-top-8  z-0 "
        />

        <div class="z-50 grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative">
          {purchasingSteps.map((brand, idx) => (
            <div
              style={{ boxShadow: "0px 1px 48px 0px #0000000F" }}
              key={brand.id}
              className={`bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all flex flex-col h-max ${
                idx % 2 == 1 ? "md:mt-16" : ""
              }`}
            >
              <div className="relative aspect-square max-h-40">
                <Image
                  src={`/image/StepPurshing/${brand.logo}`}
                  alt={`محصول بازدید شده شماره `}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <p className=" md:text-lg my-3 rounded-lg text-primary-700 ">{brand.title}</p>
              <p className=" text-xs md:text-sm  rounded-lg text-gray-500">{brand.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PurchasingSteps;
