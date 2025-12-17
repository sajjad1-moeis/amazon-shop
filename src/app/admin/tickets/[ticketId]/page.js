"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { adminTicketService } from "@/services/ticket/adminTicketService";
import { formatDate } from "@/utils/dateFormatter";
import { User, Calendar, MessageText, TickCircle, CloseCircle } from "iconsax-reactjs";

export default function TicketDetailPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params?.ticketId;

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await adminTicketService.getTicketWithMessages(ticketId);
      if (response.success && response.data) {
        setTicket(response.data);
        setMessages(response.data.messages || []);
      } else {
        toast.error(response.message || "خطا در دریافت تیکت");
        router.push("/admin/tickets");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت تیکت");
      console.error("Error fetching ticket:", error);
      router.push("/admin/tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      toast.error("لطفاً پیام را وارد کنید");
      return;
    }

    setSendingMessage(true);
    try {
      const response = await adminTicketService.addAdminMessage(ticketId, messageText.trim(), false);
      if (response.success) {
        toast.success("پیام با موفقیت ارسال شد");
        setMessageText("");
        fetchTicket();
      } else {
        toast.error(response.message || "خطا در ارسال پیام");
      }
    } catch (error) {
      toast.error(error.message || "خطا در ارسال پیام");
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!confirm("آیا از بستن این تیکت اطمینان دارید؟")) return;

    setUpdating(true);
    try {
      const response = await adminTicketService.closeTicket(ticketId);
      if (response.success) {
        toast.success("تیکت با موفقیت بسته شد");
        fetchTicket();
      } else {
        toast.error(response.message || "خطا در بستن تیکت");
      }
    } catch (error) {
      toast.error(error.message || "خطا در بستن تیکت");
      console.error("Error closing ticket:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleReopenTicket = async () => {
    setUpdating(true);
    try {
      const response = await adminTicketService.reopenTicket(ticketId);
      if (response.success) {
        toast.success("تیکت با موفقیت باز شد");
        fetchTicket();
      } else {
        toast.error(response.message || "خطا در باز کردن تیکت");
      }
    } catch (error) {
      toast.error(error.message || "خطا در باز کردن تیکت");
      console.error("Error reopening ticket:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      1: { label: "باز", className: "bg-green-500/20 text-green-400 border-green-500/30" },
      2: { label: "بسته", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    };
    const statusInfo = statusMap[status] || statusMap[1];
    return (
      <Badge variant="outline" className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      1: { label: "پایین", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
      2: { label: "متوسط", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      3: { label: "بالا", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    };
    const priorityInfo = priorityMap[priority] || priorityMap[2];
    return (
      <Badge variant="outline" className={priorityInfo.className}>
        {priorityInfo.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>تیکت یافت نشد</p>
        <Button onClick={() => router.push("/admin/tickets")} className="mt-4">
          بازگشت به لیست
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">جزئیات تیکت</h1>
            <div className="flex items-center gap-2 mt-2">
              {getStatusBadge(ticket.status)}
              {getPriorityBadge(ticket.priority)}
            </div>
          </div>
          <div className="flex gap-2">
            {ticket.status === 1 ? (
              <Button
                onClick={handleCloseTicket}
                disabled={updating}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                <CloseCircle size={18} className="ml-2" />
                {updating ? "در حال پردازش..." : "بستن تیکت"}
              </Button>
            ) : (
              <Button onClick={handleReopenTicket} disabled={updating} className="bg-green-600 hover:bg-green-700">
                <TickCircle size={18} className="ml-2" />
                {updating ? "در حال پردازش..." : "باز کردن تیکت"}
              </Button>
            )}
            <Button variant="outline" onClick={() => router.push("/admin/tickets")}>
              بازگشت به لیست
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <MessageText size={20} />
              <span className="text-sm">شماره تیکت</span>
            </div>
            <p className="text-white text-lg font-medium">{ticket.ticketNumber || `TKT-${ticket.id}`}</p>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <User size={20} />
              <span className="text-sm">مشتری</span>
            </div>
            <p className="text-white text-lg font-medium">
              {ticket.customerName || ticket.userFullName || ticket.userName || "-"}
            </p>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <MessageText size={20} />
              <span className="text-sm">موضوع</span>
            </div>
            <p className="text-white text-lg font-medium">{ticket.subject || ticket.title || "-"}</p>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Calendar size={20} />
              <span className="text-sm">تاریخ ایجاد</span>
            </div>
            <p className="text-white text-lg">{formatDate(ticket.createdAt)}</p>
          </div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageText size={20} />
            پیام‌ها
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center py-4">پیامی وجود ندارد</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg ${
                    msg.isFromAdmin || msg.sender === "admin"
                      ? "bg-blue-500/20 border border-blue-500/30"
                      : "bg-gray-600/30 border border-gray-600"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-medium">
                      {msg.isFromAdmin || msg.sender === "admin" ? "ادمین" : msg.senderName || "کاربر"}
                    </span>
                    <span className="text-gray-400 text-sm">{formatDate(msg.createdAt || msg.time)}</span>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{msg.message || msg.text || "-"}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {ticket.status === 1 && (
          <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600">
            <h3 className="text-lg font-bold text-white mb-4">ارسال پاسخ</h3>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white mb-4 min-h-[100px] resize-none"
              placeholder="پیام خود را وارد کنید..."
            />
            <Button
              onClick={handleSendMessage}
              disabled={sendingMessage || !messageText.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {sendingMessage ? "در حال ارسال..." : "ارسال پیام"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

