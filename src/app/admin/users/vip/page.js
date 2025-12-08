"use client";

import { redirect } from "next/navigation";

export default function VipUsersPage() {
  redirect("/admin/users?type=vip");
}

