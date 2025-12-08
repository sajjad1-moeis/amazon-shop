"use client";

import { redirect } from "next/navigation";

export default function SuccessPaymentsPage() {
  redirect("/admin/payments?status=success");
}

