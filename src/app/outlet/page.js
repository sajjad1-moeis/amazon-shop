import IndexLayout from "@/layout/IndexLayout";
import OutletDealsPageClient from "@/template/Outlet/OutletDealsPageClient";

export const metadata = {
  title: "حراجی آمازون | اوتلت میکرولس",
  description: "صفحه حراجی آمازون با بنر، فیلتر حرفه‌ای و لیست محصولات تخفیف‌دار.",
};

export default function OutletPage() {
  return (
    <IndexLayout>
      <OutletDealsPageClient activeTab="outlet" />
    </IndexLayout>
  );
}
