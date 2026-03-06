"use client";

import { redirect } from "next/navigation";

export default function DeliveredOrdersPage() {
  redirect("/admin/orders?status=delivered");
}

