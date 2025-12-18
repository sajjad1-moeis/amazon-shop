"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, Edit, Trash, Profile2User, Calendar, Document } from "iconsax-reactjs";
import PageHeader from "@/template/Admin/PageHeader";
import ConfirmDialog from "@/components/ConfirmDialog";
import { roleService } from "@/services/role/roleService";
import { formatDate } from "@/utils/dateFormatter";

export default function RoleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roleId = params?.id;

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (roleId) {
      fetchRoleDetail();
    }
  }, [roleId]);

  const fetchRoleDetail = async () => {
    try {
      setLoading(true);
      const response = await roleService.getRoleDetailForAdmin(roleId);

      if (response && response.success && response.data) {
        setRole(response.data);
      } else {
        toast.error(response?.message || "خطا در دریافت جزئیات نقش");
        router.push("/admin/roles");
      }
    } catch (error) {
      console.error("Error fetching role detail:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در دریافت جزئیات نقش";
      toast.error(errorMessage);
      router.push("/admin/roles");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roleId) return;

    setDeleteLoading(true);
    try {
      const response = await roleService.deleteRole(roleId);
      if (response && response.success) {
        toast.success("نقش با موفقیت حذف شد");
        router.push("/admin/roles");
      } else {
        toast.error(response?.message || "خطا در حذف نقش");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در حذف نقش";
      toast.error(errorMessage);
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleEdit = () => {
    router.push(`/admin/roles/edit/${roleId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!role) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>نقش یافت نشد</p>
        <Button onClick={() => router.push("/admin/roles")} className="mt-4">
          بازگشت به لیست
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`جزئیات نقش: ${role.name}`}
        buttonText="بازگشت به لیست"
        buttonIcon={<ArrowRight size={20} className="ml-2" />}
        onButtonClick={() => router.push("/admin/roles")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* اطلاعات اصلی */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-800 bg-opacity-50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>اطلاعات نقش</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="text-white border-gray-600 hover:bg-gray-700"
                  >
                    <Edit size={16} className="ml-2" />
                    ویرایش
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    className="text-red-400 border-red-500/30 hover:bg-red-500/20"
                  >
                    <Trash size={16} className="ml-2" />
                    حذف
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">نام نقش</label>
                <p className="text-white text-lg font-medium mt-1">{role.name}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm flex items-center gap-2">
                  <Document size={16} />
                  توضیحات
                </label>
                <p className="text-gray-300 mt-1">{role.description || "-"}</p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <label className="text-gray-400 text-sm">وضعیت</label>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className={
                        role.isActive !== false
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }
                    >
                      {role.isActive !== false ? "فعال" : "غیرفعال"}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm flex items-center gap-2">
                    <Calendar size={16} />
                    تاریخ ایجاد
                  </label>
                  <p className="text-gray-300 mt-1">{formatDate(role.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* آمار و اطلاعات جانبی */}
        <div className="space-y-6">
          <Card className="bg-gray-800 bg-opacity-50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Profile2User size={20} />
                آمار
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">تعداد کاربران</label>
                <p className="text-white text-2xl font-bold mt-1">{role.userCount || 0}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">تعداد دسترسی‌ها</label>
                <p className="text-white text-2xl font-bold mt-1">{role.permissionCount || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف نقش"
        description="آیا از حذف این نقش اطمینان دارید؟ اگر این نقش به کاربران اختصاص داده شده باشد، حذف نخواهد شد."
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}
