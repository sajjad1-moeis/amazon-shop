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
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-400">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-white"
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700"
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

