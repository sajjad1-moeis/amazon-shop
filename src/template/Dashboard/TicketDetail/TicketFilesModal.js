"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentText } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const API_BASE_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "";

/** نرمال‌سازی آیتم فایل از API (url/fileUrl/downloadUrl و name/fileName) */
function getFileUrl(file) {
  const raw = file?.url ?? file?.fileUrl ?? file?.downloadUrl ?? file?.link ?? "";
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("blob:")) return raw;
  const base = (API_BASE_URL || "").replace(/\/$/, "");
  return base ? `${base}${raw.startsWith("/") ? raw : `/${raw}`}` : raw;
}

function getFileName(file) {
  const name = file?.fileName ?? file?.name ?? file?.title ?? "";
  return name || "فایل";
}

function isImage(file) {
  const type = (file?.contentType ?? file?.type ?? "").toLowerCase();
  const name = getFileName(file).toLowerCase();
  return type.startsWith("image/") || /\.(jpe?g|png|gif|webp|bmp)$/i.test(name);
}

function isPdf(file) {
  const type = (file?.contentType ?? file?.type ?? "").toLowerCase();
  const name = getFileName(file).toLowerCase();
  return type === "application/pdf" || name.endsWith(".pdf");
}

export default function TicketFilesModal({ open, onOpenChange, files = [] }) {
  const list = Array.isArray(files) ? files : [];

  const handleDownload = (file) => {
    const url = getFileUrl(file);
    if (!url) return;
    const name = getFileName(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white dark:bg-dark-box border-gray-200 dark:border-dark-stroke max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-dark-title">
            فایل‌های پیوست تیکت
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 -mx-1 px-1">
          {list.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-dark-text py-8">
              فایلی آپلود نشده است.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {list.map((file, index) => {
                const url = getFileUrl(file);
                const name = getFileName(file);
                const image = isImage(file);
                const pdf = isPdf(file);
                const canPreview = image && url;

                return (
                  <button
                    key={file?.id ?? index}
                    type="button"
                    onClick={() => handleDownload(file)}
                    className={cn(
                      "aspect-square w-full rounded-xl border-2 border-gray-200 dark:border-dark-stroke",
                      "overflow-hidden flex flex-col bg-gray-50 dark:bg-dark-field",
                      "hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md",
                      "transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    )}
                  >
                    <div className="flex-1 min-h-0 flex items-center justify-center p-1 bg-gray-100 dark:bg-dark-field/80">
                      {canPreview ? (
                        <img
                          src={url}
                          alt={name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : pdf ? (
                        <DocumentText
                          size={40}
                          className="text-red-500 dark:text-red-400 shrink-0"
                        />
                      ) : (
                        <DocumentText
                          size={40}
                          className="text-gray-400 dark:text-dark-text shrink-0"
                        />
                      )}
                    </div>
                    <span
                      className="text-xs text-gray-600 dark:text-dark-text truncate px-2 py-1.5 text-center block"
                      title={name}
                    >
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
