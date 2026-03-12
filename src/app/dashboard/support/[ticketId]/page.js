"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TicketSidebar from "@/template/Dashboard/TicketDetail/TicketSidebar";
import TicketChat from "@/template/Dashboard/TicketDetail/TicketChat";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ticketService } from "@/services/ticket/ticketService";
import { toast } from "sonner";
import { formatDate } from "@/utils/dateFormatter";

export default function TicketDetail() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params?.ticketId;

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await ticketService.getTicketWithMessages(ticketId);

      // پشتیبانی از هر دو ساختار: { ticket, messages } یا { success, data }
      const rawTicket = response?.ticket ?? response?.data?.ticket ?? response?.data;
      const rawMessages = response?.messages ?? response?.data?.messages ?? rawTicket?.messages ?? [];

      if (!rawTicket || (rawTicket && !rawTicket.id && !rawTicket.ticketNumber)) {
        toast.error(response?.message || "تیکت یافت نشد");
        router.push("/dashboard/support");
        return;
      }

      const t = rawTicket;
      setTicket({
        id: t.id,
        ticketNumber: t.ticketNumber || `TKT-${t.id}`,
        title: t.subject || t.title || "-",
        subject: t.subject || t.title || "-",
        description: t.description ?? "",
        createdAt: formatDate(t.createdAt),
        lastUpdate: formatDate(t.updatedAt || t.createdAt),
        status: typeof t.status === "number" ? t.status : t.status,
        priority: t.priority === 3 ? "high" : t.priority === 2 ? "medium" : "low",
        category: t.categoryName || t.category || "-",
        categoryName: t.categoryName || t.category || "-",
        userFullName: t.userFullName?.trim() || "-",
        userEmail: t.userEmail || "",
        statusName: t.statusName || "",
        files: t.files || [],
      });

      // اولین پیام = توضیحات تیکت (همان description هنگام ساخت)
      const firstMessage = {
        id: "ticket-initial",
        sender: "user",
        senderName: "شما",
        supportName: undefined,
        time: formatDate(t.createdAt),
        date: formatDate(t.createdAt),
        text: (t.description ?? "").trim() || "—",
        attachmentUrl: t.attachmentUrl ?? t.attachment ?? null,
        attachmentFileName: t.attachmentFileName ?? t.attachmentName ?? null,
      };

      const formattedFromApi = (Array.isArray(rawMessages) ? rawMessages : []).map((msg) => ({
        id: msg.id,
        sender: msg.messageTypeName === "Admin" || msg.isFromAdmin === true || msg.sender === "admin" || msg.isStaff ? "support" : "user",
        senderName: msg.messageTypeName === "Admin" || msg.isFromAdmin || msg.sender === "admin" ? "پشتیبانی" : "شما",
        supportName: msg.adminName ?? msg.senderName ?? (msg.messageTypeName === "Admin" ? "پشتیبانی" : undefined),
        time: formatDate(msg.createdAt || msg.sentAt || msg.time),
        date: formatDate(msg.createdAt || msg.sentAt || msg.time),
        text: msg.message || msg.text || msg.content || "-",
        attachmentUrl: msg.attachmentUrl ?? msg.attachment ?? null,
        attachmentFileName: msg.attachmentFileName ?? msg.attachmentName ?? null,
      }));

      setMessages([firstMessage, ...formattedFromApi]);
    } catch (error) {
      toast.error(error?.message || "خطا در دریافت تیکت");
      console.error("Error fetching ticket:", error);
      router.push("/dashboard/support");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) {
      toast.error("لطفاً پیام یا تصویر وارد کنید");
      return;
    }

    setSendingMessage(true);
    try {
      let attachmentUrl = null;
      let attachmentFileName = null;

      if (selectedFile) {
        try {
          const uploadRes = await ticketService.uploadTicketFile(ticketId, selectedFile);
          const d = uploadRes?.data ?? uploadRes;
          attachmentUrl = d?.url ?? d?.fileUrl ?? d?.attachmentUrl ?? null;
          attachmentFileName = d?.fileName ?? d?.attachmentFileName ?? d?.name ?? selectedFile.name ?? null;
        } catch (uploadErr) {
          toast.warning("تصویر آپلود نشد");
        }
        setSelectedFile(null);
      }

      const body = {
        ticketId: Number(ticketId),
        message: (message || " ").trim(),
      };
      if (attachmentUrl) {
        body.attachmentUrl = attachmentUrl;
        if (attachmentFileName) body.attachmentFileName = attachmentFileName;
      }

      const response = await ticketService.addMessage(body);
      const ok = response?.success === true || (response?.data && !response?.message);
      if (ok) {
        toast.success("پیام با موفقیت ارسال شد");
        setMessage("");
        fetchTicket();
      } else {
        toast.error(response?.message || "خطا در ارسال پیام");
      }
    } catch (error) {
      toast.error(error?.message || "خطا در ارسال پیام");
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  // StatusBadge component is used instead

  const getPriorityText = () => {
    if (!ticket) return null;
    switch (ticket.priority) {
      case "high":
        return <span className="text-red-600 dark:text-red-400 font-medium">بالا</span>;
      case "medium":
        return <span className="text-yellow-600 dark:text-yellow-400 font-medium">متوسط</span>;
      case "low":
        return <span className="text-green-600 dark:text-green-400 font-medium">پایین</span>;
      default:
        return null;
    }
  };

  const [closingTicket, setClosingTicket] = useState(false);
  const handleCloseTicket = async () => {
    if (!ticketId || ticket?.status === 5) return;
    if (!confirm("آیا از بستن این تیکت اطمینان دارید؟")) return;
    setClosingTicket(true);
    try {
      const res = await ticketService.closeTicket(ticketId);
      if (res?.success !== false) {
        toast.success("تیکت بسته شد");
        fetchTicket();
      } else {
        toast.error(res?.message || "خطا در بستن تیکت");
      }
    } catch (err) {
      toast.error(err?.message || "خطا در بستن تیکت");
    } finally {
      setClosingTicket(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (!ticket) {
    return (
      <DashboardLayout>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <p>تیکت یافت نشد</p>
          <Button onClick={() => router.push("/dashboard/support")} className="mt-4">
            بازگشت به لیست
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="تیکت و پشتیبانی"
        actionButton={
          ticket.status !== 5 ? (
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 w-full md:w-auto"
              onClick={handleCloseTicket}
              disabled={closingTicket}
            >
              {closingTicket ? "در حال بستن..." : "بستن تیکت"}
            </Button>
          ) : null
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TicketChat
            ticketData={ticket}
            messagesList={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            sendingMessage={sendingMessage}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            onClearFile={() => setSelectedFile(null)}
          />
        </div>
        <div>
          <TicketSidebar ticketData={ticket} getPriorityText={getPriorityText} />
        </div>
      </div>
    </DashboardLayout>
  );
}
