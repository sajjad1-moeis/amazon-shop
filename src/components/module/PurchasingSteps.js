import { purchasingSteps } from "@/data";
import Image from "next/image";
import React from "react";

function PurchasingSteps({ title = "مراحل خرید" }) {
  return (
    <div class="container my-28">
      <div className="mb-8">
        <h2 className="text-3xl  text-primary-700 mb-2 text-right flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-400 rounded"></div>
          {title}
        </h2>
      </div>
      <div className=" relative ">
        <img
          src="/image/StepPurshing/stepsBorder.png"
          alt={`محصول بازدید شده شماره `}
          fill
          className=" rounded-md absolute w-3/4 h-[130%] inset-x-0 mx-auto -top-8  z-0"
        />

        <div class="z-50 grid grid-cols-4 gap-8 relative">
          {purchasingSteps.map((brand, idx) => (
            <div
              style={{ boxShadow: "0px 1px 48px 0px #0000000F" }}
              key={brand.id}
              className={`bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all flex flex-col h-max ${
                idx % 2 == 1 ? "mt-16" : ""
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

              <p className=" text-lg my-3 rounded-lg text-primary-700 ">{brand.title}</p>
              <p className=" text-sm  rounded-lg text-gray-500">{brand.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PurchasingSteps;
