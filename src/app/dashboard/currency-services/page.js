"use client";

import DashboardLayout from "@/layout/DashboardLayout";
import CurrencyServicesList from "@/template/Dashboard/CurrencyServices/CurrencyServicesList";

export default function CurrencyServicesPage() {
  return (
    <DashboardLayout>
      <CurrencyServicesList />
    </DashboardLayout>
  );
}

