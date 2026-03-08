"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Add, Truck } from "iconsax-reactjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ShippingZonesTable from "@/template/Admin/shipping/zones/ShippingZonesTable";
import { Spinner } from "@/components/ui/spinner";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { shippingService } from "@/services/shipping/shippingService";

export default function ShippingZonesPage() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const response = await shippingService.getZones();

      if (response.success && response.data) {
        setZones(response.data || []);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت مناطق ارسال");
      console.error("Error fetching zones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="مناطق ارسال" subtitle="مدیریت مناطق و هزینه ارسال" icon={Truck}>
        <Link href="/admin/shipping/zones/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Add size={20} className="ml-2" />
            منطقه جدید
          </Button>
        </Link>
      </AdminPageHeader>

      <AdminSectionCard title="لیست مناطق">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <ShippingZonesTable zones={zones} />
        )}
      </AdminSectionCard>
    </div>
  );
}
