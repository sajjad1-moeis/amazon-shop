"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import FormSection from "./FormSection";
import TagsSection from "./TagsSection";
import ImageUploadSection from "./ImageUploadSection";
import { FORM_SECTIONS, FORM_STYLES } from "./blogFormConfig";

export default function BlogForm({
  formData,
  categories,
  tags,
  loading,
  onSubmit,
  onChange,
  onSelectChange,
  onContentChange,
  onTagToggle,
  onFileChange,
  isEdit = false,
  backHref,
  backLabel = "بازگشت به لیست",
}) {
  const optionsData = {
    categories,
  };

  return (
    <div className={FORM_STYLES.card}>
      <form onSubmit={onSubmit} className="p-6 space-y-8">
          <FormSection
            section={FORM_SECTIONS.basic}
            formData={formData}
            onChange={onChange}
            onSelectChange={onSelectChange}
            onContentChange={onContentChange}
            optionsData={optionsData}
            styles={FORM_STYLES}
            isEdit={isEdit}
          />

          <FormSection
            section={FORM_SECTIONS.content}
            formData={formData}
            onChange={onChange}
            onSelectChange={onSelectChange}
            onContentChange={onContentChange}
            styles={FORM_STYLES}
          />

          <FormSection
            section={FORM_SECTIONS.meta}
            formData={formData}
            onChange={onChange}
            onSelectChange={onSelectChange}
            onContentChange={onContentChange}
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

          <div className="flex justify-between items-center pt-6 border-t border-gray-700/60">
            <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
              {loading ? "در حال ثبت..." : isEdit ? "به‌روزرسانی وبلاگ" : "ثبت وبلاگ"}
            </Button>
            {backHref && (
              <Link
                href={backHref}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowRight size={16} />
                {backLabel}
              </Link>
            )}
          </div>
        </form>
    </div>
  );
}
