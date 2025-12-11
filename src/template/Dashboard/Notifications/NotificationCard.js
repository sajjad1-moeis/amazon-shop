"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, TickCircle, Calendar, Truck, MessageText, DocumentText, Bookmark } from "iconsax-reactjs";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getNotificationIcon = (type) => {
  switch (type) {
    case "order":
      return Truck;
    case "ticket":
      return MessageText;
    default:
      return TickCircle;
  }
};

const getActionButtonStyle = (type) => {
  switch (type) {
    case "order":
      return "bg-blue-600 hover:bg-blue-700 text-white border-blue-600";
    case "ticket":
      return "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    default:
      return "bg-blue-600 hover:bg-blue-700 text-white border-blue-600";
  }
};

export default function NotificationCard({ notification, onDelete }) {
  const Icon = getNotificationIcon(notification.type);

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden",
        !notification.isRead && "border-r-4 border-blue-500"
      )}
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Pinned Banner */}
      {notification.isPinned && (
        <div className="bg-blue-500 dark:bg-blue-600 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark size={16} className="text-white" variant="Bold" />
            <span className="text-xs text-white font-medium">{notification.time}</span>
          </div>
          <Calendar size={14} className="text-white" />
        </div>
      )}

      <div className="p-4 md:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Icon size={24} className="text-blue-600 dark:text-blue-400" variant="Bold" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Header with Time */}
            {!notification.isPinned && (
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar size={14} />
                  <span>{notification.time}</span>
                </div>
              </div>
            )}

            {/* Title */}
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">{notification.title}</h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{notification.description}</p>

            {/* Action Button */}
            <Link href={notification.actionUrl}>
              <Button variant="outline" size="sm" className={cn("gap-2", getActionButtonStyle(notification.type))}>
                {notification.actionText}
              </Button>
            </Link>
          </div>

          {/* Delete Button */}
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-900/20"
            >
              <Trash size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
