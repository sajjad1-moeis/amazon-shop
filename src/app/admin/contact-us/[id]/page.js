"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { contactService } from "@/services/contact/contactService";
import { formatDate } from "@/utils/dateFormatter";
import ContactDetailHeader from "@/template/Admin/contactUs/ContactDetailHeader";
import ContactInfoCard from "@/template/Admin/contactUs/ContactInfoCard";
import MessageSection from "@/template/Admin/contactUs/MessageSection";
import { User, Calendar, TickCircle, EmojiNormal } from "iconsax-reactjs";

export default function ContactUsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const contactId = params?.id;

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markAsReadLoading, setMarkAsReadLoading] = useState(false);

  useEffect(() => {
    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  const fetchContact = async () => {
    try {
      setLoading(true);
      const response = await contactService.getById(contactId);
      if (response.success && response.data) {
        setContact(response.data);
      } else {
        toast.error(response.message || "خطا در دریافت درخواست");
        router.push("/admin/contact-us");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت درخواست");
      console.error("Error fetching contact:", error);
      router.push("/admin/contact-us");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async () => {
    if (contact?.isRead) {
      toast.info("این درخواست قبلاً خوانده شده است");
      return;
    }

    setMarkAsReadLoading(true);
    try {
      const response = await contactService.markAsRead(contactId);
      if (response.success) {
        toast.success("درخواست به عنوان خوانده شده علامت‌گذاری شد");
        fetchContact();
      } else {
        toast.error(response.message || "خطا در علامت‌گذاری");
      }
    } catch (error) {
      toast.error(error.message || "خطا در علامت‌گذاری");
      console.error("Error marking as read:", error);
    } finally {
      setMarkAsReadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>درخواست یافت نشد</p>
        <Button onClick={() => router.push("/admin/contact-us")} className="mt-4">
          بازگشت به لیست
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="">
        <ContactDetailHeader
          isRead={contact.isRead}
          onMarkAsRead={handleMarkAsRead}
          markAsReadLoading={markAsReadLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ContactInfoCard icon={User} label="نام و نام خانوادگی" value={contact.fullName} />
          <ContactInfoCard
            icon={EmojiNormal}
            label="آدرس ایمیل"
            value={contact.email}
            isLink
            href={`mailto:${contact.email}`}
          />
          <ContactInfoCard icon={Calendar} label="تاریخ ارسال" value={formatDate(contact.createdAt)} />
          {contact.isRead && contact.readAt && (
            <ContactInfoCard icon={TickCircle} label="تاریخ خوانده شدن" value={formatDate(contact.readAt)} />
          )}
        </div>

        <MessageSection message={contact.message} />
      </div>
    </div>
  );
}



