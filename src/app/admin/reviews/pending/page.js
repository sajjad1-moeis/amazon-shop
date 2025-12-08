"use client";

import { redirect } from "next/navigation";

export default function PendingReviewsPage() {
  redirect("/admin/reviews?status=pending");
}

