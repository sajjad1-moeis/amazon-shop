"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function EditUserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    profileImage: "",
    isActive: true,
    isEmailVerified: false,
    isPhoneVerified: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        profileImage: user.profileImage || "",
        isActive: user.isActive !== undefined ? user.isActive : true,
        isEmailVerified: user.isEmailVerified !== undefined ? user.isEmailVerified : false,
        isPhoneVerified: user.isPhoneVerified !== undefined ? user.isPhoneVerified : false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.phoneNumber || !formData.firstName || !formData.lastName) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600">
        <h2 className="text-xl font-bold text-white mb-6">اطلاعات شخصی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-300">
              نام <span className="text-red-400">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-800 border-gray-600 text-white"
              required
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-300">
              نام خانوادگی <span className="text-red-400">*</span>
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-800 border-gray-600 text-white"
              required
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              ایمیل <span className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-gray-300">
              شماره تماس <span className="text-red-400">*</span>
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-gray-800 border-gray-600 text-white"
              required
              pattern="09[0-9]{9}"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage" className="text-gray-300">
              مسیر تصویر پروفایل
            </Label>
            <Input
              id="profileImage"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="uploads/user/1/profile/image.jpg"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600">
        <h2 className="text-xl font-bold text-white mb-6">تنظیمات</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive" className="text-gray-300">
              وضعیت فعال
            </Label>
            <Switch
              dir="ltr"
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isEmailVerified" className="text-gray-300">
              ایمیل تایید شده
            </Label>
            <Switch
              dir="ltr"
              id="isEmailVerified"
              checked={formData.isEmailVerified}
              onCheckedChange={(checked) => handleSwitchChange("isEmailVerified", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isPhoneVerified" className="text-gray-300">
              شماره تلفن تایید شده
            </Label>
            <Switch
              dir="ltr"
              id="isPhoneVerified"
              checked={formData.isPhoneVerified}
              onCheckedChange={(checked) => handleSwitchChange("isPhoneVerified", checked)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-3"
          onClick={onCancel}
          disabled={loading}
        >
          انصراف
        </Button>
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 rounded-xl">
          {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </form>
  );
}
