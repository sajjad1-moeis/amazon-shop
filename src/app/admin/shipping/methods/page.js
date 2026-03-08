"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Add, Truck } from "iconsax-reactjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ShippingMethodsTable from "@/template/Admin/shipping/methods/ShippingMethodsTable";
import { Spinner } from "@/components/ui/spinner";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { shippingService } from "@/services/shipping/shippingService";

export default function ShippingMethodsPage() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMethods = async () => {
    try {
      setLoading(true);
      const response = await shippingService.getMethods();

      if (response.success && response.data) {
        setMethods(response.data || []);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت روش‌های ارسال");
      console.error("Error fetching shipping methods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="روش‌های ارسال" subtitle="مدیریت روش‌های حمل و نقل" icon={Truck}>
        <Link href="/admin/shipping/methods/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Add size={20} className="ml-2" />
            روش جدید
          </Button>
        </Link>
      </AdminPageHeader>

      <AdminSectionCard title="لیست روش‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <ShippingMethodsTable methods={methods} />
        )}
      </AdminSectionCard>
    </div>
  );
}
