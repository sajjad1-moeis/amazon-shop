"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Camera } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";

/**
 * @param {string} image - URL پیش‌نمایش (object URL یا آدرس سرور)
 * @param {((previewUrl: string, file: File | null) => void)} onImageChange - (پیش‌نمایش، فایل برای آپلود)
 */
export default function ProfileImageUpload({ image, onImageChange }) {
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    const previewUrl = URL.createObjectURL(file);
    objectUrlRef.current = previewUrl;
    if (onImageChange) onImageChange(previewUrl, file);
  };

  const handleRemove = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    if (onImageChange) onImageChange("", null);
  };

  return (
    <div className="flex flex-col items-center gap-4 relative">
      {/* Profile Image - Square */}
      <div className="relative">
        <div
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-stroke cursor-pointer hover:border-primary-500 transition-colors"
          onClick={handleImageClick}
        >
          {image ? (
            <Image
              src={image}
              alt="Profile"
              fill
              className="object-cover"
              sizes="160px"
              unoptimized={image.startsWith("blob:")}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-dark-field flex items-center justify-center">
              <span className="text-gray-400 dark:text-dark-text text-4xl">👤</span>
            </div>
          )}
        </div>
      </div>

      {/* Change Profile Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleImageClick}
        className="gap-2 absolute bottom-3 bg-gray-100 dark:bg-dark-field hover:bg-gray-200 dark:hover:bg-dark-field/80 border-gray-200 dark:border-dark-stroke"
      >
        <Camera size={18} />
        تغییر پروفایل
      </Button>

      {/* Hidden File Input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  );
}

