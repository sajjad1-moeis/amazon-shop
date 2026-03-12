"use client";

import { redirect } from "next/navigation";

export default function ShippingReportsRedirect() {
  redirect("/admin/reports/shipping");
}
