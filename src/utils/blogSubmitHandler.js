import { blogService } from "@/services/blog/blogService";
import { toast } from "sonner";
import { validateBlogForm, transformFormDataToBlogData } from "./blogFormUtils";

export const handleBlogSubmit = async ({
  formData,
  blogId = null,
  featuredImage = null,
  isEdit = false,
  onSuccess,
  skipValidation = false,
}) => {
  if (!skipValidation) {
    const validation = validateBlogForm(formData);
    if (!validation.isValid) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      return { success: false, error: "Validation failed" };
    }
  }

  const blogData = transformFormDataToBlogData(formData);
  try {
    const response = isEdit
      ? await blogService.update(blogId, blogData)
      : await blogService.create(blogData);

    if (!response.success) {
      toast.error(response.message || `خطا در ${isEdit ? "به‌روزرسانی" : "ایجاد"} بلاگ`);
      return { success: false, error: response.message };
    }

    const createdOrUpdatedBlogId = response.data?.id || blogId;

    if (featuredImage && createdOrUpdatedBlogId) {
      try {
        await blogService.uploadFeaturedImage(createdOrUpdatedBlogId, featuredImage);
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        toast.warning(
          `بلاگ ${isEdit ? "به‌روزرسانی" : "ایجاد"} شد اما آپلود تصویر با خطا مواجه شد`
        );
      }
    }

    toast.success(`بلاگ با موفقیت ${isEdit ? "به‌روزرسانی" : "ایجاد"} شد`);
    
    if (onSuccess) {
      onSuccess();
    }

    return { success: true, data: response.data };
  } catch (error) {
    toast.error(error.message || `خطا در ${isEdit ? "به‌روزرسانی" : "ایجاد"} بلاگ`);
    console.error(`Error ${isEdit ? "updating" : "creating"} blog:`, error);
    return { success: false, error: error.message };
  }
};

