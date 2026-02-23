"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddressList from "./AddressList";
import AddressForm from "./AddAddressModal";
import { userAddressService } from "@/services/userAddress/userAddressService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Link from "next/link";

function mapApiAddressToCard(apiAddress) {
  if (!apiAddress) return null;
  const name = [apiAddress.recipientName, apiAddress.recipientLastName].filter(Boolean).join(" ");
  return {
    id: apiAddress.id,
    name: name || apiAddress.title || "آدرس",
    address: apiAddress.fullAddress || apiAddress.addressLine1 || "",
    ...apiAddress,
  };
}

function mapFormToCreateDto(formData) {
  return {
    title: formData.title || "آدرس",
    recipientName: formData.firstName?.trim() || "",
    recipientLastName: formData.lastName?.trim() || "",
    recipientPhone: formData.mobile?.trim() || "",
    fixedPhone: formData.landline?.trim() || undefined,
    province: formData.province?.trim() || "",
    city: formData.city?.trim() || "",
    postalCode: formData.postalCode?.trim() || "",
    addressLine1: formData.address?.trim() || "",
    addressLine2: undefined,
    plaque: formData.plaque?.trim() || undefined,
    unit: formData.unit?.trim() || undefined,
    notes: formData.notes?.trim() || undefined,
    isDefault: false,
  };
}

function mapFormToUpdateDto(formData) {
  const dto = {};
  if (formData.firstName !== undefined) dto.recipientName = formData.firstName?.trim();
  if (formData.lastName !== undefined) dto.recipientLastName = formData.lastName?.trim();
  if (formData.mobile !== undefined) dto.recipientPhone = formData.mobile?.trim();
  if (formData.landline !== undefined) dto.fixedPhone = formData.landline?.trim() || undefined;
  if (formData.province !== undefined) dto.province = formData.province?.trim();
  if (formData.city !== undefined) dto.city = formData.city?.trim();
  if (formData.postalCode !== undefined) dto.postalCode = formData.postalCode?.trim();
  if (formData.address !== undefined) dto.addressLine1 = formData.address?.trim();
  if (formData.plaque !== undefined) dto.plaque = formData.plaque?.trim() || undefined;
  if (formData.unit !== undefined) dto.unit = formData.unit?.trim() || undefined;
  if (formData.notes !== undefined) dto.notes = formData.notes?.trim() || undefined;
  return dto;
}

export default function DeliveryAddress({ onNext, onSelectedAddressChange }) {
  const { user } = useAuth();
  const userId = user?.id;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const fetchAddresses = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const list = await userAddressService.getAddresses(userId);
      const mapped = (Array.isArray(list) ? list : []).map(mapApiAddressToCard).filter(Boolean);
      setAddresses(mapped);
      const defaultAddr = mapped.find((a) => a.isDefault) || mapped[0];
      if (defaultAddr && !selectedAddressId) {
        setSelectedAddressId(defaultAddr.id);
        onSelectedAddressChange?.(defaultAddr.id);
      }
    } catch (error) {
      toast.error(error?.message || "خطا در دریافت آدرس‌ها");
      console.error("Error fetching addresses:", error);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  useEffect(() => {
    onSelectedAddressChange?.(selectedAddressId);
  }, [selectedAddressId, onSelectedAddressChange]);

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

  const handleDeleteClick = async (addressId) => {
    if (!userId) return;
    if (addresses.length <= 1) {
      toast.error("حداقل باید یک آدرس وجود داشته باشد");
      return;
    }
    try {
      await userAddressService.deleteAddress(userId, addressId);
      toast.success("آدرس حذف شد");
      setAddresses((prev) => prev.filter((a) => a.id !== addressId));
      if (selectedAddressId === addressId) {
        const remaining = addresses.filter((a) => a.id !== addressId);
        const next = remaining[0]?.id ?? null;
        setSelectedAddressId(next);
        onSelectedAddressChange?.(next);
      }
    } catch (error) {
      toast.error(error?.message || "خطا در حذف آدرس");
    }
  };

  const handleSaveAddress = async (formData) => {
    if (!userId) return;
    const addressData = {
      ...formData,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      mobile: formData.mobile,
      landline: formData.landline,
    };
    try {
      if (editingAddress) {
        await userAddressService.updateAddress(userId, editingAddress.id, mapFormToUpdateDto(addressData));
        toast.success("آدرس به‌روزرسانی شد");
      } else {
        await userAddressService.createAddress(userId, mapFormToCreateDto(addressData));
        toast.success("آدرس اضافه شد");
      }
      setIsDialogOpen(false);
      setEditingAddress(null);
      fetchAddresses();
    } catch (error) {
      toast.error(error?.message || "خطا در ثبت آدرس");
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAddress(null);
  };

  if (!userId) {
    return (
      <div className="bg-white dark:bg-dark-field rounded-2xl shadow-sm p-6 dark:border dark:border-dark-stroke" dir="rtl">
        <p className="text-center text-gray-500 py-8">برای ادامه وارد حساب کاربری شوید.</p>
        <Link href="/cart">
          <Button variant="outline">بازگشت به سبد خرید</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-field rounded-2xl shadow-sm p-6 dark:border dark:border-dark-stroke" dir="rtl">
        <p className="text-center text-gray-500 py-8">در حال بارگذاری آدرس‌ها...</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="bg-white dark:bg-dark-field rounded-2xl shadow-sm p-6 dark:border dark:border-dark-stroke"
        dir="rtl"
      >
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
          onSelect={(id) => {
            setSelectedAddressId(id);
            onSelectedAddressChange?.(id);
          }}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        <div className="md:hidden">
          <button
            onClick={handleAddClick}
            className="flex justify-center w-full items-center gap-2 text-yellow-600 hover:text-yellow-500 transition-colors"
          >
            <Plus className="size-5" />
            <span className="font-medium">افزودن آدرس جدید</span>
          </button>
        </div>
        <div className="grid grid-cols-2 dark:bg-dark-field dark:rounded-t-xl items-center p-3 gap-3 max-md:fixed bottom-0 md:flex md:relative bg-white w-full right-0">
          <Link href="/cart">
            <Button className="bg-gray-100 dark:max-md:w-full text-gray-600 dark:text-white dark:bg-dark-stroke hover:bg-gray-200 font-medium px-6 py-2 rounded-lg">
              لغو
            </Button>
          </Link>
          <Button
            onClick={onNext}
            disabled={!selectedAddress}
            variant="ghost"
            className="bg-yellow-400 text-primary-800 font-medium px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            مرحله بعد
          </Button>
        </div>
      </div>

      <AddressForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        defaultValues={editingAddress ? parseAddressDataForForm(editingAddress) : null}
        onSubmit={handleSaveAddress}
      />
    </>
  );
}

function parseAddressDataForForm(addr) {
  return {
    province: addr.province || "",
    city: addr.city || "",
    address: addr.addressLine1 || addr.address || "",
    plaque: addr.plaque || "",
    unit: addr.unit || "",
    postalCode: addr.postalCode || "",
    firstName: addr.recipientName || addr.name?.split(" ")[0] || "",
    lastName: addr.recipientLastName || addr.name?.split(" ").slice(1).join(" ") || "",
    mobile: addr.recipientPhone || "",
    landline: addr.fixedPhone || "",
    notes: addr.notes || "",
  };
}
