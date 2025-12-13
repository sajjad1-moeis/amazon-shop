import DashboardLayout from "@/layout/DashboardLayout";
import OrderDetail from "@/template/Dashboard/Orders/OrderDetail/OrderDetail";

export default function OrderDetailPage({ params }) {
  return (
    <DashboardLayout>
      <OrderDetail orderId={params.orderId} />
    </DashboardLayout>
  );
}

