"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Lock } from "iconsax-reactjs";
import { securityService } from "@/services/security/securityService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { Spinner } from "@/components/ui/spinner";

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await securityService.getPermissions();
        const data = unwrapApiData(response);
        const list = Array.isArray(data) ? data : [];
        if (!cancelled) setPermissions(list);
      } catch (error) {
        if (!cancelled) toast.error(error.message || "خطا در دریافت دسترسی‌ها");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="دسترسی‌ها" subtitle="لیست دسترسی‌های سیستم" icon={Lock} />
      <AdminSectionCard title="لیست دسترسی‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : permissions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">دسترسی‌ای تعریف نشده است</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {permissions.map((p) => (
              <li key={p.id ?? p.name ?? p.code} className="flex items-center gap-2 p-3 rounded-lg bg-gray-700/30 border border-gray-600">
                <span className="text-amber-400 font-medium">{p.name || p.code || p.displayName || "—"}</span>
                {p.description && <span className="text-gray-500 text-sm">({p.description})</span>}
              </li>
            ))}
          </ul>
        )}
      </AdminSectionCard>
    </div>
  );
}

