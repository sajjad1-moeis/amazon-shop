"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, Truck } from "iconsax-reactjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ShippingMethodsTable from "@/template/Admin/shipping/methods/ShippingMethodsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { shippingService } from "@/services/shipping/shippingService";
import { unwrapApiData } from "@/services/api/client";

export default function ShippingMethodsPage() {
  const router = useRouter();
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMethods = async () => {
    try {
      setLoading(true);
      const response = await shippingService.getMethods({ pageNumber, pageSize });
      const data = unwrapApiData(response);
      setMethods(Array.isArray(data?.methods) ? data.methods : Array.isArray(data) ? data : []);
      setTotalPages(Math.max(1, data?.totalPages ?? 1));
    } catch (error) {
      toast.error(error.message || "خطا در دریافت روش‌های ارسال");
      setMethods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, [pageNumber, pageSize]);

  const handleEdit = (id) => {
    router.push(`/admin/shipping/methods/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="روش‌های ارسال"
        subtitle="مدیریت روش‌های حمل و نقل"
        icon={Truck}
        actions={
          <Link href="/admin/shipping/methods/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Add size={20} className="ml-2" />
              <span className="max-md:hidden">روش جدید</span>
            </Button>
          </Link>
        }
      />

      <AdminSectionCard title="لیست روش‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : methods.length === 0 ? (
          <div className="p-8 text-center text-gray-400">روشی یافت نشد</div>
        ) : (
          <>
            <ShippingMethodsTable methods={methods} onRefresh={fetchMethods} onEdit={handleEdit} />
            {!loading && totalPages > 1 && (
              <div className="pt-4 mt-4 border-t border-gray-600">
                <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
              </div>
            )}
          </>
        )}
      </AdminSectionCard>
    </div>
  );
}
