"use client";

import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";

export default function GallerySection({ productImages, selectedImage, setSelectedImage, mainImage }) {
  const currentImage = productImages[selectedImage] || productImages[0] || mainImage || "/image/Home/product.png";
  const isFirstImage = selectedImage === 0;

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("لینک صفحه کپی شد");
    } catch {
      toast.error("خطا در کپی کردن لینک");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl  relative">
      {/* Main Image Container */}
      <div className="relative aspect-square rounded-md ">
        <Image
          src={currentImage}
          alt={`محصول - تصویر ${selectedImage + 1}`}
          fill
          className="object-cover rounded-md"
          priority={isFirstImage}
          fetchPriority={isFirstImage ? "high" : "auto"}
        />

        {/* Share Button */}
        <div className="absolute left-4 top-4 z-50">
          <button
            onClick={handleShare}
            type="button"
            className="p-2 bg-white/90 dark:bg-dark-stroke hover:bg-white dark:hover:bg-gray-900 rounded-full transition-colors shadow-md"
          >
            <Share2 className="w-5 h-5 text-gray-600 dark:text-dark-titre" />
          </button>
        </div>

        {/* Thumbnails - Absolute positioned on image */}
        <div className="absolute top-0 right-0 z-50 flex flex-col gap-2">
          {productImages.slice(0, 4).map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative size-10 xl:size-14 rounded-lg xl:rounded-xl overflow-hidden border-2 transition-all bg-white dark:bg-gray-900",
                selectedImage === index
                  ? "border-primary-600 dark:border-blue-400 scale-105"
                  : "border-gray-200 dark:border-gray-700 opacity-80 hover:opacity-100"
              )}
            >
              <Image src={img} alt={`تصویر ${index + 1}`} fill className="object-cover rounded-md" />
            </button>
          ))}

          {/* {productImages.length > 4 && (
            <button className="relative size-10 xl:size-14 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center shadow-md hover:shadow-lg transition-all opacity-80 hover:opacity-100">
              <span className="text-gray-400 dark:text-gray-600 text-2xl">⋯</span>
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
