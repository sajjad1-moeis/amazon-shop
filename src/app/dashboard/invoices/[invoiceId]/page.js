import DashboardLayout from "@/layout/DashboardLayout";
import InvoiceDetail from "@/template/Dashboard/Invoices/InvoiceDetail/InvoiceDetail";

export default function InvoiceDetailPage({ params }) {
  return (
    <DashboardLayout>
      <InvoiceDetail invoiceId={params.invoiceId} />
    </DashboardLayout>
  );
}




