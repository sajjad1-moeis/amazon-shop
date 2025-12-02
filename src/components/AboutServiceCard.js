import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

function AboutServiceCard({ title, desc, src, className }) {
  return (
    <div
      className={cn("flex flex-col-reverse max-lg:gap-8 lg:grid lg:grid-cols-3  lg:mt-28 lg:items-center", className)}
    >
      <div>
        <div className="relative aspect-square max-h-[300px] w-full h-full">
          <Image src={src} alt={`درخواست محصول از تیکت`} fill className="object-cover rounded-xl" />
        </div>
      </div>
      <div class="lg:col-span-2 p-4 lg:p-10">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl  text-primary-700 mb-2 text-right flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-400 rounded"></div>
            {title}
          </h2>
        </div>
        <div class="text-gray-600 text-justify leading-8 max-lg:text-[14px]">{desc}</div>
      </div>
    </div>
  );
}

export default AboutServiceCard;
