"use client";

import { redirect } from "next/navigation";

export default function FailedPaymentsPage() {
  redirect("/admin/payments?status=failed");
}

