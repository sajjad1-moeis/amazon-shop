"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";
import AddressCard from "./AddressCard";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { useAddresses } from "@/hooks/use-address";
import { formatAddress, formatFullName, parseAddressData } from "@/utils/address-utlis";
import { toast } from "sonner";
import { mockAddresses } from "@/data";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function AddressesList({
  addresses,
  editingAddress,
  setEditingAddress,
  deleteAddress,
  setDefaultAddress,
  handleAddClick,
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleEditClick = (addressId) => {
    const address = addresses.find((a) => a.id === addressId);
    if (address) {
      setEditingAddress(address);
      handleAddClick();
    }
  };

  const handleDeleteClick = (addressId) => {
    if (addresses.length <= 1) {
      toast.error("حداقل باید یک آدرس وجود داشته باشد");
      return;
    }

    setSelectedAddressId(addressId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedAddressId) return;

    try {
      deleteAddress(selectedAddressId);
      setDeleteDialogOpen(false);
      setSelectedAddressId(null);
      toast.success("آدرس با موفقیت حذف شد");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSetDefault = (addressId) => {
    setDefaultAddress(addressId);
    toast.success("آدرس پیش‌فرض با موفقیت تغییر کرد");
  };

  return (
    <>
      {/* Top Section: Header and Add Button */}

      {/* Bottom Section: Addresses List */}
      <div
        className="bg-white dark:bg-dark-box rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h2 className="text-lg md:text-xl  text-gray-900 dark:text-dark-titre mb-4 max-md:mb-7">
          لیست آدرسهای ثبت شده
        </h2>
        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressCard
              hasPhone
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

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف آدرس"
        description="آیا از حذف این آدرس اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
