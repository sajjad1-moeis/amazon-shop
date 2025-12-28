"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Game, Star1, Trash, Edit, MessageText, Calendar } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function CommentCard({ comment, onDelete, onEdit }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            تأیید شده
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            رد شده
          </span>
        );
      default:
        return null;
    }
  };

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <Star1
                key={i}
                size={20}
                className="text-yellow-400"
                variant="Bold"
              />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative h-5 w-5">
                <Star1 size={20} className="text-gray-300 absolute" variant="Outline" />
                <Star1
                  size={20}
                  className="text-yellow-400 absolute"
                  variant="Bold"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              </div>
            );
          } else {
            return (
              <Star1 key={i} size={20} className="text-gray-300" variant="Outline" />
            );
          }
        })}
        <span className="text-sm font-medium text-gray-700 dark:text-dark-text mr-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6 relative">
      {/* Status Badge - Top Left */}
      <div className="absolute top-4 left-4">
        {getStatusBadge(comment.status)}
      </div>

      <div className="space-y-5 pt-8">
        {/* Product Information */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Game size={20} className="text-gray-600 dark:text-dark-text" variant="Outline" />
            <h4 className="text-base font-semibold text-gray-900 dark:text-dark-title">
              {comment.productTitle}
            </h4>
          </div>
          <Link
            href="#"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
          >
            مشاهده محصول
          </Link>
        </div>

        {/* Rating */}
        <div>{renderRating(comment.rating)}</div>

        {/* Review Text */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-dark-text mb-2 block">
            متن نظر
          </label>
          <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">{comment.comment}</p>
        </div>

        {/* Replies Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageText size={18} className="text-gray-600 dark:text-dark-text" variant="Outline" />
            <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
              پاسخ ها {comment.replies && comment.replies.length > 0 ? `${comment.replies.length} پاسخ` : ""}
            </label>
          </div>

          {comment.replies && comment.replies.length > 0 ? (
            <div className="space-y-3">
              {/* Show first reply */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-sm text-gray-700 dark:text-dark-text">
                {comment.replies[0].text}
              </div>
              <Input
                type="text"
                placeholder="پاسخ خود را بنویسید..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="bg-white dark:bg-dark-field"
              />
              <Link
                href="#"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                onClick={(e) => {
                  e.preventDefault();
                  setShowReplies(!showReplies);
                }}
              >
                مشاهده پاسخ ها
              </Link>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-dark-text">
              پاسخی برای این نظر ثبت نشده
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-row-reverse">
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="gap-2"
          >
            <Trash size={18} />
            حذف
          </Button>
          {comment.status === "pending" && (
            <Button
              variant="default"
              size="sm"
              onClick={onEdit}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit size={18} />
              ویرایش
            </Button>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text pt-3 border-t border-gray-200 dark:border-dark-stroke">
          <Calendar size={16} variant="Outline" />
          <span>تاریخ ثبت نظر : {comment.date}</span>
        </div>
      </div>
    </div>
  );
}

