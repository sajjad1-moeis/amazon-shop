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
    <div className="flex items-center gap-4">
      {/* Profile Image */}
      <div className="relative">
        <div
          className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-dark-stroke cursor-pointer hover:border-primary-500 transition-colors"
          onClick={handleImageClick}
        >
          {image ? (
            <Image
              src={image}
              alt="Profile"
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-dark-field flex items-center justify-center">
              <span className="text-gray-400 dark:text-dark-text text-2xl">👤</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 p-2 bg-primary-500 rounded-full cursor-pointer hover:bg-primary-600 transition-colors">
          <Camera size={16} className="text-white" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleImageClick}
          className="gap-2"
        >
          <Camera size={16} />
          تغییر تصویر
        </Button>
        {image && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            className="gap-2 border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash size={16} />
            حذف
          </Button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

