"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Location } from "iconsax-reactjs";
import { useAddresses } from "@/hooks/use-address";
import { mockAddresses } from "@/data";
import AddressCard from "../Addresses/AddressCard";
import { useRouter } from "next/navigation";

export default function DeliveryAddressCard({ address, showEditButton = false, onEdit }) {
  const { addresses } = useAddresses(mockAddresses);
  const displayAddress = address || addresses[0];
  console.log(displayAddress);
  const router = useRouter();

  const handleEditClick = (addressId) => {
    if (onEdit) {
      onEdit();
    } else {
      router.push("/dashboard/account/addresses");
    }
  };

  const handleDeleteClick = (addressId) => {
    // Handle delete if needed
  };

  const handleSetDefault = (addressId) => {
    // Handle set default if needed
  };

  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-3">
      <div className="flex-between gap-3 mb-4">
        <h3 className="text-lg text-gray-900 dark:text-dark-titre">آدرس تحویل</h3>
        {showEditButton && (
          <Button
            onClick={() => router.push("/dashboard/account/addresses")}
            variant="ghost"
            size="sm"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 gap-2 text-sm"
          >
            <Location size={18} />
            <span>تغییر آدرس</span>
          </Button>
        )}
      </div>

      <AddressCard
        removeHandler
        hasPhone
        key={displayAddress?.id}
        address={displayAddress}
        onEdit={() => handleEditClick(displayAddress?.id)}
        onDelete={() => handleDeleteClick(displayAddress?.id)}
        onSetDefault={() => handleSetDefault(displayAddress?.id)}
      />
    </div>
  );
}
