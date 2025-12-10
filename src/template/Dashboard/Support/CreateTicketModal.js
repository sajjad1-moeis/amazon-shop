"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentUpload } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function CreateTicketModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "عنوان تیکت الزامی است";
    }
    if (!formData.category) {
      newErrors.category = "دسته بندی الزامی است";
    }
    if (!formData.priority) {
      newErrors.priority = "اولویت الزامی است";
    }
    if (!formData.description.trim()) {
      newErrors.description = "توضیحات الزامی است";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call onSubmit callback with form data
    if (onSubmit) {
      onSubmit(formData);
    }

    // Reset form
    setFormData({
      title: "",
      category: "",
      priority: "",
      description: "",
      file: null,
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle>ایجاد تیکت جدید</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Ticket Title */}
            <div className="md:col-span-1 space-y-2">
              <Label htmlFor="title">عنوان تیکت</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="عنوان تیکت..."
                className={cn(errors.title && "border-red-500")}
                dir="rtl"
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* Category */}
            <div className="md:col-span-1 space-y-2">
              <Label htmlFor="category">دسته بندی</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger id="category" className={cn(errors.category && "border-red-500")} dir="rtl">
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">مالی</SelectItem>
                  <SelectItem value="logistics">لجستیک</SelectItem>
                  <SelectItem value="technical">فنی</SelectItem>
                  <SelectItem value="general">عمومی</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>

            {/* Priority */}
            <div className="md:col-span-1 space-y-2">
              <Label htmlFor="priority">انتخاب اولویت</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger id="priority" className={cn(errors.priority && "border-red-500")} dir="rtl">
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">بالا</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="low">پایین</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && <p className="text-xs text-red-500">{errors.priority}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="توضیحات درخواست پشتیبانی..."
              rows={6}
              className={cn(errors.description && "border-red-500")}
              dir="rtl"
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>آپلود فایل</Label>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors bg-gray-50 dark:bg-gray-700/50"
              >
                <DocumentUpload size={32} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">برای آپلود کلیک کنید</span>
                {formData.file && (
                  <span className="mt-2 text-xs text-primary-600 dark:text-primary-400">{formData.file.name}</span>
                )}
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <DialogFooter className="flex-row-reverse gap-2">
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
              ثبت تیکت
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              لغو
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
