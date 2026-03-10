"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Add, Truck } from "iconsax-reactjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ShippingZonesTable from "@/template/Admin/shipping/zones/ShippingZonesTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { shippingService } from "@/services/shipping/shippingService";
import { unwrapApiData } from "@/services/api/client";

export default function ShippingZonesPage() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const response = await shippingService.getZones({ pageNumber, pageSize });
      const data = unwrapApiData(response);
      setZones(Array.isArray(data?.zones) ? data.zones : Array.isArray(data) ? data : []);
      setTotalPages(Math.max(1, data?.totalPages ?? 1));
    } catch (error) {
      toast.error(error.message || "خطا در دریافت مناطق ارسال");
      setZones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, [pageNumber, pageSize]);

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
        ) : zones.length === 0 ? (
          <div className="p-8 text-center text-gray-400">منطقه‌ای یافت نشد</div>
        ) : (
          <>
            <ShippingZonesTable zones={zones} onRefresh={fetchZones} />
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
