"use client";

import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";
import AddressesList from "@/template/Dashboard/Addresses/AddressesList";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Add } from "iconsax-reactjs";
import { useState } from "react";

export default function AddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddClick = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const AdressBtn = () => (
    <Button onClick={handleAddClick} className="bg-yellow-500 max-md:w-full hover:bg-yellow-600 text-gray-800">
      افزودن آدرس
      <Add size={20} />
    </Button>
  );

  return (
    <DashboardLayout>
      <PageHeader
        actionButton={
          <div className="md:hidden">
            <AdressBtn />
          </div>
        }
        title="آدرس های من"
        description="مدیریت آدرسهای ثبت شده برای ارسال سفارش ها"
      >
        <div className="max-md:hidden">
          <AdressBtn />
        </div>
      </PageHeader>
      <AddressesList />
    </DashboardLayout>
  );
}
