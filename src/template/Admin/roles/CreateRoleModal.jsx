"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { roleService } from "@/services/role/roleService";
import { toast } from "sonner";

export default function CreateRoleModal({ isOpen, onClose, onSuccess, editingRole }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingRole) {
        setFormData({
          name: editingRole.name || "",
          description: editingRole.description || "",
          isActive: editingRole.isActive !== undefined ? editingRole.isActive : true,
        });
      } else {
        setFormData({
          name: "",
          description: "",
          isActive: true,
        });
      }
      setErrors({});
    }
  }, [isOpen, editingRole]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "نام نقش الزامی است";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "نام نقش نمی‌تواند بیشتر از 50 کاراکتر باشد";
    }
    if (!formData.description || !formData.description.trim()) {
      newErrors.description = "توضیحات نقش الزامی است";
    } else if (formData.description.trim().length > 500) {
      newErrors.description = "توضیحات نقش نمی‌تواند بیشتر از 500 کاراکتر باشد";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const roleData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
      };

      let response;
      if (editingRole) {
        // برای ویرایش، isActive را هم اضافه می‌کنیم
        roleData.isActive = formData.isActive;
        response = await roleService.updateRole(editingRole.id, roleData);
      } else {
        response = await roleService.createRole(roleData);
      }

      if (response && response.success) {
        toast.success(editingRole ? "نقش با موفقیت به‌روزرسانی شد" : "نقش جدید با موفقیت ایجاد شد");
        onSuccess();
        onClose();
      } else {
        toast.error(response?.message || "خطا در ذخیره نقش");
      }
    } catch (error) {
      console.error("Error saving role:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در ذخیره نقش";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-800 border-gray-700" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-white">{editingRole ? "ویرایش نقش" : "ایجاد نقش جدید"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {editingRole ? "اطلاعات نقش را ویرایش کنید" : "اطلاعات نقش جدید را وارد کنید"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              نام نقش * <span className="text-xs text-gray-500">(حداکثر 50 کاراکتر)</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="مثال: Editor"
              className={`bg-gray-800 bg-opacity-50 border-gray-700 text-white ${
                errors.name ? "border-red-500" : ""
              }`}
              dir="rtl"
              maxLength={50}
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
            <p className="text-xs text-gray-500">{formData.name.length}/50</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              توضیحات نقش * <span className="text-xs text-gray-500">(حداکثر 500 کاراکتر)</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="توضیحات نقش را وارد کنید"
              className={`bg-gray-800 bg-opacity-50 border-gray-700 text-white ${
                errors.description ? "border-red-500" : ""
              }`}
              dir="rtl"
              rows={4}
              maxLength={500}
            />
            {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
            <p className="text-xs text-gray-500">{formData.description.length}/500</p>
          </div>

          {editingRole && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
                className="w-4 h-4 text-green-500 rounded focus:ring-green-500 bg-gray-700 border-gray-600"
              />
              <Label htmlFor="isActive" className="text-gray-300 cursor-pointer">
                فعال
              </Label>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              لغو
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {submitting ? "در حال ذخیره..." : editingRole ? "به‌روزرسانی" : "ایجاد"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

