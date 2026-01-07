"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CurrencyServicesTable from "@/template/Admin/currencyServices/CurrencyServicesTable";
import CurrencyServicesFilters from "@/template/Admin/currencyServices/CurrencyServicesFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { currencyService } from "@/services/currency/currencyService";

export default function CurrencyServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParam = searchParams.get("search");
  const searchTerm = searchParam || "";
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await currencyService.getPaginated({
        pageNumber,
        pageSize,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setServices(response.data.services || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت خدمات ارزی");
      console.error("Error fetching currency services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setPageNumber(1);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchServices();
  }, [pageNumber, searchParams]);

  const handleEdit = (serviceId) => {
    router.push(`/admin/currency-services/edit/${serviceId}`);
  };

  const handleDelete = (serviceId) => {
    setSelectedServiceId(serviceId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedServiceId) return;

    setDeleteLoading(true);
    try {
      const response = await currencyService.softDelete(selectedServiceId);
      if (response.success) {
        toast.success("خدمت ارزی با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedServiceId(null);
        fetchServices();
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف خدمت ارزی");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="">
        <div className="mb-5">
          <h1 className="text-lg md:text-xl text-gray-100 mb-4">خدمات ارزی</h1>
          <CurrencyServicesFilters />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <CurrencyServicesTable services={services} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف خدمت ارزی"
        description="آیا از حذف این خدمت ارزی اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}
