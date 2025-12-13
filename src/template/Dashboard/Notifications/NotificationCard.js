"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, Calendar, Truck, MessageText, DocumentText, Bookmark } from "iconsax-reactjs";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getNotificationIcon = (type) => {
  switch (type) {
    case "order":
      return Truck;
    case "ticket":
      return MessageText;
    default:
      return DocumentText;
  }
};

const getIconColor = (type) => {
  switch (type) {
    case "order":
      return "text-green-600 dark:text-green-400";
    case "ticket":
      return "text-yellow-600 dark:text-yellow-400";
    default:
      return "text-blue-600 dark:text-blue-400";
  }
};

export default function NotificationCard({ notification, onDelete, onPinToggle }) {
  const Icon = getNotificationIcon(notification.type);
  const iconColor = getIconColor(notification.type);

  return (
    <div
      className={cn(
        "group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-all",
        notification.isPinned && "bg-blue-50 dark:bg-blue-950/20"
      )}
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <div className="p-4 md:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <Icon size={24} className={cn(iconColor)} variant="Bold" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header with Pin Icon and Time */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar size={14} />
                <span>{notification.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {notification.isPinned && (
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                )}
                {/* Pin Button - Always visible */}
                <button
                  onClick={() => onPinToggle(notification.id)}
                  className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={notification.isPinned ? "حذف سنجاق" : "سنجاق کردن"}
                  title={notification.isPinned ? "حذف سنجاق" : "سنجاق کردن"}
                >
                  <Bookmark
                    size={16}
                    variant={notification.isPinned ? "Bold" : "Outline"}
                    className={notification.isPinned ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}
                  />
                </button>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">
              {notification.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {notification.description}
            </p>

            {/* Action Button and Delete Button */}
            <div className="flex items-center gap-3">
              <Link href={notification.actionUrl}>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 gap-2"
                >
                  {notification.actionText}
                </Button>
              </Link>

              {/* Delete Button - Only visible on hover */}
              <button
                onClick={onDelete}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                aria-label="حذف اعلان"
                title="حذف اعلان"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
