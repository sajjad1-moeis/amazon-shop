"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Camera, Trash } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";

export default function ProfileImageUpload({ image, onImageChange }) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (onImageChange) {
          onImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    if (onImageChange) {
      onImageChange("");
    }
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
            <Image src={image} alt="Profile" fill className="object-cover" sizes="160px" />
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
