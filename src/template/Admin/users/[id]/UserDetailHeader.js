"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Edit, Key } from "iconsax-reactjs";

export default function UserDetailHeader({
  user,
  editMode,
  onEdit,
  onCancel,
  onChangePassword,
}) {
  const router = useRouter();

  const getStatusBadge = () => {
    if (user.isBanned) {
      return (
        <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/40 text-xs font-medium">
          بن شده
        </Badge>
      );
    }
    return user.isActive ? (
      <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-xs font-medium">
        فعال
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-500/40 text-xs font-medium">
        غیرفعال
      </Badge>
    );
  };

  const displayName =
    user.fullName ||
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    user.userName ||
    user.email ||
    "کاربر بدون نام";

  const btnBase =
    "rounded-xl px-4 py-2.5 text-sm font-medium transition-all border shadow-sm hover:shadow";

  return (
    <div className="rounded-2xl border border-gray-600/80 bg-gray-800/40 p-3 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{displayName}</h1>
            {getStatusBadge()}
          </div>
          {user.email && (
            <p className="text-gray-400 text-sm truncate" title={user.email}>
              {user.email}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {editMode ? (
            <Button
              variant="outline"
              onClick={onCancel}
              className={`${btnBase} border-gray-600 text-gray-200 hover:bg-gray-700/60 hover:border-gray-500`}
            >
              انصراف
              <ArrowRight size={18} className="mr-2" />
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={onEdit}
                className={`${btnBase} bg-transparent border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:border-primary-500/40 hover:text-primary-300 hover:shadow-none`}
              >
                ویرایش
                <Edit size={18} className="mr-2" />
              </Button>
              <Button
                variant="outline"
                onClick={onChangePassword}
                className={`${btnBase} bg-transparent border-amber-500/40 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-300 hover:shadow-none`}
              >
                تغییر رمز
                <Key size={18} className="mr-2" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/admin/users")}
                className="rounded-xl px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-700/50"
              >
                <ArrowRight size={18} className="ml-2" />
                بازگشت به لیست
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
