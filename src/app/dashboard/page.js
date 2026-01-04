import DashboardLayout from "@/layout/DashboardLayout";
import OverviewCards from "@/template/Dashboard/Index/OverviewCards";
import RecentOrders from "@/template/Dashboard/Index/RecentOrders";
import CurrencyRates from "@/template/Dashboard/Index/CurrencyRates";
import SupportTickets from "@/template/Dashboard/Index/SupportTickets";
import ProductSuggestions from "@/template/Dashboard/RecentViews/ProductSuggestions";
import PageHeader from "@/template/Dashboard/Common/PageHeader";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader title={"داشبورد"} description={"وضعیت کلی حساب شما در یک نگاه"} />
      <OverviewCards />

      {/* Main Content Grid */}
      <RecentOrders />

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 mt-8">
        <div className="xl:col-span-2">
          <SupportTickets />
        </div>
        <CurrencyRates />
      </div>
    </DashboardLayout>
  );
}
