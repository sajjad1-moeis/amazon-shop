"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddressList from "./AddressList";
import AddressModal from "@/components/module/AddressModal";
import { useAddresses } from "@/utils/func/use-address";
import { formatAddress, formatFullName, parseAddressData } from "@/utils/func/address-utlis";
import { toast } from "sonner";
import Link from "next/link";

export default function DeliveryAddress({
  addresses: initialAddresses = [],
  selectedAddressId: initialSelectedId,
  onNext,
}) {
  const { addresses, selectedAddressId, selectedAddress, selectAddress, addAddress, updateAddress, deleteAddress } =
    useAddresses(initialAddresses, initialSelectedId);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddClick = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (addressId) => {
    const address = addresses.find((a) => a.id === addressId);
    if (address) {
      setEditingAddress(address);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = (addressId) => {
    try {
      deleteAddress(addressId);
    } catch (error) {
      toast.error(error.message, {
        richColors: true,
      });
    }
  };

  const handleSaveAddress = (formData) => {
    const addressData = {
      name: formatFullName(formData),
      address: formatAddress(formData),
      ...formData,
    };

    if (editingAddress) {
      updateAddress(editingAddress.id, addressData);
    } else {
      addAddress(addressData);
    }

    setIsDialogOpen(false);
    setEditingAddress(null);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAddress(null);
  };

  return (
    <>
      <div
        className="bg-white dark:bg-dark-field rounded-2xl shadow-sm p-6 dark:border dark:border-dark-stroke"
        dir="rtl"
      >
        {/* Header */}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-titre">آدرس تحویل سفارش</h2>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 text-yellow-600 hover:text-yellow-500 transition-colors max-md:hidden"
          >
            <Plus className="size-5" />
            <span className="font-medium">افزودن آدرس جدید</span>
          </button>
        </div>

        <AddressList
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelect={selectAddress}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        {/* Action Buttons */}

        <div className="md:hidden">
          <button
            onClick={handleAddClick}
            className="flex justify-center w-full items-center gap-2 text-yellow-600 hover:text-yellow-500 transition-colors"
          >
            <Plus className="size-5" />
            <span className="font-medium">افزودن آدرس جدید</span>
          </button>
        </div>
        <div className="grid grid-cols-2 dark:bg-dark-field dark:rounded-t-xl items-center p-3 gap-3 max-md:fixed bottom-0 md:flex md:relative  bg-white w-full right-0 ">
          <Link href={"/cart"}>
            <Button className="bg-gray-100 dark: max-md:w-full text-gray-600 dark:text-white dark:bg-dark-stroke hover:bg-gray-200 font-medium px-6 py-2 rounded-lg">
              لغو
            </Button>
          </Link>
          <Button
            onClick={onNext}
            disabled={!selectedAddress}
            variant="ghost"
            className="bg-yellow-400  text-primary-800 font-medium px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            مرحله بعد
          </Button>
        </div>
      </div>

      <AddressModal
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        defaultValues={editingAddress ? parseAddressData(editingAddress) : null}
        onSubmit={handleSaveAddress}
      />
    </>
  );
}
