"use client";

import { Button } from "@/components/ui/button";
import { userAddressService } from "@/services/userAddress/userAddressService";
import DashboardLayout from "@/layout/DashboardLayout";
import AddressesList from "@/template/Dashboard/Addresses/AddressesList";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import AddressForm from "@/template/StepsCart/Step1/AddAddressModal";
import { formatAddress, formatFullName, parseAddressData } from "@/utils/address-utlis";
import { Add } from "iconsax-reactjs";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

function mapApiAddressToLocal(addr) {
  if (!addr) return null;
  const name = addr.name ?? `${addr.firstName ?? ""} ${addr.lastName ?? ""}`.trim();
  const address = addr.address ?? formatAddress(addr);
  return {
    id: addr.id,
    name: name || "آدرس",
    address,
    province: addr.province,
    city: addr.city,
    plaque: addr.plaque,
    unit: addr.unit,
    postalCode: addr.postalCode,
    firstName: addr.firstName,
    lastName: addr.lastName,
    mobile: addr.mobile,
    landline: addr.landline,
    notes: addr.notes,
    isDefault: addr.isDefault ?? addr.isDefaultAddress ?? false,
  };
}

function formDataToApiBody(formData) {
  return {
    province: formData.province,
    city: formData.city,
    address: formData.address,
    plaque: formData.plaque || undefined,
    unit: formData.unit || undefined,
    postalCode: formData.postalCode || undefined,
    firstName: formData.firstName,
    lastName: formData.lastName,
    mobile: formData.mobile,
    landline: formData.landline || undefined,
    notes: formData.notes || undefined,
  };
}

export default function AddressesPage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchAddresses = useCallback(async () => {
    if (userId == null) return;
    setLoading(true);
    try {
      const res = await userAddressService.getAddresses(userId);
      const data = unwrapApiData(res);
      const list = Array.isArray(data) ? data : data?.items ?? data?.addresses ?? [];
      setAddresses(list.map(mapApiAddressToLocal).filter(Boolean));
    } catch (err) {
      toast.error(err?.message ?? "خطا در دریافت آدرس‌ها");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSaveAddress = async (formData) => {
    if (userId == null) return;
    setSaving(true);
    try {
      const body = formDataToApiBody(formData);
      const addressData = {
        name: formatFullName(formData),
        address: formatAddress(formData),
        ...formData,
      };

      if (editingAddress) {
        await userAddressService.updateAddress(userId, editingAddress.id, body);
        setAddresses((prev) =>
          prev.map((a) => (a.id === editingAddress.id ? { ...a, ...addressData } : a))
        );
        toast.success("آدرس با موفقیت ویرایش شد");
      } else {
        const res = await userAddressService.createAddress(userId, body);
        const created = unwrapApiData(res);
        const mapped = mapApiAddressToLocal(created);
        if (mapped) setAddresses((prev) => [...prev, mapped]);
        toast.success("آدرس با موفقیت اضافه شد");
      }
      setIsModalOpen(false);
      setEditingAddress(null);
    } catch (err) {
      toast.error(err?.message ?? "خطا در ذخیره آدرس");
    } finally {
      setSaving(false);
    }
  };

  const addAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const updateAddress = async (addressId, addressData) => {
    if (userId == null) return;
    try {
      const body = formDataToApiBody(addressData);
      await userAddressService.updateAddress(userId, addressId, body);
      setAddresses((prev) =>
        prev.map((a) => (a.id === addressId ? { ...a, ...addressData } : a))
      );
      toast.success("آدرس با موفقیت ویرایش شد");
    } catch (err) {
      toast.error(err?.message ?? "خطا در ویرایش آدرس");
    }
  };

  const deleteAddress = async (addressId) => {
    if (userId == null || addresses.length <= 1) {
      if (addresses.length <= 1) toast.error("حداقل باید یک آدرس وجود داشته باشد");
      return;
    }
    try {
      await userAddressService.deleteAddress(userId, addressId);
      setAddresses((prev) => prev.filter((a) => a.id !== addressId));
      toast.success("آدرس با موفقیت حذف شد");
    } catch (err) {
      toast.error(err?.message ?? "خطا در حذف آدرس");
    }
  };

  const setDefaultAddress = async (addressId) => {
    if (userId == null) return;
    try {
      await userAddressService.setDefaultAddress(userId, addressId);
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a.id === addressId }))
      );
      toast.success("آدرس پیش‌فرض با موفقیت تغییر کرد");
    } catch (err) {
      toast.error(err?.message ?? "خطا در تغییر آدرس پیش‌فرض");
    }
  };

  const handleAddClick = () => setIsModalOpen(true);

  const bindComp = {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    handleAddClick,
    editingAddress,
    setEditingAddress,
  };

  return (
    <DashboardLayout>
      <PageHeader
        actionButton={
          <div className="md:hidden">
            <AdressBtn onClick={() => { setEditingAddress(null); handleAddClick(); }} />
          </div>
        }
        title="آدرس های من"
        description="مدیریت آدرسهای ثبت شده برای ارسال سفارش ها"
      >
        <div className="max-md:hidden">
          <AdressBtn onClick={() => { setEditingAddress(null); handleAddClick(); }} />
        </div>
      </PageHeader>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <AddressesList {...bindComp} />
      )}

      <AddressForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(null);
        }}
        defaultValues={editingAddress ? parseAddressData(editingAddress) : null}
        onSubmit={handleSaveAddress}
      />
    </DashboardLayout>
  );
}

function AdressBtn({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="bg-yellow-500 max-md:w-full hover:bg-yellow-600 text-gray-800"
    >
      افزودن آدرس
      <Add size={20} />
    </Button>
  );
}
