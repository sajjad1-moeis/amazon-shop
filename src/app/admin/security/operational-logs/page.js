"use client";

import { Suspense } from "react";
import OperationalLogsAdminPage from "@/template/Admin/operations/OperationalLogsAdminPage";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-24">
          <Spinner className="size-10" />
        </div>
      }
    >
      <OperationalLogsAdminPage />
    </Suspense>
  );
}
