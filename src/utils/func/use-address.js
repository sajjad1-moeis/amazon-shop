import { useState, useMemo } from "react";
import { toast } from "sonner";

export const DEFAULT_FORM_DATA = {
  province: "",
  city: "",
  address: "",
  plaque: "",
  unit: "",
  postalCode: "",
  firstName: "",
  lastName: "",
  mobile: "",
  landline: "",
  notes: "",
};

export function useAddresses(initialAddresses = [], initialSelectedId = null) {
  const [addresses, setAddresses] = useState(
    initialAddresses.length > 0
      ? initialAddresses
      : [
          {
            id: 1,
            name: "محمد داوری",
            address: "تهران، شهر ری، خیابان کریم خان، کوچه آزاده ۲ پلاک ۱۲",
          },
        ]
  );

  const [selectedAddressId, setSelectedAddressId] = useState(
    initialSelectedId || (addresses.length > 0 ? addresses[0].id : null)
  );

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId),
    [addresses, selectedAddressId]
  );

  const selectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const addAddress = (addressData) => {
    const newId = addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;

    const newAddress = {
      id: newId,
      ...addressData,
    };

    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newId);
    return newAddress;
  };

  const updateAddress = (addressId, addressData) => {
    setAddresses((prev) => prev.map((a) => (a.id === addressId ? { ...a, ...addressData } : a)));
    toast.success("آدرس با موفقیت آپدیت شد", {
      richColors: true,
    });
  };

  const deleteAddress = (addressId) => {
    if (addresses.length <= 1) {
      throw new Error("حداقل باید یک آدرس وجود داشته باشد");
    }

    setAddresses((prev) => prev.filter((a) => a.id !== addressId));

    if (selectedAddressId === addressId) {
      const remaining = addresses.filter((a) => a.id !== addressId);
      setSelectedAddressId(remaining.length > 0 ? remaining[0].id : null);
    }
    toast.success("آدرس با موفقیت حذف شد", {
      richColors: true,
    });
  };

  return {
    addresses,
    selectedAddressId,
    selectedAddress,
    selectAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    DEFAULT_FORM_DATA,
  };
}
