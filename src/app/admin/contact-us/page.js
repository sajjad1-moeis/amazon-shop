"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ContactUsTable from "@/template/Admin/contactUs/ContactUsTable";
import FilterButtons from "@/template/Admin/contactUs/FilterButtons";
import ContactStats from "@/template/Admin/contactUs/ContactStats";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { contactService } from "@/services/contact/contactService";

export default function ContactUsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isReadFilter, setIsReadFilter] = useState(
    filterParam === "unread" ? false : filterParam === "read" ? true : null
  );
  const [markAsReadLoading, setMarkAsReadLoading] = useState({});

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactService.getPaginated({
        pageNumber,
        pageSize,
        isRead: isReadFilter,
      });

      if (response.success && response.data) {
        setContacts(response.data.contacts || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.totalCount || 0);
      } else {
        toast.error(response.message || "خطا در دریافت درخواست‌ها");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت درخواست‌ها");
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [pageNumber, isReadFilter]);

  const handleView = (contactId) => {
    router.push(`/admin/contact-us/${contactId}`);
  };

  const handleMarkAsRead = async (contactId) => {
    setMarkAsReadLoading((prev) => ({ ...prev, [contactId]: true }));
    try {
      const response = await contactService.markAsRead(contactId);
      if (response.success) {
        toast.success("درخواست به عنوان خوانده شده علامت‌گذاری شد");
        fetchContacts();
      } else {
        toast.error(response.message || "خطا در علامت‌گذاری");
      }
    } catch (error) {
      toast.error(error.message || "خطا در علامت‌گذاری");
      console.error("Error marking as read:", error);
    } finally {
      setMarkAsReadLoading((prev) => ({ ...prev, [contactId]: false }));
    }
  };

  const handleFilterChange = (filter) => {
    setIsReadFilter(filter);
    setPageNumber(1);
    const newUrl =
      filter === null ? "/admin/contact-us" : `/admin/contact-us?filter=${filter === false ? "unread" : "read"}`;
    router.push(newUrl);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl text-gray-100">درخواست‌های ارتباط با ما</h1>
          <FilterButtons currentFilter={isReadFilter} onFilterChange={handleFilterChange} />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ContactStats totalCount={totalCount} currentPage={pageNumber} totalPages={totalPages} />
            <ContactUsTable
              contacts={contacts}
              onView={handleView}
              onMarkAsRead={handleMarkAsRead}
              markAsReadLoading={markAsReadLoading}
            />
            <div className="mt-6 pt-6 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
