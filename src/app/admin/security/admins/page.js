"use client";

import React, { useState } from "react";
import { Add } from "iconsax-reactjs";
import PageHeader from "@/template/Admin/PageHeader";
import AdminsTable from "@/template/Admin/security/admins/AdminsTable";

const mockAdmins = [
  { id: 1, name: "مدیر اصلی", email: "admin@example.com", role: "Super Admin", isActive: true },
  { id: 2, name: "مدیر محصولات", email: "product@example.com", role: "Product Admin", isActive: true },
  { id: 3, name: "مدیر سفارشات", email: "order@example.com", role: "Order Admin", isActive: false },
];

export default function AdminsPage() {
  const [admins] = useState(mockAdmins);

  return (
    <div className="space-y-6">
      <div className="">
        <PageHeader title="کاربران ادمین" buttonText="ادمین جدید" buttonIcon={<Add size={20} className="ml-2" />} />

        <AdminsTable admins={admins} />
      </div>
    </div>
  );
}
