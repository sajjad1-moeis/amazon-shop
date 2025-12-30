"use client";

import React, { useRef, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Add, CloseCircle, DocumentUpload, Image as ImageIcon } from "iconsax-reactjs";

export default function FileUploadSection({ images, invoice, onImagesChange, onInvoiceChange }) {
  const imageInputRef = useRef(null);
  const invoiceInputRef = useRef(null);
  const [imageUrls, setImageUrls] = useState([]);

  // Create object URLs for image previews
  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setImageUrls(urls);

    // Cleanup function to revoke object URLs
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    onImagesChange([...images, ...files]);
  };

  const handleInvoiceUpload = (e) => {
    if (e.target.files[0]) {
      onInvoiceChange(e.target.files[0]);
    }
  };

  const handleRemoveImage = (index) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const handleRemoveInvoice = () => {
    onInvoiceChange(null);
  };

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      <h3 className="text-lg  text-gray-700 dark:text-dark-title mb-6">مدارک و تصاویر</h3>

      <div className="space-y-6">
        {/* Image/Video Upload */}
        <div className="space-y-2">
          <Label className="text-sm">آپلود فیلم یا تصاویر</Label>
          <div className="space-y-3">
            {/* Upload Button */}
            <div
              onClick={() => imageInputRef.current?.click()}
              className="border bg-gray-50 dark:bg-dark-field border-gray-200 dark:border-dark-stroke rounded-lg p-5 text-center cursor-pointer hover:border-gray-400 dark:hover:border-dark-stroke transition-colors"
            >
              <Add size={32} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-dark-text">برای آپلود کلیک کنید</p>
              <input
                ref={imageInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Preview Images */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-square bg-gray-100 dark:bg-dark-field rounded-lg overflow-hidden">
                      {file.type?.startsWith("image/") && imageUrls[index] ? (
                        <img
                          src={imageUrls[index]}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={32} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <CloseCircle size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Invoice Upload */}
        <div className="space-y-2">
          <Label className="text-sm">آپلود فاکتور (اختیاری)</Label>
          <div
            onClick={() => invoiceInputRef.current?.click()}
            className="border bg-gray-50 dark:bg-dark-field border-gray-200 dark:border-dark-stroke rounded-lg p-5 text-center cursor-pointer hover:border-gray-400 dark:hover:border-dark-stroke transition-colors"
          >
            {invoice ? (
              <div className="space-y-2">
                <DocumentUpload size={32} className="mx-auto mb-2 text-green-500" />
                <p className="text-sm text-gray-900 dark:text-dark-title font-medium">{invoice.name}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveInvoice();
                  }}
                  className="mt-2 dark:border-dark-stroke dark:text-dark-text dark:hover:bg-dark-field"
                >
                  حذف
                </Button>
              </div>
            ) : (
              <>
                <Add size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-dark-text">برای آپلود کلیک کنید</p>
              </>
            )}
            <input
              ref={invoiceInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleInvoiceUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
