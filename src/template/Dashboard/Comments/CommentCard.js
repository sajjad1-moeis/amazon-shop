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
    <div className="bg-white border dark:bg-dark-box dark:border-0 border-gray-200 rounded-xl shadow-sm p-3 relative">
      {/* Status Badge - Top Left */}

      <div className="space-y-5">
        {/* Product Information */}
        <div class="flex-between">
          <div className="flex-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative aspect-square size-10">
                <Image src="/image/Home/product.png" alt="تصویر محصول" fill className="object-cover rounded-xl " />
              </div>
              <h4 className="text-sm text-neutral-800 dark:text-dark-titre">{comment.productTitle}</h4>
            </div>
            <Link href="#" className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline whitespace-nowrap">
              مشاهده محصول
            </Link>
          </div>
          <div>
            <StatusBadge status={comment.status} padding="medium" />
          </div>
        </div>

        {/* Review Text */}
        <div>
          <div class="flex gap-2 text-gray-700 dark:text-dark-titre mb-3">
            <MessageText1 size={22} />
            <label className=" b-2 block">متن نظر</label>
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
                <span className="text-primary-400 dark:text-primary-300 mr-3">
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
              <div className="bg-[#E5E8F599] dark:bg-dark-blue dark:text-primary-300 dark:border-0 border border-primary-200 rounded-lg p-3 text-sm text-primary-500 ">
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
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-caption ">
            <Calendar size={22} variant="Bold" />
            <span>
              تاریخ ثبت نظر : <span className="text-gray-500 dark:text-dark-text">{comment.date}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 flex-row-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="gap-2 border-red-600 dark:text-red-400 dark:border-red-400 text-red-600 border-2 rounded-lg px-10"
            >
              <Trash size={22} />
              حذف
            </Button>
            {comment.status === "pending" && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="gap-2 border-primary-700 dark:border-primary-300 dark:text-primary-300 text-primary-700 border-2 rounded-lg px-10"
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
