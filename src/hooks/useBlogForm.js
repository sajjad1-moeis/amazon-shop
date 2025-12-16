import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { blogCategoryService } from "@/services/blog/blogCategoryService";
import { blogTagService } from "@/services/blog/blogTagService";
import { transformBlogToFormData } from "@/utils/blogFormUtils";

const initialFormData = {
  title: "",
  shortDescription: "",
  content: "",
  slug: "",
  authorId: null,
  categoryId: "",
  status: 1,
  isFeatured: false,
  allowComments: true,
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  scheduledPublishAt: "",
  tagIds: [],
  featuredImage: null,
  currentImageUrl: "",
};

export function useBlogForm(initialData = null) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialData || initialFormData);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([blogCategoryService.getActive(), blogTagService.getAll()]);

        if (categoriesRes.success) {
          setCategories(categoriesRes.data || []);
        }
        if (tagsRes.success) {
          setTags(tagsRes.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user?.user?.id) {
      setFormData((prev) => ({ ...prev, authorId: user.user.id }));
    }
  }, [user]);
  console.log(user);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, featuredImage: file }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId) ? prev.tagIds.filter((id) => id !== tagId) : [...prev.tagIds, tagId],
    }));
  };

  const setFormDataFromBlog = useCallback((blog) => {
    const transformed = transformBlogToFormData(blog);
    if (transformed) {
      setFormData(transformed);
    }
  }, []);

  return {
    formData,
    setFormData,
    categories,
    tags,
    loading,
    setLoading,
    fetching,
    setFetching,
    handleChange,
    handleFileChange,
    handleSelectChange,
    handleTagToggle,
    setFormDataFromBlog,
  };
}
