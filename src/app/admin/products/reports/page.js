"use client";

import { redirect } from "next/navigation";

export default function ProductsReportsRedirect() {
  redirect("/admin/reports/products");
}
