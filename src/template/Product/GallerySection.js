"use client";

import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function GallerySection({ productImages, selectedImage, setSelectedImage }) {
  return (
    <div className="bg-white  dark:bg-gray-800 rounded-lg relative">
      {/* Share Button */}
      <div className="absolute left-4 top-4 z-50 shadow-lg rounded-full">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Main Image */}
      <div className="mb-4">
        <div className="relative aspect-square">
          <Image
            src="/image/Home/product.png"
            alt={`محصول بازدید شده شماره `}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="space-y-2 absolute flex flex-col top-0 right-0">
        {productImages.slice(0, 4).map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              " relative  size-14 rounded-lg overflow-hidden border-2 transition-colors bg-white dark:bg-gray-900",
              selectedImage === index
                ? "border-primary-600 dark:border-blue-400"
                : "border-gray-100 dark:border-gray-700"
            )}
          >
            <Image src="/image/Home/product.png" alt={`محصول بازدید شده شماره `} fill className="rounded-md " />
          </button>
        ))}

        <button className="w-full aspect-square rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-600 text-2xl">⋯</span>
        </button>
      </div>
    </div>
  );
}
