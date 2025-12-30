import DashboardLayout from "@/layout/DashboardLayout";
import OverviewCards from "@/template/Dashboard/Index/OverviewCards";
import RecentOrders from "@/template/Dashboard/Index/RecentOrders";
import CurrencyRates from "@/template/Dashboard/Index/CurrencyRates";
import SupportTickets from "@/template/Dashboard/Index/SupportTickets";
import ProductSuggestions from "@/template/Dashboard/Index/ProductSuggestions";
import PageHeader from "@/template/Dashboard/Common/PageHeader";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader title={"داشبورد"} description={"وضعیت کلی حساب شما در یک نگاه"} />
      <OverviewCards />

      {/* Main Content Grid */}
      <RecentOrders />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <SupportTickets />
        </div>
        <CurrencyRates />
      </div>
    </DashboardLayout>
  );
}
