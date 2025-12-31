"use client";

import React from "react";
import { cn } from "@/lib/utils";
import ViewAllTable from "@/components/ViewAllTable";

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
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mb-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg text-gray-700 dark:text-dark-titre mb-2">دوستان دعوت شده</h3>
      </div>

      {/* Desktop Table */}
      <div className="block overflow-auto border border-gray-200 dark:border-dark-stroke rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-dark-stroke text-gray-500 dark:text-dark-text">
            <tr className="border-b border-gray-200 dark:border-dark-stroke">
              <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin first:rounded-tr-lg">نام</th>
              <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin">تاریخ عضویت</th>
              <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin">وضعیت ثبت نام</th>
              <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin">وضعیت اولین خرید</th>
              <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin last:rounded-tl-lg">پاداش</th>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend, index) => (
              <tr
                key={friend.id}
                className={cn(
                  "border-b border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-dark-field/50 transition-colors",
                  index === friends.length - 1 && "last:border-b-0"
                )}
              >
                <td
                  className={cn(
                    "py-4 whitespace-nowrap px-4 text-sm text-gray-900 dark:text-dark-titre",
                    index === friends.length - 1 && "first:rounded-br-lg"
                  )}
                >
                  {friend.name}
                </td>
                <td className="py-4 whitespace-nowrap px-4 text-sm text-gray-600 dark:text-dark-text">
                  {friend.membershipDate}
                </td>
                <td className="py-4 whitespace-nowrap px-4">{getRegistrationStatusBadge(friend.registrationStatus)}</td>
                <td className="py-4 whitespace-nowrap px-4">{getPurchaseStatusBadge(friend.purchaseStatus)}</td>
                <td
                  className={cn(
                    "py-4 whitespace-nowrap px-4 text-sm text-gray-900 dark:text-dark-titre",
                    index === friends.length - 1 && "last:rounded-bl-lg"
                  )}
                >
                  {friend.reward || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViewAllTable />
    </div>
  );
}
