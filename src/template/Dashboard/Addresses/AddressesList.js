"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";
import AddressCard from "./AddressCard";
import AddressModal from "@/components/module/AddressModal";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { useAddresses } from "@/utils/func/use-address";
import { formatAddress, formatFullName, parseAddressData } from "@/utils/func/address-utlis";
import { toast } from "sonner";

const mockAddresses = [
  {
    id: 1,
    name: "محسن رضایی",
    mobile: "۰۹۱۲۹۸۱۴۴۲۱",
    province: "تهران",
    city: "پونک",
    postalCode: "۱۴۵۶۷۵۹۲۲۱",
    address: "تهران، شهر ری خیابان کریم خان ، کوچه آزاده ۲ پلاک ۱۲",
    isDefault: true,
  },
  {
    id: 2,
    name: "محسن رضایی",
    mobile: "۰۹۱۲۹۸۱۴۴۲۱",
    province: "تهران",
    city: "سعادت آباد",
    postalCode: "۱۹۸۷۶۱۳۴۵۱",
    address: "بلوار دریا، خیابان صراف ها، پلاک ۳۴",
    isDefault: false,
  },
];

export default function AddressesList() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses(mockAddresses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddClick = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (addressId) => {
    const address = addresses.find((a) => a.id === addressId);
    if (address) {
      setEditingAddress(address);
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = (addressId) => {
    if (addresses.length <= 1) {
      toast.error("حداقل باید یک آدرس وجود داشته باشد");
      return;
    }

    if (window.confirm("آیا از حذف این آدرس اطمینان دارید؟")) {
      try {
        deleteAddress(addressId);
        toast.success("آدرس با موفقیت حذف شد");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleSetDefault = (addressId) => {
    setDefaultAddress(addressId);
    toast.success("آدرس پیش‌فرض با موفقیت تغییر کرد");
  };

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

  const handleCloseDialog = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <>
      {/* Top Section: Header and Add Button */}
      <PageHeader
        title="آدرس های من"
        description="مدیریت آدرسهای ثبت شده برای ارسال سفارش ها"
        actionButton={
          <Button onClick={handleAddClick} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <Add size={20} className="ml-2" />
            افزودن آدرس
          </Button>
        }
      />

      {/* Bottom Section: Addresses List */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">لیست آدرسهای ثبت شده</h2>
        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => handleEditClick(address.id)}
              onDelete={() => handleDeleteClick(address.id)}
              onSetDefault={() => handleSetDefault(address.id)}
            />
          ))}
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseDialog}
        defaultValues={editingAddress ? parseAddressData(editingAddress) : null}
        onSubmit={handleSaveAddress}
      />
    </>
  );
}

