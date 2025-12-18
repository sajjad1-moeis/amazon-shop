"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-reactjs";
import { Spinner } from "@/components/ui/spinner";
import { useRoleForm } from "@/hooks/useRoleForm";
import RoleForm from "@/template/Admin/roles/RoleForm";
import PageHeader from "@/template/Admin/blog/form/PageHeader";

export default function EditRolePage() {
  const params = useParams();
  const router = useRouter();
  const roleId = params.id;
  const { formData, errors, loading, fetching, handleChange, handleSubmit } = useRoleForm(roleId);

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="ویرایش نقش" description="ویرایش اطلاعات نقش">
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
        isEdit={true}
      />
    </div>
  );
}
