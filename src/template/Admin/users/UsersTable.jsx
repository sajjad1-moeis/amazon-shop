"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../TableActions";

export default function UsersTable({ users }) {
  if (users.length === 0) {
    return <div className="p-8 text-center text-gray-400">کاربری یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام و نام خانوادگی</TableHead>
          <TableHead className="text-gray-300">ایمیل</TableHead>
          <TableHead className="text-gray-300">شماره تماس</TableHead>
          <TableHead className="text-gray-300">تعداد سفارشات</TableHead>
          <TableHead className="text-gray-300">مجموع خرید</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">نوع</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.fullName || user.name || "-"}
            </TableCell>
            <TableCell className="text-gray-300">{user.email || "-"}</TableCell>
            <TableCell className="text-gray-300">{user.phoneNumber || user.phone || "-"}</TableCell>
            <TableCell className="text-gray-300">{user.ordersCount || 0}</TableCell>
            <TableCell className="text-gray-300">
              {user.totalSpent ? `${user.totalSpent.toLocaleString()} تومان` : "0 تومان"}
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  user.isActive
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                }
              >
                {user.isActive ? "فعال" : "غیرفعال"}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  user.isVip
                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                }
              >
                {user.isVip ? "VIP" : "عادی"}
              </Badge>
            </TableCell>
            <TableCell>
              <TableActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


