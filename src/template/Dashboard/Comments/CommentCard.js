"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Trash2, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommentCard({ comment, onDelete }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            تایید شده
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            در انتظار تایید
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            رد شده
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Product Image */}
        <div className="relative w-full md:w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={comment.productImage}
            alt={comment.productTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 128px"
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          {/* Product Title */}
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
            {comment.productTitle}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < comment.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">({comment.rating}/5)</span>
          </div>

          {/* Comment Text */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{comment.comment}</p>

          {/* Status and Date */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              {getStatusBadge(comment.status)}
              <span className="text-xs text-gray-500 dark:text-gray-400">تاریخ: {comment.date}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit2 className="h-4 w-4" />
                ویرایش
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDelete}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
                حذف
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

