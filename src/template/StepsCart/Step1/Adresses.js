"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddressList from "./AddressList";
import AddressForm from "./AddAddressModal";
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
      <div className="bg-white rounded-lg shadow-sm p-6 " dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">آدرس تحویل سفارش</h2>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 text-yellow-600 hover:text-yellow-500 transition-colors"
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
        <div className="flex items-center gap-3">
          <Link href={"/cart"}>
            <Button className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium px-6 py-2 rounded-lg">
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

      <AddressForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        defaultValues={editingAddress ? parseAddressData(editingAddress) : null}
        onSubmit={handleSaveAddress}
      />
    </>
  );
}
