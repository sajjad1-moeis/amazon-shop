import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

function AboutServiceCard({ title, desc, src, className }) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse max-lg:gap-8 lg:grid lg:grid-cols-3  lg:mt-28 lg:items-center gap-4 md:gap-8 lg:p-10",
        className
      )}
    >
      <div>
        <div className="relative aspect-square max-h-[300px] w-full h-full">
          <Image src={src} alt={`درخواست محصول از تیکت`} fill className="object-cover rounded-xl" />
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl dark:text-dark-title text-primary-700 mb-2 text-right flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-400 dark:bg-dark-title rounded"></div>
            {title}
          </h2>
        </div>
        <div className="text-gray-600 text-justify leading-8 max-lg:text-[14px] dark:text-dark-text">{desc}</div>
      </div>
    </div>
  );
}

export default AboutServiceCard;
