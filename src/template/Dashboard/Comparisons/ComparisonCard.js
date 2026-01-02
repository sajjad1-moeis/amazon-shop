"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Eye } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function ComparisonCard({ comparison, onDelete, onView }) {
  const firstProduct = comparison.products?.[0];
  const secondProduct = comparison.products?.[1];

  return (
    <div className="bg-white dark:bg-dark-box border border-gray-200 dark:border-dark-stroke rounded-xl p-3">
      {/* Header - Category Tag and Title */}
      <div className="mb-5 flex-between">
        <h3 className="text-base  text-gray-800 dark:text-dark-titre">{comparison.title}</h3>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-dark-blue dark:text-primary-300">
            {comparison.category}
          </span>
        </div>
      </div>

      {/* Products Comparison - VS Layout */}
      <div className="flex items-center justify-between gap-3 mb-5">
        {/* First Product */}
        {firstProduct && (
          <div className="flex-1 flex items-center">
            <div className="relative w-full aspect-square max-h-32 bg-gray-100 dark:bg-dark-field rounded-lg overflow-hidden">
              <Image
                src={firstProduct.image || "/image/Home/product.png"}
                alt={firstProduct.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-dark-text text-center line-clamp-2">{firstProduct.title}</p>
          </div>
        )}

        {/* VS Icon */}
        <div className="flex-shrink-0">
          <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.6191 0.272461V0.597656C12.1973 0.673828 11.8779 0.808594 11.6611 1.00195C11.3506 1.28906 11.0752 1.72852 10.835 2.32031L6.67773 12.4629H6.35254L1.8877 2.18848C1.65918 1.66113 1.49805 1.33887 1.4043 1.22168C1.25781 1.04004 1.07617 0.899414 0.859375 0.799805C0.648438 0.694336 0.361328 0.626953 -0.00195312 0.597656V0.272461H4.86719V0.597656C4.31641 0.650391 3.95898 0.744141 3.79492 0.878906C3.63086 1.01367 3.54883 1.18652 3.54883 1.39746C3.54883 1.69043 3.68359 2.14746 3.95312 2.76855L6.98535 9.75586L9.79785 2.85645C10.0732 2.17676 10.2109 1.70508 10.2109 1.44141C10.2109 1.27148 10.126 1.11035 9.95605 0.958008C9.78613 0.799805 9.49902 0.688477 9.09473 0.624023C9.06543 0.618164 9.01562 0.609375 8.94531 0.597656V0.272461H12.6191ZM21.1006 0V4.12207H20.7754C20.6699 3.33105 20.4795 2.70117 20.2041 2.23242C19.9346 1.76367 19.5479 1.3916 19.0439 1.11621C18.54 0.84082 18.0186 0.703125 17.4795 0.703125C16.8701 0.703125 16.3662 0.890625 15.9678 1.26562C15.5693 1.63477 15.3701 2.05664 15.3701 2.53125C15.3701 2.89453 15.4961 3.22559 15.748 3.52441C16.1113 3.96387 16.9756 4.5498 18.3408 5.28223C19.4541 5.87988 20.2129 6.33984 20.6172 6.66211C21.0273 6.97852 21.3408 7.35352 21.5576 7.78711C21.7803 8.2207 21.8916 8.6748 21.8916 9.14941C21.8916 10.0518 21.54 10.8311 20.8369 11.4873C20.1396 12.1377 19.2402 12.4629 18.1387 12.4629C17.793 12.4629 17.4678 12.4365 17.1631 12.3838C16.9814 12.3545 16.6035 12.249 16.0293 12.0674C15.4609 11.8799 15.1006 11.7861 14.9482 11.7861C14.8018 11.7861 14.6846 11.8301 14.5967 11.918C14.5146 12.0059 14.4531 12.1875 14.4121 12.4629H14.0869V8.37598H14.4121C14.5645 9.23145 14.7695 9.87305 15.0273 10.3008C15.2852 10.7227 15.6777 11.0742 16.2051 11.3555C16.7383 11.6367 17.3213 11.7773 17.9541 11.7773C18.6865 11.7773 19.2637 11.584 19.6855 11.1973C20.1133 10.8105 20.3271 10.3535 20.3271 9.82617C20.3271 9.5332 20.2451 9.2373 20.0811 8.93848C19.9229 8.63965 19.6738 8.36133 19.334 8.10352C19.1055 7.92773 18.4814 7.55566 17.4619 6.9873C16.4424 6.41309 15.7158 5.95605 15.2822 5.61621C14.8545 5.27637 14.5293 4.90137 14.3066 4.49121C14.084 4.08105 13.9727 3.62988 13.9727 3.1377C13.9727 2.28223 14.3008 1.54688 14.957 0.931641C15.6133 0.310547 16.4482 0 17.4619 0C18.0947 0 18.7656 0.155273 19.4746 0.46582C19.8027 0.612305 20.0342 0.685547 20.1689 0.685547C20.3213 0.685547 20.4443 0.641602 20.5381 0.553711C20.6377 0.459961 20.7168 0.275391 20.7754 0H21.1006Z"
              fill="#6171C8"
            />
          </svg>
        </div>

        {/* Second Product */}
        {secondProduct && (
          <div className="flex-1 flex items-center">
            <div className="relative w-full aspect-square max-h-32 bg-gray-100 dark:bg-dark-field rounded-lg overflow-hidden">
              <Image
                src={firstProduct.image || "/image/Home/product.png"}
                alt={firstProduct.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-dark-text text-center line-clamp-2">{firstProduct.title}</p>
          </div>
        )}
      </div>

      {/* Info Boxes - Date and Products Count */}
      <div className="grid grid-cols-2 gap-3 mb-5 text-center">
        {/* Save Date */}

        {/* Products Count */}
        <div className="bg-gray-100 dark:bg-dark-field rounded-lg p-2">
          <div className="text-sm font-medium text-gray-900 dark:text-dark-titre">{comparison.productsCount} محصول</div>
          <div className="text-xs text-gray-600 dark:text-caption mt-2">تعداد محصولات</div>
        </div>
        <div className="bg-gray-100 dark:bg-dark-field rounded-lg p-2">
          <div className="text-sm font-medium text-gray-700 dark:text-dark-titre">{comparison.saveDate}</div>
          <div className="text-xs text-gray-600 dark:text-caption mt-2">تاریخ ذخیره</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={onDelete}
          className="text-red-600 flex-1 bg-gray-200 hover:text-red-700 rounded-lg hover:bg-red-50 dark:bg-dark-stroke dark:text-red-400 dark:hover:bg-red-900/20 border-red-300 dark:border-red-800 gap-2"
        >
          حذف
        </Button>
        <Button
          onClick={() => onView?.(comparison.id)}
          className="flex-1 bg-primary-700 dark:bg-dark-primary hover:bg-primary-600 text-white gap-2 rounded-lg"
        >
          مشاهده مقایسه
        </Button>
      </div>
    </div>
  );
}
