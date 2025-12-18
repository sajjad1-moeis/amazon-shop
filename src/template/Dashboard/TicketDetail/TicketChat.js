"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphone, Paperclip, Send2, UserSquare } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function TicketChat({ ticketData, messagesList, message, setMessage, handleSendMessage, sendingMessage = false }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Title */}
      <div className="mb-6 flex-between border-b-2 border-gray-200 pb-4">
        <h2 className="text-lg  text-gray-700 dark:text-white">تاریخچه پیام ها</h2>
        <div class="flex items-center gap-4 text-xs">
          <div className="text-gray-400  flex gap-2">
            <UserSquare variant="Bold" size={20} />
            پاسخ داده شده توسط :
          </div>
          <div className="text-primary-500 -mt-1">علی-پشتیبانی</div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-6 mb-6 max-h-[500px] overflow-y-auto">
        {messagesList.map((msg, index) => {
          const showDate = index === 0 || messagesList[index - 1].date !== msg.date;

          const isUser = msg.sender === "user";

          return (
            <div key={msg.id}>
              {showDate && msg.date && (
                <div className="text-center text-sm text-primary-300 rounded-lg py-1 bg-[#EDEFF761] dark:text-gray-400 mb-4">
                  {msg.date}
                </div>
              )}

              <div className={cn("flex gap-3 flex-row")}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "text-sm font-medium  dark:text-white flex items-center gap-2",
                        isUser ? "text-gray-400" : "text-primary-400"
                      )}
                    >
                      {isUser || <Headphone variant="Bold" />}
                      {msg.senderName}
                    </span>
                  </div>

                  <div class="flex-center gap-2">
                    <p
                      className={cn(
                        " rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300",
                        isUser
                          ? "bg-gray-100 dark:bg-gray-700/50 text-right"
                          : "bg-[#A9B5FB4D] dark:bg-primary-900/20 text-right"
                      )}
                    >
                      {msg.text}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="پیام خود را بنویسید...."
            className="pr-12 pl-4"
            dir="rtl"
          />
          <button
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Paperclip size={20} />
          </button>
        </div>
        <Button type="submit" disabled={sendingMessage || !message.trim()} className="bg-primary-600 hover:bg-primary-700 text-white px-6">
          <Send2 size={20} />
          {sendingMessage ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </form>
    </div>
  );
}
