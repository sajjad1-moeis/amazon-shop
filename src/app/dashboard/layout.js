import DashboardAuthGuard from "./DashboardAuthGuard";

export default function DashboardLayout({ children }) {
  return <DashboardAuthGuard>{children}</DashboardAuthGuard>;
}
