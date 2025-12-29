"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Calendar, MessageText1, Headphone } from "iconsax-reactjs";
import Image from "next/image";
import { Star } from "lucide-react";

export default function CommentCard({ comment, onDelete, onEdit }) {
  const [showReplies, setShowReplies] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            تأیید شده
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            رد شده
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 dark:bg-dark-box rounded-xl shadow-sm p-3 relative">
      {/* Status Badge - Top Left */}

      <div className="space-y-5">
        {/* Product Information */}
        <div class="flex-between pb-4 border-b border-gray-200">
          <div className="flex-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative aspect-square size-10">
                <Image src="/image/Home/product.png" alt="تصویر محصول" fill className="object-cover rounded-xl " />
              </div>
              <h4 className="text-sm text-neutral-800 dark:text-dark-title">{comment.productTitle}</h4>
            </div>
            <Link href="#" className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline whitespace-nowrap">
              مشاهده محصول
            </Link>
          </div>
          <div>{getStatusBadge(comment.status)}</div>
        </div>

        {/* Review Text */}
        <div>
          <div class="flex gap-2 text-gray-700 dark:text-dark-text mb-3">
            <MessageText1 size={22} />
            <label className="text-sm font-bold b-2 block">متن نظر</label>
          </div>
          <div class="flex-between">
            <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">{comment.comment}</p>
            <div className="flex items-center gap-1">
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-dark-text mr-1">{comment.rating}</span>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="pb-4 border-b border-gray-200 dark:border-dark-stroke">
          <div class="flex-between mb-3">
            <div className="flex items-center gap-2 ">
              <Headphone size={22} className="text-gray-600 dark:text-dark-text" variant="Outline" />
              <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                پاسخ ها{" "}
                <span className="text-primary-400 mr-3">
                  {comment.replies && comment.replies.length > 0 ? `${comment.replies.length} پاسخ` : ""}
                </span>
              </label>
            </div>
            {comment.replies.length ? (
              <Link
                href="#"
                className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline block"
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
            <div className="space-y-3">
              {/* Show first reply */}
              <div className="bg-[#E5E8F599] border border-primary-200 dark:bg-blue-900/20 rounded-lg p-3 text-sm text-primary-500 dark:text-dark-text">
                {comment.replies[0].text}
              </div>
            </div>
          ) : (
            <p className="text-sm text-primary-300 dark:text-dark-text">پاسخی برای این نظر ثبت نشده</p>
          )}
        </div>

        {/* Actions */}
        <div class="flex-between">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-dark-text ">
            <Calendar size={22} variant="Bold" />
            <span>
              تاریخ ثبت نظر : <span className="text-gray-500">{comment.date}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 flex-row-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="gap-2 border-red-600 text-red-600 border-2 rounded-lg px-10"
            >
              <Trash size={22} />
              حذف
            </Button>
            {comment.status === "pending" && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="gap-2 border-primary-700 text-primary-700 border-2 rounded-lg px-10"
              >
                <Edit size={22} />
                ویرایش
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
