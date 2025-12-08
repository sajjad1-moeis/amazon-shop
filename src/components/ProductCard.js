import { TruckFast } from "iconsax-reactjs";
import Image from "next/image";
import React from "react";

function ProductCard({ className }) {
  return (
    <div
      className={`border dark:bg-[#303030] dark:border-[#6774F799] rounded-xl  flex flex-col  ${
        className || "border-gray-200"
      }`}
    >
      {/* <div className="flex text-primary-700 gap-2 w-max p-1.5 rounded-lg items-center border-2 border-primary-500 bg-primary-50">
        <TruckFast />
        <p>ارسال 1 روزه</p>
      </div> */}

      <div className="relative aspect-square">
        <Image src="/image/Home/product.png" alt="تصویر محصول" fill className="object-cover rounded-xl " />
      </div>

      <div className="p-2 lg:p-4 dark:text-dark-titre">
        <p className=" font-medium text-right leading-6 max-lg:text-sm ">
          ساعت مچی مردانه Invicta مدل 0361 سری Reserve کرونوگراف
        </p>

        <div className="flex justify-between items-center  mt-4">
          <span className="font-bold dark:text-dark-titre text-neutral-800 max-lg:text-sm"> 12,450,000 تومان</span>
          <span className="bg-[#D84315] text-white px-1.5 py-1 rounded-lg max-lg:text-xs">19%</span>
        </div>

        <div className="flex-between text-gray-400 dark:text-[#B3B9C466]">
          <p className="text-sm max-lg:text-xs">۱۲,۴۵۰,۰۰۰ تومان</p>
          <p className="text-xs max-lg:hidden">شامل هزینه حمل و گمرک</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
