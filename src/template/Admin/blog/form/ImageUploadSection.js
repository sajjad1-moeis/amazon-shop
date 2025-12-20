"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function ImageUploadSection({ featuredImage, currentImageUrl, onFileChange, isEdit = false }) {
  const [previewUrl, setPreviewUrl] = useState(null);

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
    if (!url) return null;
    return url.startsWith("http") ? url : `https://micrls.com${url}`;
  };

  const displayImage = previewUrl || (isEdit && currentImageUrl ? getImageUrl(currentImageUrl) : null);

  return (
    <div className="space-y-2">
      <Label htmlFor="featuredImage" className="text-gray-300">
        تصویر شاخص
      </Label>
      <div className="space-y-4">
        {displayImage ? (
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-700">
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
          <div className="bg-gray-800 border border-gray-700 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">هیچ تصویری انتخاب نشده</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4">
          <input type="file" id="featuredImage" accept="image/*" onChange={onFileChange} className="hidden" />
          <label
            htmlFor="featuredImage"
            className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
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
