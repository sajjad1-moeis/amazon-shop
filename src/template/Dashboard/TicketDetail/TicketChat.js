"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphone, Paperclip, Send2, UserSquare, CloseCircle, DocumentText } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const API_BASE =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "";

function fullUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) return url;
  const base = (API_BASE || "").replace(/\/$/, "");
  return base ? `${base}${url.startsWith("/") ? url : `/${url}`}` : url;
}

function isImageUrl(url, fileName) {
  const u = (url || "").toLowerCase();
  const n = (fileName || "").toLowerCase();
  return /\.(jpe?g|png|gif|webp|bmp)$/i.test(n) || u.includes("/image") || /\.(jpe?g|png|gif|webp|bmp)(\?|$)/i.test(u);
}

function MessageAttachment({ url, fileName }) {
  const src = fullUrl(url);
  const name = fileName || "فایل";
  const image = isImageUrl(url, fileName);

  if (!src) return null;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-dark-stroke max-w-[280px]">
      {image ? (
        <a href={src} target="_blank" rel="noopener noreferrer" className="block">
          <img src={src} alt={name} className="w-full h-auto max-h-48 object-contain bg-gray-50 dark:bg-dark-field" />
        </a>
      ) : (
        <a
          href={src}
          download={name}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          <DocumentText size={18} />
          <span className="truncate">{name}</span>
        </a>
      )}
    </div>
  );
}

export default function TicketChat({
  ticketData,
  messagesList,
  message,
  setMessage,
  handleSendMessage,
  sendingMessage = false,
  selectedFile = null,
  onFileSelect = () => {},
  onClearFile = () => {},
}) {
  const fileInputRef = useRef(null);
  const previewUrl = useMemo(() => {
    if (selectedFile?.type?.startsWith("image/")) return URL.createObjectURL(selectedFile);
    return null;
  }, [selectedFile]);
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div
      className="bg-white dark:bg-dark-box rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Subject only — توضیحات تیکت به‌صورت اولین پیام در تاریخچه نمایش داده می‌شود */}
      {ticketData?.subject && (
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-dark-stroke">
          <h2 className="text-lg font-medium text-gray-900 dark:text-dark-title">{ticketData.subject}</h2>
        </div>
      )}

      {/* Title */}
      <div className="mb-6 flex-between border-b-2 border-gray-200 dark:border-dark-stroke pb-4">
        <h2 className="text-lg text-gray-700 dark:text-dark-title">تاریخچه پیام‌ها</h2>
        {messagesList.some((m) => m.sender === "support") && (
          <div className="flex items-center gap-4 text-xs">
            <div className="text-gray-400 flex gap-2">
              <UserSquare variant="Bold" size={20} />
              پاسخ داده شده توسط :
            </div>
            <div className="text-primary-500 -mt-1">
              {messagesList.find((m) => m.sender === "support")?.supportName || "پشتیبانی"}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="space-y-6 mb-6 max-h-[500px] overflow-y-auto overflow-x-hidden min-w-0">
        {messagesList.length === 0 && (
          <p className="text-center text-gray-500 dark:text-dark-text py-8">هنوز پیامی در این تیکت ثبت نشده است.</p>
        )}
        {messagesList.map((msg, index) => {
          const showDate = index === 0 || messagesList[index - 1].date !== msg.date;

          const isUser = msg.sender === "user";

          return (
            <div key={msg.id}>
              {showDate && msg.date && (
                <div className="text-center text-sm text-primary-300 rounded-lg py-1 bg-[#EDEFF761] dark:text-dark-text mb-4">
                  {msg.date}
                </div>
              )}

              <div className={cn("flex gap-3 flex-row min-w-0")}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "text-sm font-medium dark:text-dark-title flex items-center gap-2",
                        isUser ? "text-gray-400" : "text-primary-400"
                      )}
                    >
                      {isUser || <Headphone variant="Bold" />}
                      {msg.senderName}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 flex-wrap">
                    <div className="flex flex-col gap-1.5 min-w-0 max-w-full">
                      <p
                        className={cn(
                          "rounded-lg p-3 text-sm text-gray-700 dark:text-dark-text dark:bg-white/5 text-right",
                          "max-w-full break-words break-all whitespace-pre-wrap",
                          isUser
                            ? "bg-gray-100 dark:bg-dark-field/50"
                            : "bg-[#A9B5FB4D] dark:bg-primary-900/20"
                        )}
                      >
                        {msg.text}
                      </p>
                      {msg.attachmentUrl && (
                        <MessageAttachment url={msg.attachmentUrl} fileName={msg.attachmentFileName} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
        {selectedFile && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600 dark:text-dark-text truncate max-w-[200px]" title={selectedFile.name}>
              {selectedFile.name}
            </span>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="پیش‌نمایش"
                className="h-12 w-12 object-cover rounded border border-gray-200 dark:border-dark-stroke"
              />
            )}
            <button
              type="button"
              onClick={onClearFile}
              className="text-red-500 hover:text-red-600 p-1"
              title="حذف فایل"
            >
              <CloseCircle size={20} />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFileSelect(file);
                e.target.value = "";
              }}
              className="hidden"
              id="ticket-chat-file"
            />
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="پیام خود را بنویسید...."
              className="ps-3 pe-11 min-w-0"
              dir="rtl"
            />
            <label
              htmlFor="ticket-chat-file"
              className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary-600 dark:hover:text-dark-text p-1"
              title="انتخاب تصویر"
            >
              <Paperclip size={20} />
            </label>
          </div>
          <Button
            type="submit"
            disabled={sendingMessage || (!message.trim() && !selectedFile)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 shrink-0"
          >
            <Send2 size={20} />
            {sendingMessage ? "در حال ارسال..." : "ارسال پیام"}
          </Button>
        </div>
      </form>
    </div>
  );
}
