"use client";

import { redirect } from "next/navigation";

export default function ApprovedReviewsPage() {
  redirect("/admin/reviews?status=approved");
}

