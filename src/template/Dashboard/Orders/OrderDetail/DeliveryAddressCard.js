"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Location } from "iconsax-reactjs";
import { useAddresses } from "@/utils/func/use-address";
import { mockAddresses } from "@/data";
import AddressCard from "../../Addresses/AddressCard";
import { useRouter } from "next/navigation";

export default function DeliveryAddressCard({ showEditButton = false }) {
  const { addresses } = useAddresses(mockAddresses);
  const address = addresses[0];
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 p-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-lg text-gray-900 dark:text-white">آدرس تحویل</h3>
        {showEditButton && (
          <Button
            onClick={() => router.push("/dashboard/account/addresses")}
            variant="ghost"
            size="sm"
            className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 gap-2 text-sm"
          >
            <Location size={18} />
            <span className="hidden sm:inline">تغییر آدرس</span>
            <span className="sm:hidden">تغییر</span>
          </Button>
        )}
      </div>

      <AddressCard
        removeHandler
        key={address.id}
        address={address}
        onEdit={() => handleEditClick(address.id)}
        onDelete={() => handleDeleteClick(address.id)}
        onSetDefault={() => handleSetDefault(address.id)}
      />
    </div>
  );
}
