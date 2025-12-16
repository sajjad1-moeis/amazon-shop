"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormSection from "./FormSection";
import TagsSection from "./TagsSection";
import ImageUploadSection from "./ImageUploadSection";
import { FORM_SECTIONS, FORM_STYLES } from "@/config/blogFormConfig";

export default function BlogForm({
  formData,
  categories,
  tags,
  loading,
  onSubmit,
  onChange,
  onSelectChange,
  onTagToggle,
  onFileChange,
  isEdit = false,
}) {
  const optionsData = {
    categories,
  };

  return (
    <Card className={FORM_STYLES.card}>
      <CardHeader>
        <CardTitle className={FORM_STYLES.cardTitle}>
          {isEdit ? "ویرایش وبلاگ" : "اضافه کردن وبلاگ"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormSection
            section={FORM_SECTIONS.basic}
            formData={formData}
            onChange={onChange}
            onSelectChange={onSelectChange}
            optionsData={optionsData}
            styles={FORM_STYLES}
          />

          <FormSection
            section={FORM_SECTIONS.content}
            formData={formData}
            onChange={onChange}
            onSelectChange={onSelectChange}
            styles={FORM_STYLES}
          />

          <FormSection
            section={FORM_SECTIONS.meta}
            formData={formData}
            onChange={onChange}
            onSelectChange={onSelectChange}
            styles={FORM_STYLES}
          />

          <TagsSection
            tags={tags}
            selectedTagIds={formData.tagIds}
            onTagToggle={onTagToggle}
          />

          <ImageUploadSection
            featuredImage={formData.featuredImage}
            currentImageUrl={formData.currentImageUrl}
            onFileChange={onFileChange}
            isEdit={isEdit}
          />

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {loading
                ? "در حال ثبت..."
                : isEdit
                ? "به‌روزرسانی وبلاگ"
                : "ثبت وبلاگ"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
