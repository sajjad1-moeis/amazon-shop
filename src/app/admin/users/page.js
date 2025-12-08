"use client";

import React, { useState } from "react";
import SearchBarTopTable from "@/template/Admin/SearchBarTopTable";
import UsersTable from "@/template/Admin/users/UsersTable";
import UsersFilters from "@/template/Admin/users/UsersFilters";

// داده‌های تستی

const mockUsers = [
  {
    id: 1,
    firstName: "علی",
    lastName: "محمدی",
    email: "ali@example.com",
    phone: "09123456789",
    ordersCount: 12,
    totalSpent: 125000000,
    isActive: true,
    registrationDate: "1403/08/01",
    isVip: true,
  },
  {
    id: 2,
    firstName: "مریم",
    lastName: "احمدی",
    email: "maryam@example.com",
    phone: "09123456790",
    ordersCount: 8,
    totalSpent: 85000000,
    isActive: true,
    registrationDate: "1403/08/05",
    isVip: false,
  },
  {
    id: 3,
    firstName: "حسین",
    lastName: "رضایی",
    email: "hossein@example.com",
    phone: "09123456791",
    ordersCount: 5,
    totalSpent: 45000000,
    isActive: false,
    registrationDate: "1403/08/10",
    isVip: false,
  },
  {
    id: 4,
    firstName: "فاطمه",
    lastName: "کریمی",
    email: "fateme@example.com",
    phone: "09123456792",
    ordersCount: 15,
    totalSpent: 180000000,
    isActive: true,
    registrationDate: "1403/07/20",
    isVip: true,
  },
];

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterVIP, setFilterVIP] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.isActive) ||
      (filterStatus === "inactive" && !user.isActive);
    const matchesVIP =
      filterVIP === "all" || (filterVIP === "vip" && user.isVip) || (filterVIP === "normal" && !user.isVip);
    return matchesSearch && matchesStatus && matchesVIP;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <div className="mb-5 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
          <h1 className="text-xl text-gray-100">لیست کاربران</h1>

          <SearchBarTopTable
            placeholder="جستجو نام"
            onInput={(value) => setSearchTerm(value)}
            inputContainerClass="max-lg:flex-col flex flex-row-reverse gap-2 flex-none max-lg:mt-5"
          >
            <UsersFilters
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterVIP={filterVIP}
              setFilterVIP={setFilterVIP}
            />
          </SearchBarTopTable>
        </div>

        <UsersTable users={filteredUsers} />
      </div>
    </div>
  );
}
