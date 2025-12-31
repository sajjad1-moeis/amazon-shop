"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Calendar, MessageText1, Headphone } from "iconsax-reactjs";
import Image from "next/image";
import { Star } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

export default function CommentCard({ comment, onDelete, onEdit }) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="bg-white border dark:bg-dark-box dark:border-0 border-gray-200 rounded-xl shadow-sm p-3 sm:p-4 relative">
      <div className="space-y-4 sm:space-y-5">
        {/* Product Information */}
        <div className="flex-between max-md:border-b max-md:pb-4 border-gray-200 dark:border-dark-stroke gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <div className="relative aspect-square w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <Image src="/image/Home/product.png" alt="تصویر محصول" fill className="object-cover rounded-xl" />
            </div>
            <h4 className="text-xs sm:text-sm text-neutral-800 dark:text-dark-titre line-clamp-2 flex-1 min-w-0">
              {comment.productTitle}
            </h4>
            <Link
              href="#"
              className="text-xs max-md:hidden sm:text-sm text-yellow-600 dark:text-yellow-400 hover:underline whitespace-nowrap flex-shrink-0"
            >
              مشاهده محصول
            </Link>
          </div>
          <div className="flex-shrink-0">
            <StatusBadge status={comment.status} padding="medium" />
          </div>
        </div>

        {/* Review Text */}
        <div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-dark-titre mb-2 sm:mb-3">
            <MessageText1 size={18} className="sm:w-[22px] sm:h-[22px]" />
            <label className="text-xs sm:text-sm">متن نظر</label>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text leading-relaxed flex-1">
              {comment.comment}
            </p>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star size={18} className="sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text">{comment.rating}</span>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="pb-3 sm:pb-4 border-b border-gray-200 dark:border-dark-stroke">
          <div className="flex-between gap-2 sm:gap-4 mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <Headphone
                size={18}
                className="sm:w-[22px] sm:h-[22px] text-gray-600 dark:text-dark-text"
                variant="Outline"
              />
              <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-dark-text">
                پاسخ ها{" "}
                <span className="text-primary-400 dark:text-primary-300 mr-2 sm:mr-3">
                  {comment.replies && comment.replies.length > 0 ? `${comment.replies.length} پاسخ` : ""}
                </span>
              </label>
            </div>
            {comment.replies.length ? (
              <Link
                href="#"
                className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400 hover:underline whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  setShowReplies(!showReplies);
                }}
              >
                مشاهده پاسخ ها
              </Link>
            ) : null}
          </div>

          {comment.replies && comment.replies.length > 0 ? (
            <div className="space-y-2 sm:space-y-3">
              {/* Show first reply */}
              <div className="bg-[#E5E8F599] dark:bg-dark-blue dark:text-primary-300 dark:border-0 border border-primary-200 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-primary-500">
                {comment.replies[0].text}
              </div>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-primary-300 dark:text-dark-text">پاسخی برای این نظر ثبت نشده</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 dark:text-caption">
            <Calendar size={18} className="sm:w-[22px] sm:h-[22px]" variant="Bold" />
            <span>
              تاریخ ثبت نظر : <span className="text-gray-500 dark:text-dark-text">{comment.date}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-row-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="gap-1 max-md:w-full sm:gap-2 border-red-600 dark:text-red-400 dark:border-red-400 text-red-600 border-2 rounded-lg px-3 sm:px-6 md:px-10 text-xs sm:text-sm"
            >
              <Trash size={16} className="sm:w-[22px] sm:h-[22px]" />
              حذف
            </Button>
            {comment.status === "pending" && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="gap-1 max-md:w-full sm:gap-2 border-primary-700 dark:border-primary-300 dark:text-primary-300 text-primary-700 border-2 rounded-lg px-3 sm:px-6 md:px-10 text-xs sm:text-sm"
              >
                <Edit size={16} className="sm:w-[22px] sm:h-[22px]" />
                ویرایش
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
