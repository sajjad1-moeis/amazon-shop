"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocumentUpload } from "iconsax-reactjs";
import { ticketService } from "@/services/ticket/ticketService";
import { ticketCategoryService } from "@/services/ticket/ticketCategoryService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  title: z.string().min(3, "عنوان تیکت باید حداقل 3 کاراکتر باشد"),
  category: z.string().min(1, "دسته بندی الزامی است"),
  priority: z.enum(["high", "medium", "low"], { required_error: "اولویت الزامی است" }),
  description: z.string().min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
  file: z.instanceof(File).optional().nullable(),
});

const PRIORITY_MAP = { high: 3, medium: 2, low: 1 };
const PRIORITY_OPTIONS = [
  { value: "high", label: "بالا" },
  { value: "medium", label: "متوسط" },
  { value: "low", label: "پایین" },
];

export default function CreateTicketModal({ isOpen, onClose, onSubmit }) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      priority: undefined,
      description: "",
      file: null,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await ticketCategoryService.getActive();
      if (response?.success && response.data) {
        setCategories(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      toast.error("خطا در دریافت دسته‌بندی‌ها");
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("file", file);
    }
  };

  const onSubmitForm = async (data) => {
    setIsSubmitting(true);
    try {
      const ticketData = {
        subject: data.title.trim(),
        categoryId: parseInt(data.category, 10),
        priority: PRIORITY_MAP[data.priority],
        description: data.description.trim(),
        userId: user?.id,
      };

      const response = await ticketService.create(ticketData);

      if (response?.success && response.data?.id) {
        let fileUploadSuccess = true;

        if (data.file) {
          try {
            await ticketService.uploadTicketFile(response.data.id, data.file);
          } catch (fileError) {
            fileUploadSuccess = false;
            toast.warning("تیکت ایجاد شد اما فایل آپلود نشد");
          }
        }

        toast.success("تیکت با موفقیت ایجاد شد");
        form.reset();
        onClose();
        onSubmit?.();
      } else {
        toast.error(response?.message || "خطا در ایجاد تیکت");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "خطا در ایجاد تیکت");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle>ایجاد تیکت جدید</DialogTitle>
          <DialogDescription>لطفاً اطلاعات تیکت را تکمیل کنید</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان تیکت</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="عنوان تیکت..." dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>دسته بندی</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={loadingCategories}>
                      <FormControl>
                        <SelectTrigger dir="rtl">
                          <SelectValue placeholder={loadingCategories ? "در حال بارگذاری..." : "انتخاب کنید"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {loadingCategories ? (
                          <SelectItem value="__loading__" disabled>
                            در حال بارگذاری...
                          </SelectItem>
                        ) : categories.length === 0 ? (
                          <SelectItem value="__empty__" disabled>
                            دسته‌بندی‌ای یافت نشد
                          </SelectItem>
                        ) : (
                          categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>انتخاب اولویت</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger dir="rtl">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRIORITY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="توضیحات درخواست پشتیبانی..." rows={6} dir="rtl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آپلود فایل</FormLabel>
                  <FormControl>
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
                        {field.value && (
                          <span className="mt-2 text-xs text-primary-600 dark:text-primary-400">
                            {field.value.name}
                          </span>
                        )}
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex-row gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="w-full">
                لغو
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-600 w-full hover:bg-primary-700 text-white"
              >
                {isSubmitting ? "در حال ثبت..." : "ثبت تیکت"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
