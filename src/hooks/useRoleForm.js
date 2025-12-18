import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { roleService } from "@/services/role/roleService";

export const useRoleForm = (roleId = null) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!roleId);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  const fetchRole = useCallback(async () => {
    if (!roleId) return;

    try {
      setFetching(true);
      const response = await roleService.getRoleDetailForAdmin(roleId);

      if (response && response.success && response.data) {
        const role = response.data;
        setFormData({
          name: role.name || "",
          description: role.description || "",
          isActive: role.isActive !== undefined ? role.isActive : true,
        });
      } else {
        toast.error(response?.message || "خطا در دریافت اطلاعات نقش");
        router.push("/admin/roles");
      }
    } catch (error) {
      console.error("Error fetching role:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در دریافت اطلاعات نقش";
      toast.error(errorMessage);
      router.push("/admin/roles");
    } finally {
      setFetching(false);
    }
  }, [roleId, router]);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

    setLoading(true);

    try {
      const roleData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
      };

      if (roleId) {
        roleData.isActive = formData.isActive;
      }

      let response;
      if (roleId) {
        response = await roleService.updateRole(roleId, roleData);
      } else {
        response = await roleService.createRole(roleData);
      }

      if (response && response.success) {
        toast.success(roleId ? "نقش با موفقیت به‌روزرسانی شد" : "نقش جدید با موفقیت ایجاد شد");
        router.push("/admin/roles");
      } else {
        toast.error(response?.message || (roleId ? "خطا در به‌روزرسانی نقش" : "خطا در ایجاد نقش"));
      }
    } catch (error) {
      console.error("Error saving role:", error);
      const errorMessage =
        error?.response?.data?.message || error?.message || (roleId ? "خطا در به‌روزرسانی نقش" : "خطا در ایجاد نقش");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    fetching,
    handleChange,
    handleSubmit,
  };
};
