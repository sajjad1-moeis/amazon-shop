"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const getRegistrationStatusBadge = (status) => {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
        تکمیل شده
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
      تکمیل نشده
    </span>
  );
};

const getPurchaseStatusBadge = (status) => {
  if (status === "done") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
        انجام شده
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
      انجام نشده
    </span>
  );
};

export default function InvitedFriendsTable({ friends = [] }) {
  if (friends.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-8 text-center">
        <p className="text-gray-500 dark:text-dark-text">هنوز دوستی را دعوت نکرده‌اید</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-title p-4 border-b border-gray-200 dark:border-dark-stroke">
        دوستان دعوت شده
      </h3>
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-dark-stroke">
          <TableRow className="border-b border-gray-200 dark:border-dark-stroke">
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              نام
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              تاریخ عضویت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              وضعیت ثبت نام
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              وضعیت اولین خرید
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              پاداش
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {friends.map((friend) => (
            <TableRow
              key={friend.id}
              className="border-b border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-field/50"
            >
              <TableCell className="text-right py-4 px-4 text-sm text-gray-900 dark:text-dark-title">
                {friend.name}
              </TableCell>
              <TableCell className="text-right py-4 px-4 text-sm text-gray-600 dark:text-dark-text">
                {friend.membershipDate}
              </TableCell>
              <TableCell className="py-4 px-4">{getRegistrationStatusBadge(friend.registrationStatus)}</TableCell>
              <TableCell className="py-4 px-4">{getPurchaseStatusBadge(friend.purchaseStatus)}</TableCell>
              <TableCell className="text-right py-4 px-4 text-sm text-gray-900 dark:text-dark-title">
                {friend.reward || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
