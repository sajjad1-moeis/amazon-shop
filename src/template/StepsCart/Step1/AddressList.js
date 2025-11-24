"use client";

import AddressCard from "./AddressCard";

export default function AddressList({ addresses, selectedAddressId, onSelect, onEdit, onDelete }) {
  return (
    <div className="mb-6 space-y-3">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          isSelected={address.id === selectedAddressId}
          onSelect={() => onSelect(address.id)}
          onEdit={() => onEdit(address.id)}
          onDelete={() => onDelete(address.id)}
        />
      ))}
    </div>
  );
}
