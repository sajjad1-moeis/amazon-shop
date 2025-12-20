"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "iconsax-reactjs";
import { useRoleForm } from "@/hooks/useRoleForm";
import RoleForm from "@/template/Admin/roles/RoleForm";
import PageHeader from "@/template/Admin/blog/form/PageHeader";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function CreateRolePage() {
  const router = useRouter();
  const { formData, errors, loading, handleChange, handleSubmit } = useRoleForm();

  return (
    <div className="space-y-6">
      <PageHeader title="نقش جدید" description="ایجاد نقش جدید در سیستم">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/roles")}
          className={FORM_STYLES.button}
        >
          بازگشت به لیست
          <ArrowLeft size={20} className="ml-2" />
        </Button>
      </PageHeader>

      <RoleForm
        formData={formData}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </div>
  );
}
