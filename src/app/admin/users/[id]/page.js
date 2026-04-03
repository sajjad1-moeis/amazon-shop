"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { userService } from "@/services/user/userService";
import { unwrapApiData } from "@/services/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { User, Chart2 } from "iconsax-reactjs";
import { AdminSectionCard } from "@/components/admin";
import UserDetailHeader from "@/template/Admin/users/[id]/UserDetailHeader";
import UserInfoSection from "@/template/Admin/users/[id]/UserInfoSection";
import UserStatsSection from "@/template/Admin/users/[id]/UserStatsSection";
import EditUserForm from "@/template/Admin/users/[id]/EditUserForm";
import ChangePasswordDialog from "@/template/Admin/users/[id]/ChangePasswordDialog";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { loading: authLoading } = useAuth();

  const rawId = params?.id;
  const userId = Array.isArray(rawId) ? rawId[0] : rawId;
  const numericId = userId != null ? Number(userId) : NaN;
  const validId = Number.isFinite(numericId) && numericId >= 1;

  const isEdit = searchParams.get("edit") === "true";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(isEdit);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    setEditMode(isEdit);
  }, [isEdit]);

  const exitEditMode = useCallback(() => {
    setEditMode(false);
    if (validId) router.replace(`/admin/users/${numericId}`);
  }, [router, validId, numericId]);

  const fetchUser = useCallback(async () => {
    if (!validId) {
      setUser(null);
      setLoading(false);
      return;
    }
    if (authLoading) return;

    try {
      setLoading(true);
      const res = await userService.getUserDetailForAdmin(numericId);
      const data = unwrapApiData(res);
      const resolvedId = data?.id ?? data?.Id;
      if (data && typeof data === "object" && resolvedId != null) {
        setUser(data);
      } else {
        setUser(null);
        toast.error("کاربر یافت نشد");
        router.push("/admin/users");
      }
    } catch (error) {
      toast.error(error?.message || "خطا در دریافت اطلاعات کاربر");
      router.push("/admin/users");
    } finally {
      setLoading(false);
    }
  }, [authLoading, validId, numericId, router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleUpdateUser = async ({ userData, profileImageFile, removeProfileImage }) => {
    if (!validId) return;
    try {
      const res = await userService.adminUpdateUser(numericId, userData);
      unwrapApiData(res);

      // تصویر جدید همیشه جایگزین قبلی می‌شود و بک‌اند فایل قبلی را حذف می‌کند.
      if (profileImageFile) {
        unwrapApiData(await userService.uploadProfileImage(numericId, profileImageFile));
      } else if (removeProfileImage) {
        unwrapApiData(await userService.deleteProfileImage(numericId));
      }

      toast.success("اطلاعات کاربر با موفقیت به‌روزرسانی شد");
      setEditMode(false);
      await fetchUser();
      router.replace(`/admin/users/${numericId}`);
    } catch (error) {
      toast.error(error?.message || "خطا در به‌روزرسانی کاربر");
    }
  };

  const handleChangePassword = async (passwordData) => {
    if (!validId) return;
    try {
      const res = await userService.adminChangePassword(numericId, passwordData);
      unwrapApiData(res);
      toast.success("رمز عبور کاربر با موفقیت تغییر یافت");
      setShowChangePassword(false);
    } catch (error) {
      toast.error(error?.message || "خطا در تغییر رمز عبور");
    }
  };

  if (!validId) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>شناسه کاربر نامعتبر است</p>
        <Button onClick={() => router.push("/admin/users")} className="mt-4">
          بازگشت به لیست
        </Button>
      </div>
    );
  }

  if (authLoading || loading) {
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
    <div className="space-y-8" dir="rtl">
      <UserDetailHeader
        user={user}
        editMode={editMode}
        onEdit={() => {
          setEditMode(true);
          router.replace(`/admin/users/${numericId}?edit=true`);
        }}
        onCancel={exitEditMode}
        onChangePassword={() => setShowChangePassword(true)}
      />

      {editMode ? (
        <EditUserForm user={user} onSubmit={handleUpdateUser} onCancel={exitEditMode} />
      ) : (
        <>
          <AdminSectionCard title="اطلاعات کاربر" icon={User}>
            <UserInfoSection user={user} />
          </AdminSectionCard>
          <AdminSectionCard title="آمار و فعالیت" icon={Chart2}>
            <UserStatsSection user={user} />
          </AdminSectionCard>
        </>
      )}

      <ChangePasswordDialog
        open={showChangePassword}
        onOpenChange={setShowChangePassword}
        onSubmit={handleChangePassword}
      />
    </div>
  );
}
