"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ContactUsTable from "@/template/Admin/contactUs/ContactUsTable";
import ContactUsFilters from "@/template/Admin/contactUs/ContactUsFilters";
import ContactStats from "@/template/Admin/contactUs/ContactStats";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { contactService } from "@/services/contact/contactService";

export default function ContactUsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const pageParam = searchParams.get("page");

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(pageParam ? parseInt(pageParam) : 1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [markAsReadLoading, setMarkAsReadLoading] = useState({});

  const isReadFilter = filterParam === "unread" ? false : filterParam === "read" ? true : null;

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setPageNumber(parseInt(page));
    } else {
      setPageNumber(1);
    }
  }, [searchParams]);

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

  const fetchUnreadCount = async () => {
    try {
      const response = await contactService.getUnreadCount();
      if (response.success && response.data !== null && response.data !== undefined) {
        setUnreadCount(response.data);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const handleView = (contactId) => {
    router.push(`/admin/contact-us/${contactId}`);
  };

  const handleMarkAsRead = async (contactId) => {
    setMarkAsReadLoading((prev) => ({ ...prev, [contactId]: true }));
    try {
      const response = await contactService.markAsRead(contactId);
      if (response.success) {
        toast.success("درخواست به عنوان خوانده شده علامت‌گذاری شد");
        await fetchContacts();
        await fetchUnreadCount();
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

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/contact-us?${params.toString()}`);
  };

  useEffect(() => {
    fetchContacts();
    fetchUnreadCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, isReadFilter]);

  return (
    <div className="space-y-6">
      <div className="">
        <div className="mb-5 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
          <h1 className="text-lg md:text-xl text-gray-100">درخواست‌های ارتباط با ما</h1>
          <ContactUsFilters />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ContactStats
              totalCount={totalCount}
              currentPage={pageNumber}
              totalPages={totalPages}
              unreadCount={unreadCount}
            />
            <ContactUsTable
              contacts={contacts}
              onView={handleView}
              onMarkAsRead={handleMarkAsRead}
              markAsReadLoading={markAsReadLoading}
            />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}



