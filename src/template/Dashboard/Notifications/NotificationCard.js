"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash, Calendar, Truck, MessageText, DocumentText } from "iconsax-reactjs";
import { Pin } from "lucide-react";

/* =======================
  Notification Config
======================= */

const NOTIFICATION_CONFIG = {
  order: {
    icon: Truck,
    colors: {
      card: "bg-[#E5E8F599] border-primary-300 dark:bg-dark-gray-primary",
      title: "text-green-600 dark:text-green-300",
      actionBtn:
        "bg-transparent border-2 border-primary-700 text-primary-700 hover:bg-gray-50 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-dark-field",
    },
  },
  ticket: {
    icon: MessageText,
    colors: {
      card: "bg-transparent border-gray-200 dark:bg-dark-field dark:border-dark-box",
      title: "text-yellow-600 dark:text-yellow-400",
      icon: "text-yellow-600",
      actionBtn: "bg-gray-200 text-gray-700 border-0 dark:bg-dark-stroke dark:text-dark-titre",
    },
  },
  default: {
    icon: DocumentText,
    colors: {
      card: "bg-transparent border-gray-200 dark:bg-dark-field dark:border-dark-box",
      title: "text-primary-600 dark:text-primary-300",
      actionBtn: "bg-primary-600 text-white border border-primary-600 hover:bg-primary-700",
    },
  },
};

/* =======================
  Helper
======================= */

const getNotificationConfig = (type) => NOTIFICATION_CONFIG[type] || NOTIFICATION_CONFIG.default;

/* =======================
  Component
======================= */

export default function NotificationCard({ notification, onDelete, onPinToggle }) {
  const { icon: Icon, colors } = getNotificationConfig(notification.type);

  const PinBtn = () => (
    <button onClick={() => onPinToggle(notification.id)} className=" text-primary-600 dark:text-primary-300">
      <Pin size={18} />
    </button>
  );

  return (
    <div className={cn("group relative w-full rounded-xl border p-3 sm:p-4", colors.card)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div class="flex-between w-full">
          <div className={cn("flex items-center gap-2", colors.title)}>
            <Icon size={16} className="sm:w-[18px] sm:h-[18px]" variant="Bold" />
            <span className={cn("text-sm sm:text-base", colors.icon)}>{notification.title}</span>
          </div>
          <div class="flex gap-2 ">
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-caption">
              <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" variant="Bold" />
              <span>{notification.time}</span>
            </div>

            <div class="max-md:hidden">
              <PinBtn />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-3 sm:mt-4">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text flex-1">{notification.description}</p>

        <div className="flex items-center gap-4 sm:gap-3">
          <button
            onClick={onDelete}
            className="md:opacity-0 group-hover:opacity-100 transition-opacity text-red-500 flex-shrink-0"
          >
            <Trash size={18} />
          </button>

          <div class="md:hidden flex-center">
            <PinBtn />
          </div>
          <Link href={notification.actionUrl} className=" max-md:w-full">
            <Button
              size="sm"
              variant="outline"
              className={cn("rounded-lg text-xs sm:text-sm w-full", colors.actionBtn)}
            >
              {notification.actionText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
