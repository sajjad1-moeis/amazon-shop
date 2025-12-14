"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const getRegistrationStatusBadge = (status) => {
  if (status === "تکمیل شده") {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
      {status}
    </span>
  );
};

const getPurchaseStatusBadge = (status) => {
  if (status === "انجام شده") {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
      {status}
    </span>
  );
};

export default function InvitedFriendsTable({ friends }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">دوستان دعوت شده</h3>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-700/50">
            <TableRow className="border-b border-gray-200 dark:border-gray-700">
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                نام
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                تاریخ عضویت
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                وضعیت ثبت نام
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                وضعیت اولین خرید
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                پاداش
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {friends.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  دوستی دعوت نشده است
                </TableCell>
              </TableRow>
            ) : (
              friends.map((friend, index) => (
                <TableRow
                  key={friend.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    index === friends.length - 1 ? "last:border-b-0" : ""
                  }`}
                >
                  <TableCell className="text-sm text-gray-900 dark:text-white py-4 px-4 font-medium">
                    {friend.name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">
                    {friend.membershipDate}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    {getRegistrationStatusBadge(friend.registrationStatus)}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    {getPurchaseStatusBadge(friend.firstPurchaseStatus)}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900 dark:text-white py-4 px-4">
                    {friend.reward}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}





