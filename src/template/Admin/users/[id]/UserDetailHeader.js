"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Edit, Key } from "iconsax-reactjs";

export default function UserDetailHeader({ user, editMode, onEdit, onCancel, onChangePassword }) {
  const router = useRouter();

  const getStatusBadge = () => {
    if (user.isBanned) {
      return (
        <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
          بن شده
        </Badge>
      );
    }
    return user.isActive ? (
      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
        فعال
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-500/30">
        غیرفعال
      </Badge>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-700">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-white">
            {user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "کاربر بدون نام"}
          </h1>
          {getStatusBadge()}
        </div>
        <p className="text-gray-400">{user.email}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {editMode ? (
          <Button
            className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-3"
            onClick={onCancel}
          >
            انصراف
            <ArrowLeft size={18} />
          </Button>
        ) : (
          <>
            <Button
              onClick={onEdit}
              className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-3"
            >
              <Edit size={18} className="ml-2" />
              ویرایش
            </Button>
            <Button
              onClick={onChangePassword}
              className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-3"
            >
              <Key size={18} className="ml-2" />
              تغییر رمز
            </Button>
            <Button
              className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-3"
              onClick={() => router.push("/admin/users")}
            >
              بازگشت به لیست
              <ArrowLeft size={18} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}


