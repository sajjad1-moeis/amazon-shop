import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

function AboutServiceCard({ title, desc, src, className }) {
  return (
    <div className={cn("grid grid-cols-3 mt-28 items-center", className)}>
      <div>
        <div className="relative aspect-square max-h-[300px] w-full h-full">
          <Image src={src} alt={`درخواست محصول از تیکت`} fill className="object-cover rounded-xl" />
        </div>
      </div>
      <div class="md:col-span-2 p-10">
        <div className="mb-4">
          <h2 className="text-3xl  text-primary-700 mb-2 text-right flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-400 rounded"></div>
            {title}
          </h2>
        </div>
        <div class="text-gray-600 text-justify leading-8">{desc}</div>
      </div>
    </div>
  );
}

export default AboutServiceCard;
