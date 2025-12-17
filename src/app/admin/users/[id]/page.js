"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { userService } from "@/services/user/userService";
import UserDetailHeader from "@/template/Admin/users/[id]/UserDetailHeader";
import UserInfoSection from "@/template/Admin/users/[id]/UserInfoSection";
import UserStatsSection from "@/template/Admin/users/[id]/UserStatsSection";
import EditUserForm from "@/template/Admin/users/[id]/EditUserForm";
import ChangePasswordDialog from "@/template/Admin/users/[id]/ChangePasswordDialog";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const userId = params?.id;
  const isEdit = searchParams.get("edit") === "true";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(isEdit);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userService.getUserDetailForAdmin(userId);
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        toast.error(response.message || "خطا در دریافت اطلاعات کاربر");
        router.push("/admin/users");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت اطلاعات کاربر");
      console.error("Error fetching user:", error);
      router.push("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const response = await userService.adminUpdateUser(userId, userData);
      if (response.success) {
        toast.success("اطلاعات کاربر با موفقیت به‌روزرسانی شد");
        setEditMode(false);
        fetchUser();
        router.replace(`/admin/users/${userId}`);
      } else {
        toast.error(response.message || "خطا در به‌روزرسانی کاربر");
      }
    } catch (error) {
      toast.error(error.message || "خطا در به‌روزرسانی کاربر");
      console.error("Error updating user:", error);
    }
  };

  const handleChangePassword = async (passwordData) => {
    try {
      const response = await userService.adminChangePassword(userId, passwordData);
      if (response.success) {
        toast.success("رمز عبور کاربر با موفقیت تغییر یافت");
        setShowChangePassword(false);
      } else {
        toast.error(response.message || "خطا در تغییر رمز عبور");
      }
    } catch (error) {
      toast.error(error.message || "خطا در تغییر رمز عبور");
      console.error("Error changing password:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>کاربر یافت نشد</p>
        <Button onClick={() => router.push("/admin/users")} className="mt-4">
          بازگشت به لیست
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="">
        <UserDetailHeader
          user={user}
          editMode={editMode}
          onEdit={() => setEditMode(true)}
          onCancel={() => {
            setEditMode(false);
            router.replace(`/admin/users/${userId}`);
          }}
          onChangePassword={() => setShowChangePassword(true)}
        />

        {editMode ? (
          <EditUserForm user={user} onSubmit={handleUpdateUser} onCancel={() => setEditMode(false)} />
        ) : (
          <>
            <UserInfoSection user={user} />
            <UserStatsSection user={user} />
          </>
        )}
      </div>

      <ChangePasswordDialog
        open={showChangePassword}
        onOpenChange={setShowChangePassword}
        onSubmit={handleChangePassword}
      />
    </div>
  );
}
