import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import AdminDashboardPage from "@/template/Admin/dashboard/AdminDashboardPage";

function DashboardFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] gap-4">
      <Spinner size="lg" />
      <p className="text-gray-400 text-sm">در حال بارگذاری داشبورد...</p>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <AdminDashboardPage />
    </Suspense>
  );
}
