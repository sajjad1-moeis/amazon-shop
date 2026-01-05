"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDialog({
  open,
  onOpenChange,
  title = "تایید حذف",
  description,
  confirmText = "حذف",
  cancelText = "انصراف",
  onConfirm,
  loading = false,
  variant = "destructive",
  theme = "admin", // "admin" or "dashboard"
}) {
  const isDashboard = theme === "dashboard";

  return (
    <Dialog open={open} onOpenChange={onOpenChange} dir={isDashboard ? "rtl" : undefined}>
      <DialogContent
        className={
          isDashboard
            ? "bg-white dark:bg-dark-box border-gray-200 dark:border-dark-stroke rounded-2xl"
            : "bg-gray-800 border-gray-700 text-white"
        }
      >
        <DialogHeader>
          <DialogTitle className={isDashboard ? "text-gray-900 dark:text-dark-title" : ""}>{title}</DialogTitle>
          <div className="mt-3" />
          <DialogDescription className={isDashboard ? "text-gray-600 dark:text-dark-text" : "text-gray-400"}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={isDashboard ? "flex-row-reverse gap-2" : ""}>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className={
              isDashboard
                ? "text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-dark-title hover:bg-gray-100 dark:hover:bg-dark-field"
                : "text-gray-400 hover:text-white"
            }
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={
              variant === "destructive"
                ? isDashboard
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-red-600 hover:bg-red-700"
                : isDashboard
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700"
            }
          >
            {loading ? "در حال پردازش..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
