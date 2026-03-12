"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { roleService } from "@/services/role/roleService";
import { isAdminUser } from "@/utils/authHelpers";
import { toast } from "sonner";
import { ShieldTick } from "iconsax-reactjs";

/**
 * دکمهٔ موقت: اختصاص نقش ادمین به کاربر لاگین‌شده (برای تست / خودت).
 * با توکن کار می‌کند؛ نیازی به ادمین بودن قبلی نیست.
 */
export default function MakeMeAdminButton() {
  const { user, updateSession } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const userId = user.id ?? user.userId;
  if (userId == null) return null;

  const alreadyAdmin = isAdminUser(user);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await roleService.assignRoleToUser({
        userId,
        roleName: "Admin",
      });
      if (response?.success !== false) {
        toast.success("نقش ادمین به حساب شما اختصاص داده شد.");
        if (response?.data) updateSession?.(response.data);
        router.refresh();
      } else {
        toast.error(response?.message || "خطا در اختصاص نقش");
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  if (alreadyAdmin) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={loading}
      className="gap-2 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
    >
      <ShieldTick size={18} />
      {loading ? "در حال اعمال..." : "خودم رو ادمین کن"}
    </Button>
  );
}
