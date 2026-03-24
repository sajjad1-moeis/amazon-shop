import IndexLayout from "@/layout/IndexLayout";
import OutletPageClient from "@/template/Outlet/OutletPageClient";

export const metadata = {
  title: "حراجی آمازون | اوتلت میکرولس",
  description: "صفحه حراجی آمازون با بنر، فیلتر حرفه‌ای و لیست محصولات تخفیف‌دار.",
};

export default function OutletPage() {
  return (
    <IndexLayout>
      <OutletPageClient />
    </IndexLayout>
  );
}
