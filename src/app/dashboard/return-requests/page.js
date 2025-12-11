"use client";

import DashboardLayout from "@/layout/DashboardLayout";
import ReturnRequestsList from "@/template/Dashboard/ReturnRequests/ReturnRequestsList";

export default function ReturnRequestsPage() {
  return (
    <DashboardLayout>
      <ReturnRequestsList />
    </DashboardLayout>
  );
}

