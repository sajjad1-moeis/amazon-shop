"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

/** آدرس پایه برای تصاویر (origin سرور API) تا مسیرهای نسبی درست لود شوند */
const getImageBaseUrl = () => {
  if (typeof process === "undefined") return "https://micrls.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://micrls.com/api";
  try {
    return new URL(apiUrl).origin;
  } catch {
    return "https://micrls.com";
  }
};

export default function ImageUploadSection({ featuredImage, currentImageUrl, onFileChange, isEdit = false }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const imageBaseUrl = useMemo(getImageBaseUrl, []);

  useEffect(() => {
    if (featuredImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(featuredImage);
    } else {
      setPreviewUrl(null);
    }
  }, [featuredImage]);

  const getImageUrl = (url) => {
    if (!url || typeof url !== "string") return null;
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${imageBaseUrl}${path}`;
  };

  const displayImage = previewUrl || (isEdit && currentImageUrl ? getImageUrl(currentImageUrl) : null);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-700/60">
        تصویر شاخص
      </h3>
      <div className="space-y-4">
        {displayImage ? (
          <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-700/60">
            <Image
              src={displayImage}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
            {featuredImage && (
              <div className="absolute top-2 right-2 bg-green-500/80 text-white text-xs px-2 py-1 rounded">
                تصویر جدید
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800/50 border border-gray-700/60 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm">هیچ تصویری انتخاب نشده</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4">
          <input type="file" id="featuredImage" accept="image/*" onChange={onFileChange} className="hidden" />
          <label
            htmlFor="featuredImage"
            className="cursor-pointer bg-gray-700/80 hover:bg-gray-600 text-white text-sm px-4 py-2.5 rounded-xl transition-colors"
          >
            {featuredImage ? "تغییر تصویر" : displayImage ? "جایگزین تصویر" : "انتخاب تصویر"}
          </label>
          {featuredImage && (
            <span className="text-gray-400 text-sm">{featuredImage.name}</span>
          )}
        </div>
      </div>
    </div>
  );
}
