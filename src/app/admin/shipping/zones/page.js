"use client";

import React, { useState, useEffect } from "react";
import { Add } from "iconsax-reactjs";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import ShippingZonesTable from "@/template/Admin/shipping/zones/ShippingZonesTable";
import { Spinner } from "@/components/ui/spinner";
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
      <div className="">
        <PageHeader title="مناطق ارسال" buttonText="منطقه جدید" buttonIcon={<Add size={20} className="ml-2" />} />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <ShippingZonesTable zones={zones} />
        )}
      </div>
    </div>
  );
}
