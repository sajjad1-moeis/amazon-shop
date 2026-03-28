import IndexLayout from "@/layout/IndexLayout";
import OutletDealsPageClient from "@/template/Outlet/OutletDealsPageClient";
import DealsTopSection from "@/template/Outlet/DealsTopSection";
import TodayDealsHeroSection from "@/template/Outlet/TodayDealsHeroSection";

export const metadata = {
  title: "تخفیفات امروز | میکرولس",
  description: "صفحه اختصاصی تخفیفات امروز با لیست کامل محصولات و فیلترها.",
};

export default function TodayDealsPage() {
  return (
    <IndexLayout>
      <DealsTopSection activeTab="today" />
      <TodayDealsHeroSection />
      <OutletDealsPageClient activeTab="today" showTopSection={false} />
    </IndexLayout>
  );
}
