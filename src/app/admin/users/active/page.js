"use client";

import { redirect } from "next/navigation";

export default function ActiveUsersPage() {
  redirect("/admin/users?status=active");
}

