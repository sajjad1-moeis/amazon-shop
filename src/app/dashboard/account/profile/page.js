import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import BasicInfoCard from "@/template/Dashboard/Profile/BasicInfo/BasicInfoCard";
import FinancialInfoCard from "@/template/Dashboard/Profile/Financial/FinancialInfoCard";
import NotificationSettingsCard from "@/template/Dashboard/Profile/Notification/NotificationSettingsCard";
import SecurityCard from "@/template/Dashboard/Profile/Security/SecurityCard";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader title="پروفایل کاربری" description="مدیریت اطلاعات شخصی، امنیت و تنظیمات حساب" />

      {/* Bottom Section: Profile Cards */}
      <div className="space-y-4 sm:space-y-6">
        {/* Basic Information - First */}
        <BasicInfoCard />

        {/* Security & Financial - Side by Side */}
        <div className="flex flex-col-reverse lg:grid  lg:grid-cols-2 gap-4 sm:gap-6">
          <SecurityCard />
          <FinancialInfoCard />
        </div>

        {/* Notification Settings - Last */}
        <NotificationSettingsCard />
      </div>
    </DashboardLayout>
  );
}
