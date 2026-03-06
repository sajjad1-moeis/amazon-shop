"use client";

import { redirect } from "next/navigation";

export default function ShippedOrdersPage() {
  redirect("/admin/orders?status=shipped");
}

