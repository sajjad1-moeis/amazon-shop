"use client";

import { Button } from "@/components/ui/button";
import { mockAddresses } from "@/data";
import { useAddresses } from "@/hooks/use-address";
import DashboardLayout from "@/layout/DashboardLayout";
import AddressesList from "@/template/Dashboard/Addresses/AddressesList";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import AddressForm from "@/template/StepsCart/Step1/AddAddressModal";
import { formatAddress, formatFullName, parseAddressData } from "@/utils/address-utlis";
import { Add } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "sonner";

export default function AddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses(mockAddresses);
  const handleSaveAddress = (formData) => {
    const addressData = {
      name: formatFullName(formData),
      address: formatAddress(formData),
      ...formData,
    };

    if (editingAddress) {
      updateAddress(editingAddress.id, addressData);
      toast.success("آدرس با موفقیت ویرایش شد");
    } else {
      addAddress(addressData);
      toast.success("آدرس با موفقیت اضافه شد");
    }

    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const AdressBtn = () => (
    <Button
      onClick={() => {
        setEditingAddress(null);
        handleAddClick();
      }}
      className="bg-yellow-500 max-md:w-full hover:bg-yellow-600 text-gray-800"
    >
      افزودن آدرس
      <Add size={20} />
    </Button>
  );

  const bindComp = {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    handleAddClick,
    editingAddress,
    setEditingAddress,
  };

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
      <AddressesList {...bindComp} />
      <AddressForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultValues={editingAddress ? parseAddressData(editingAddress) : null}
        onSubmit={handleSaveAddress}
      />
    </DashboardLayout>
  );
}
