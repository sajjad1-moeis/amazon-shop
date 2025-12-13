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
import { mockAddresses } from "@/data";

export default function AddressesList({ isModalOpen, setIsModalOpen, editingAddress, setEditingAddress }) {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses(mockAddresses);
  
  // اگر props پاس داده نشده باشد، state را خودمان مدیریت می‌کنیم
  const [internalIsModalOpen, setInternalIsModalOpen] = useState(false);
  const [internalEditingAddress, setInternalEditingAddress] = useState(null);
  
  const modalOpen = isModalOpen !== undefined ? isModalOpen : internalIsModalOpen;
  const setModalOpen = setIsModalOpen || setInternalIsModalOpen;
  const editing = editingAddress !== undefined ? editingAddress : internalEditingAddress;
  const setEditing = setEditingAddress || setInternalEditingAddress;

  const handleEditClick = (addressId) => {
    const address = addresses.find((a) => a.id === addressId);
    if (address) {
      setEditing(address);
      setModalOpen(true);
    }
  };

  const handleDeleteClick = (addressId) => {
    if (addresses.length <= 1) {
      toast.error("حداقل باید یک آدرس وجود داشته باشد", { richColors: true });
      return;
    }

    if (window.confirm("آیا از حذف این آدرس اطمینان دارید؟")) {
      try {
        deleteAddress(addressId);
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

    setModalOpen(false);
    setEditing(null);
  };

  const handleCloseDialog = () => {
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <>
      {/* Top Section: Header and Add Button */}

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
        isOpen={modalOpen}
        onClose={handleCloseDialog}
        defaultValues={editing ? parseAddressData(editing) : null}
        onSubmit={handleSaveAddress}
      />
    </>
  );
}
