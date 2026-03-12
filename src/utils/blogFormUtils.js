const isEmptyHtml = (str) => {
  if (!str || typeof str !== "string") return true;
  const stripped = str.replace(/<[^>]*>/g, "").trim();
  return stripped === "";
};

export const validateBlogForm = (formData, requiredFields = ["title", "shortDescription", "content", "categoryId"]) => {
  const errors = [];

  requiredFields.forEach((field) => {
    const value = formData[field];
    if (field === "content") {
      if (isEmptyHtml(value)) errors.push(field);
    } else if (field === "authorId") {
      if (value == null || value === "" || (typeof value === "number" && Number.isNaN(value))) errors.push(field);
    } else if (!value || (typeof value === "string" && value.trim() === "")) {
      errors.push(field);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const transformBlogToFormData = (blog) => {
  if (!blog) return null;

  return {
    title: blog.title || "",
    shortDescription: blog.shortDescription || "",
    content: blog.content || "",
    slug: blog.slug || "",
    authorId: blog.authorId || null,
    categoryId: blog.categoryId?.toString() || "",
    status: blog.status || 1,
    isFeatured: blog.isFeatured || false,
    allowComments: blog.allowComments !== false,
    metaTitle: blog.metaTitle || "",
    metaDescription: blog.metaDescription || "",
    metaKeywords: blog.metaKeywords || "",
    scheduledPublishAt: blog.scheduledPublishAt
      ? new Date(blog.scheduledPublishAt).toISOString().slice(0, 16)
      : "",
    tagIds: blog.tags?.map((tag) => tag.id) || [],
    featuredImage: null,
    currentImageUrl: blog.featuredImageUrl || "",
  };
};

export const transformFormDataToBlogData = (formData) => {
  const categoryId = formData.categoryId != null && formData.categoryId !== "" ? parseInt(formData.categoryId, 10) : null;
  const authorId = formData.authorId != null && formData.authorId !== "" ? Number(formData.authorId) : null;
  const status = formData.status != null ? parseInt(formData.status, 10) : 1;

  return {
    title: formData.title?.trim() ?? "",
    content: formData.content ?? "",
    shortDescription: formData.shortDescription?.trim() ?? "",
    slug: (formData.slug?.trim()) || undefined,
    authorId: authorId != null && !Number.isNaN(authorId) ? authorId : undefined,
    categoryId: categoryId != null && !Number.isNaN(categoryId) ? categoryId : undefined,
    status: !Number.isNaN(status) ? status : 1,
    isFeatured: Boolean(formData.isFeatured),
    allowComments: formData.allowComments !== false,
    metaTitle: (formData.metaTitle?.trim()) || undefined,
    metaDescription: (formData.metaDescription?.trim()) || undefined,
    metaKeywords: (formData.metaKeywords?.trim()) || undefined,
    scheduledPublishAt: formData.scheduledPublishAt
      ? new Date(formData.scheduledPublishAt).toISOString()
      : undefined,
    tagIds: Array.isArray(formData.tagIds) ? formData.tagIds : [],
  };
};





