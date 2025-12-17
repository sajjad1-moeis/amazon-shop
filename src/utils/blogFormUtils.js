export const validateBlogForm = (formData, requiredFields = ["title", "shortDescription", "content", "categoryId"]) => {
  const errors = [];
  
  requiredFields.forEach((field) => {
    if (!formData[field] || (typeof formData[field] === "string" && formData[field].trim() === "")) {
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
  return {
    title: formData.title,
    content: formData.content,
    shortDescription: formData.shortDescription,
    slug: formData.slug || undefined,
    authorId: formData.authorId,
    categoryId: parseInt(formData.categoryId),
    status: parseInt(formData.status),
    isFeatured: formData.isFeatured,
    allowComments: formData.allowComments,
    metaTitle: formData.metaTitle || undefined,
    metaDescription: formData.metaDescription || undefined,
    metaKeywords: formData.metaKeywords || undefined,
    scheduledPublishAt: formData.scheduledPublishAt
      ? new Date(formData.scheduledPublishAt).toISOString()
      : null,
    tagIds: formData.tagIds.length > 0 ? formData.tagIds : undefined,
  };
};





