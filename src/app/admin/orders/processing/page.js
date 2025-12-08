"use client";

import { redirect } from "next/navigation";

export default function ProcessingOrdersPage() {
  redirect("/admin/orders?status=processing");
}

