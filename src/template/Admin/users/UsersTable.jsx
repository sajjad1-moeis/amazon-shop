"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../TableActions";

export default function UsersTable({ users }) {
  const router = useRouter();

  if (users.length === 0) {
    return <div className="p-8 text-center text-gray-400">کاربری یافت نشد</div>;
  }

  const handleView = (userId) => {
    router.push(`/admin/users/${userId}`);
  };

  const handleEdit = (userId) => {
    router.push(`/admin/users/${userId}?edit=true`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام و نام خانوادگی</TableHead>
          <TableHead className="text-gray-300">ایمیل</TableHead>
          <TableHead className="text-gray-300">شماره تماس</TableHead>
          <TableHead className="text-gray-300">نقش</TableHead>
          <TableHead className="text-gray-300">تعداد سفارشات</TableHead>
          <TableHead className="text-gray-300">مجموع خرید</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">
              {user.fullName || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "-")}
            </TableCell>
            <TableCell className="text-gray-300">{user.email || "-"}</TableCell>
            <TableCell className="text-gray-300">{user.phoneNumber || "-"}</TableCell>
            <TableCell>
              {user.roles && user.roles.length > 0 ? (
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {user.roles[0]}
                </Badge>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </TableCell>
            <TableCell className="text-gray-300">{user.totalOrders || 0}</TableCell>
            <TableCell className="text-gray-300">
              {user.totalSpent ? `${Number(user.totalSpent).toLocaleString("fa-IR")} ریال` : "0 ریال"}
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
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
                {user.isBanned && (
                  <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                    بن شده
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <TableActions onView={() => handleView(user.id)} onEdit={() => handleEdit(user.id)} showDelete={false} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
