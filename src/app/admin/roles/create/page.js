"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-reactjs";
import { useRoleForm } from "@/hooks/useRoleForm";
import RoleForm from "@/template/Admin/roles/RoleForm";
import PageHeader from "@/template/Admin/blog/form/PageHeader";

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
          className="text-white border-gray-600 hover:bg-gray-700"
        >
          <ArrowRight size={20} className="ml-2" />
          بازگشت به لیست
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
