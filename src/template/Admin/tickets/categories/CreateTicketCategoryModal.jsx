"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ticketCategoryService } from "@/services/ticket/ticketCategoryService";
import { toast } from "sonner";
import { FORM_STYLES } from "../../formStyles";

export default function CreateTicketCategoryModal({ isOpen, onClose, onSuccess, editingCategory }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingCategory) {
        setFormData({
          name: editingCategory.name || "",
          description: editingCategory.description || "",
          isActive: editingCategory.isActive !== undefined ? editingCategory.isActive : true,
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
  }, [isOpen, editingCategory]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "نام دسته‌بندی الزامی است";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "نام دسته‌بندی باید حداقل 2 کاراکتر باشد";
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
      const categoryData = {
        name: formData.name.trim(),
        description: formData.description?.trim() || "",
        isActive: formData.isActive,
      };

      let response;
      if (editingCategory) {
        response = await ticketCategoryService.update(editingCategory.id, categoryData);
      } else {
        response = await ticketCategoryService.create(categoryData);
      }

      if (response && response.success) {
        toast.success(editingCategory ? "دسته‌بندی با موفقیت به‌روزرسانی شد" : "دسته‌بندی با موفقیت ایجاد شد");
        onSuccess();
        onClose();
      } else {
        toast.error(response?.message || "خطا در ذخیره دسته‌بندی");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(error?.message || "خطا در ذخیره دسته‌بندی");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-800 border-gray-700" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-white">{editingCategory ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی جدید"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {editingCategory ? "اطلاعات دسته‌بندی را ویرایش کنید" : "اطلاعات دسته‌بندی جدید را وارد کنید"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={FORM_STYLES.label}>
              نام دسته‌بندی *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="مثال: پشتیبانی فنی"
              className={`${FORM_STYLES.input} ${errors.name ? "border-red-500" : ""}`}
              dir="rtl"
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={FORM_STYLES.label}>
              توضیحات
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="توضیحات اختیاری"
              className={FORM_STYLES.input}
              dir="rtl"
            />
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
              className="w-4 h-4 text-green-500 rounded focus:ring-green-500 bg-gray-700 border-gray-600"
            />
            <Label htmlFor="isActive" className={`${FORM_STYLES.label} cursor-pointer`}>
              فعال
            </Label>
          </div>

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
              {submitting ? "در حال ذخیره..." : editingCategory ? "به‌روزرسانی" : "ایجاد"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

