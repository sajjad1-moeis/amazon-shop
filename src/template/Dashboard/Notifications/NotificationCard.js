"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash, Calendar, Truck, MessageText, DocumentText } from "iconsax-reactjs";
import { Pin } from "lucide-react";

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

const getTypeStyles = (type) => {
  switch (type) {
    case "order":
      return {
        card: "bg-[#E5E8F599] border-primary-300",
        icon: "text-green-600",
        actionBtn:
          "bg-transparent dark:bg-dark-box  border border-primary-700 text-primary-700  hover:bg-gray-50 dark:hover:bg-dark-field",
      };
    case "ticket":
      return {
        card: "border-gray-200 dark:border-dark-stroke bg-transparent dark:bg-dark-box",
        icon: "text-yellow-600",
        actionBtn: "bg-gray-200 dark:bg-dark-field text-gray-700 dark:text-dark-text",
      };
    default:
      return {
        card: "border-gray-200 dark:border-dark-stroke bg-transparent dark:bg-dark-box",
        icon: "text-primary-600",
        actionBtn: "bg-primary-600 text-white border border-primary-600 hover:bg-primary-700",
      };
  }
};

export default function NotificationCard({ notification, onDelete, onPinToggle }) {
  const Icon = getNotificationIcon(notification.type);
  const styles = getTypeStyles(notification.type);

  return (
    <div className={cn("group relative w-full rounded-xl border p-4 ", styles.card)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon size={18} className={styles.icon} variant="Bold" />
          <span className={styles.icon}>{notification.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={18} variant="Bold" />
            <span>{notification.time}</span>
          </div>
          <button onClick={() => onPinToggle(notification.id)} className="text-primary-600">
            <Pin size={18} variant="Bold" />
          </button>
        </div>
      </div>
      {/* Right side (content) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
        {/* Pin */}

        {/* Text content */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-600 dark:text-dark-text">{notification.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500">
            <Trash size={18} />
          </button>
          <Link href={notification.actionUrl}>
            <Button size="sm" variant="outline" className={cn("rounded-lg", styles.actionBtn)}>
              {notification.actionText}
            </Button>
          </Link>
        </div>
      </div>

      {/* Left side (actions) */}
    </div>
  );
}
