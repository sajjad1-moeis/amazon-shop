"use client";

import { redirect } from "next/navigation";

export default function ClosedTicketsPage() {
  redirect("/admin/tickets?status=closed");
}

