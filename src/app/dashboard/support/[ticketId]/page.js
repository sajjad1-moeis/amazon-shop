"use client";

import { useParams } from "next/navigation";
import DashboardLayout from "@/layout/DashboardLayout";
import TicketDetail from "@/template/Dashboard/Support/TicketDetail";

export default function TicketDetailPage() {
  const params = useParams();
  return (
    <DashboardLayout>
      <TicketDetail ticketId={params.ticketId} />
    </DashboardLayout>
  );
}

