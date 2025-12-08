"use client";

import { redirect } from "next/navigation";

export default function OpenTicketsPage() {
  redirect("/admin/tickets?status=open");
}

