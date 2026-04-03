"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TableActions from "../TableActions";

function isPlaceholderEmail(email) {
  const e = (email ?? "").toString().trim().toLowerCase();
  return !e ? false : e.endsWith("@placeholder.local");
}

function getUserNameDisplay(user) {
  const first = (user.firstName ?? user.FirstName ?? "").toString().trim();
  const last = (user.lastName ?? user.LastName ?? "").toString().trim();
  const full = (user.fullName ?? user.FullName ?? "").toString().trim();

  if (full && !isPlaceholderEmail(full)) return full;

  const parts = [first, last].filter(Boolean).filter((p) => !isPlaceholderEmail(p));
  if (parts.length === 0) return "بدون نام";
  return parts.join(" ");
}

function getUserEmailDisplay(user) {
  const email = (user.email ?? user.Email ?? "").toString().trim();
  if (!email) return "بدون ایمیل";
  if (isPlaceholderEmail(email)) return "فاقد ایمیل";
  return email;
}

export default function UsersTable({ users, onStatusChange, statusLoadingId }) {
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
    <div className=" overflow-auto">
      <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300 whitespace-nowrap">نام و نام خانوادگی</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">ایمیل</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">شماره تماس</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">نقش</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">تعداد سفارشات</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">مجموع خرید</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">وضعیت</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="border-gray-700 hover:bg-gray-700/50">
              <TableCell className="text-white font-medium whitespace-nowrap">
              {getUserNameDisplay(user)}
            </TableCell>
              <TableCell className="text-gray-300 whitespace-nowrap">{getUserEmailDisplay(user)}</TableCell>
              <TableCell className="text-gray-300 whitespace-nowrap">{user.phoneNumber || "-"}</TableCell>
              <TableCell className="whitespace-nowrap">
                {user.roles && user.roles.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {user.roles[0]}
                    </Badge>
                    {user.roles.length > 1 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="px-2 py-1 text-[11px] rounded-md border border-gray-600 text-gray-200 hover:bg-gray-700/60 transition-colors"
                          >
                            +{user.roles.length - 1}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          className="w-56 p-3 bg-[#111827] text-gray-100 border border-gray-700 rounded-xl shadow-xl"
                          dir="rtl"
                        >
                          <p className="text-xs text-gray-400 mb-2">نقش‌های کاربر</p>
                          <div className="flex flex-col gap-1">
                            {user.roles.map((role) => (
                              <Badge
                                key={role}
                                variant="outline"
                                className="w-full justify-start bg-gray-800 text-gray-100 border-gray-600 text-xs"
                              >
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell className="text-gray-300 whitespace-nowrap">{user.totalOrders || 0}</TableCell>
              <TableCell className="text-gray-300 whitespace-nowrap">
              {user.totalSpent ? `${Number(user.totalSpent).toLocaleString("fa-IR")} ریال` : "0 ریال"}
            </TableCell>
              <TableCell className="whitespace-nowrap">
              <div className="flex flex-col gap-1">
                {!user.isBanned && onStatusChange && (
                  <div className="flex items-center gap-2">
                    <Switch
                      size="sm"
                      dir="ltr"
                      checked={!!user.isActive}
                      onCheckedChange={(checked) => onStatusChange(user.id, checked)}
                      disabled={statusLoadingId === user.id}
                      className="data-[state=checked]:bg-emerald-600"
                    />
                    <span className="text-xs text-gray-400">{user.isActive ? "فعال" : "غیرفعال"}</span>
                  </div>
                )}
                {user.isBanned && (
                  <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30 text-xs w-max">
                    بن شده
                  </Badge>
                )}
                {!user.isBanned && !onStatusChange && (
                  <Badge
                    variant="outline"
                    className={
                      user.isActive
                        ? "bg-green-500/20 text-green-400 border-green-500/30 w-max"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }
                  >
                    {user.isActive ? "فعال" : "غیرفعال"}
                  </Badge>
                )}
              </div>
            </TableCell>
              <TableCell className="whitespace-nowrap">
                <TableActions
                  onView={() => handleView(user.id)}
                  onEdit={() => handleEdit(user.id)}
                  showDelete={false}
                />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
