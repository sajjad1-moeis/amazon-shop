import DashboardLayout from "@/layout/DashboardLayout";
import OrdersList from "@/template/Dashboard/Orders/OrdersList";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <OrdersList />
    </DashboardLayout>
  );
}

