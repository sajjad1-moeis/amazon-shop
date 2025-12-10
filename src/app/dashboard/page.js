import DashboardLayout from "@/layout/DashboardLayout";
import OverviewCards from "@/template/Dashboard/Index/OverviewCards";
import RecentOrders from "@/template/Dashboard/Index/RecentOrders";
import CurrencyRates from "@/template/Dashboard/Index/CurrencyRates";
import SupportTickets from "@/template/Dashboard/Index/SupportTickets";
import ProductSuggestions from "@/template/Dashboard/Index/ProductSuggestions";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div>
        {/* Overview Cards */}
        <OverviewCards />

        {/* Main Content Grid */}
        <RecentOrders />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <SupportTickets />
          </div>
          <CurrencyRates />
        </div>

        {/* Product Suggestions */}
        <ProductSuggestions />
      </div>
    </DashboardLayout>
  );
}
