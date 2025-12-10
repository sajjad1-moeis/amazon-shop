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
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell className="text-gray-300">{user.email}</TableCell>
            <TableCell className="text-gray-300">{user.phone}</TableCell>
            <TableCell className="text-gray-300">{user.ordersCount}</TableCell>
            <TableCell className="text-gray-300">{user.totalSpent.toLocaleString()} تومان</TableCell>
            <TableCell>
              <Badge variant={user.isActive ? "default" : "secondary"}>
                {user.isActive ? "فعال" : "غیرفعال"}
              </Badge>
            </TableCell>
            <TableCell>
              {user.isVip ? (
                <Badge variant="default" className="bg-yellow-500">VIP</Badge>
              ) : (
                <Badge variant="secondary">عادی</Badge>
              )}
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


