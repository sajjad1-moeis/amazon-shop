import DashboardLayout from "@/layout/DashboardLayout";
import InvoicesList from "@/template/Dashboard/Invoices/InvoicesList";

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <InvoicesList />
    </DashboardLayout>
  );
}

