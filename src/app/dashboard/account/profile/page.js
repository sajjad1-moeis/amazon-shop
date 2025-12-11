import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import BasicInfoCard from "@/template/Dashboard/Profile/BasicInfoCard";
import FinancialInfoCard from "@/template/Dashboard/Profile/FinancialInfoCard";
import NotificationSettingsCard from "@/template/Dashboard/Profile/NotificationSettingsCard";
import SecurityCard from "@/template/Dashboard/Profile/SecurityCard";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader title="پروفایل کاربری" description="مدیریت اطلاعات شخصی، امنیت و تنظیمات حساب" />

      {/* Bottom Section: Profile Cards */}
      <div className="space-y-6">
        {/* Basic Information - First */}
        <BasicInfoCard />

        {/* Security & Financial - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SecurityCard />
          <FinancialInfoCard />
        </div>

        {/* Notification Settings - Last */}
        <NotificationSettingsCard />
      </div>
    </DashboardLayout>
  );
}
