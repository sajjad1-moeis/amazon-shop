"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../TableActions";

const getReadStatusBadge = (isRead) => {
  if (isRead) {
    return (
      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
        خوانده شده
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
      خوانده نشده
    </Badge>
  );
};

export default function ContactUsTable({ contacts, onView, onMarkAsRead, markAsReadLoading = {} }) {
  if (contacts.length === 0) {
    return <div className="p-8 text-center text-gray-400">درخواستی یافت نشد</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const truncateMessage = (message, maxLength = 100) => {
    if (!message) return "-";
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام و نام خانوادگی</TableHead>
          <TableHead className="text-gray-300">ایمیل</TableHead>
          <TableHead className="text-gray-300">پیام</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ ارسال</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{contact.fullName || "-"}</TableCell>
            <TableCell className="text-gray-300">{contact.email || "-"}</TableCell>
            <TableCell className="text-gray-300 max-w-md">
              <div className="truncate" title={contact.message}>
                {truncateMessage(contact.message)}
              </div>
            </TableCell>
            <TableCell>{getReadStatusBadge(contact.isRead)}</TableCell>
            <TableCell className="text-gray-300">{formatDate(contact.createdAt)}</TableCell>
            <TableCell>
              <TableActions
                onView={() => onView(contact.id)}
                showEdit={false}
                showDelete={false}
                customActions={
                  !contact.isRead && (
                    <button
                      onClick={() => onMarkAsRead(contact.id)}
                      disabled={markAsReadLoading[contact.id]}
                      className="h-8 w-8 flex items-center justify-center text-blue-400 hover:bg-blue-400/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="علامت‌گذاری به عنوان خوانده شده"
                    >
                      {markAsReadLoading[contact.id] ? (
                        <svg
                          className="animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      )}
                    </button>
                  )
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}





