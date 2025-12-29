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

  useEffect(() => {
    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await ticketService.getTicketWithMessages(ticketId);

      if (response.success && response.data) {
        const ticketData = response.data;
        setTicket({
          id: ticketData.id,
          ticketNumber: ticketData.ticketNumber || `TKT-${ticketData.id}`,
          title: ticketData.subject || ticketData.title || "-",
          createdAt: formatDate(ticketData.createdAt),
          lastUpdate: formatDate(ticketData.updatedAt || ticketData.createdAt),
          status: ticketData.status === 1 ? "reviewing" : ticketData.status === 2 ? "closed" : "pending",
          priority: ticketData.priority === 3 ? "high" : ticketData.priority === 2 ? "medium" : "low",
          category: ticketData.categoryName || ticketData.category || "-",
          files: ticketData.files || [],
        });

        const formattedMessages = (ticketData.messages || []).map((msg) => ({
          id: msg.id,
          sender: msg.isFromAdmin || msg.sender === "admin" ? "support" : "user",
          senderName: msg.isFromAdmin || msg.sender === "admin" ? "پشتیبانی" : "شما",
          supportName: msg.isFromAdmin || msg.sender === "admin" ? msg.adminName || "پشتیبانی" : undefined,
          time: formatDate(msg.createdAt || msg.time),
          date: formatDate(msg.createdAt || msg.time),
          text: msg.message || msg.text || "-",
        }));

        setMessages(formattedMessages);
      } else {
        toast.error(response.message || "خطا در دریافت تیکت");
        router.push("/dashboard/support");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت تیکت");
      console.error("Error fetching ticket:", error);
      router.push("/dashboard/support");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("لطفاً پیام را وارد کنید");
      return;
    }

    setSendingMessage(true);
    try {
      const response = await ticketService.addMessage(ticketId, message.trim());
      if (response.success) {
        toast.success("پیام با موفقیت ارسال شد");
        setMessage("");
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
      {/* Top Section: Header and Create Ticket Button */}
      <PageHeader title="تیکت و پشتیبانی">
        {" "}
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-primary-800">بستن تیکت</Button>
      </PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TicketChat
            ticketData={ticket}
            messagesList={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            sendingMessage={sendingMessage}
          />
        </div>
        <div>
          <TicketSidebar ticketData={ticket} getPriorityText={getPriorityText} />
        </div>
      </div>
    </DashboardLayout>
  );
}
