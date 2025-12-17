"use client";

import React, { useState, useEffect } from "react";
import { Add } from "iconsax-reactjs";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import ShippingMethodsTable from "@/template/Admin/shipping/methods/ShippingMethodsTable";
import { Spinner } from "@/components/ui/spinner";
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
      <div className="">
        <PageHeader title="روش‌های ارسال" buttonText="روش جدید" buttonIcon={<Add size={20} className="ml-2" />} />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <ShippingMethodsTable methods={methods} />
        )}
      </div>
    </div>
  );
}
