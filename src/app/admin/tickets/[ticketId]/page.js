"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { adminTicketService } from "@/services/ticket/adminTicketService";
import { unwrapApiData } from "@/services/api/client";
import TicketDetailHeader from "@/template/Admin/tickets/detail/TicketDetailHeader";
import TicketInfoCards from "@/template/Admin/tickets/detail/TicketInfoCards";
import TicketMessagesSection from "@/template/Admin/tickets/detail/TicketMessagesSection";
import TicketReplyForm from "@/template/Admin/tickets/detail/TicketReplyForm";

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
      const data = unwrapApiData(response);
      const ticketData = data?.ticket ?? data;
      setTicket(ticketData);
      const raw = Array.isArray(data?.messages) ? data.messages : [];
      const mapped = raw.map((msg) => ({
        ...msg,
        isFromAdmin: msg.messageType === 2 || msg.messageTypeName === "Support",
        sender: msg.messageType === 2 ? "admin" : "user",
      }));
      setMessages(mapped);
    } catch (error) {
      toast.error(error.message || "خطا در دریافت تیکت");
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
      const response = await adminTicketService.addMessage(ticketId, {
        message: messageText.trim(),
        isInternal: false,
      });
      unwrapApiData(response);
      toast.success("پیام با موفقیت ارسال شد");
      setMessageText("");
      fetchTicket();
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
      unwrapApiData(response);
      toast.success("تیکت با موفقیت بسته شد");
      fetchTicket();
    } catch (error) {
      toast.error(error.message || "خطا در بستن تیکت");
    } finally {
      setUpdating(false);
    }
  };

  const handleReopenTicket = async () => {
    setUpdating(true);
    try {
      const response = await adminTicketService.reopenTicket(ticketId);
      unwrapApiData(response);
      toast.success("تیکت با موفقیت باز شد");
      fetchTicket();
    } catch (error) {
      toast.error(error.message || "خطا در باز کردن تیکت");
    } finally {
      setUpdating(false);
    }
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
    <div className="w-full min-w-0 space-y-6">
      <div className="w-full min-w-0">
        <TicketDetailHeader
          ticket={ticket}
          updating={updating}
          onCloseTicket={handleCloseTicket}
          onReopenTicket={handleReopenTicket}
          onBack={() => router.push("/admin/tickets")}
        />

        <TicketInfoCards ticket={ticket} />

        <TicketMessagesSection messages={messages} />

        {ticket.status === 1 && (
          <TicketReplyForm
            messageText={messageText}
            setMessageText={setMessageText}
            sendingMessage={sendingMessage}
            onSubmit={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
}
