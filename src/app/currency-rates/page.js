import IndexLayout from "@/layout/IndexLayout";
import RateChart from "@/template/CurrencyRates/RateChart";
import DirhamComparisonCard from "@/template/CurrencyRates/DirhamComparisonCard";
import CurrencyRatesTable from "@/template/CurrencyRates/CurrencyRatesTable";
import DescriptionSection from "@/template/CurrencyRates/DescriptionSection";
import MainRatesGrid from "@/template/CurrencyRates/MainRatesGrid";
import Image from "next/image";

export default function CurrencyRatesPage() {
  return (
    <IndexLayout>
      <div className="bg-gray-50 dark:bg-dark-bg min-h-screen">
        <Image
          src="/image/currency-rates.png"
          alt="سپر کیفیت میکرولس"
          width={1200}
          height={600}
          priority
          className="w-full h-auto object-cover"
        />
        <div className="container px-4 py-6 md:py-8">
          {/* نمودار تغییرات نرخ درهم امارات - بالا */}
          <MainRatesGrid />
          <div className="mb-8 md:mb-12  mt-28">
            <RateChart />
          </div>

          {/* دو کارت کنار هم: مقایسه نرخ درهم و جدول نرخ ارزها */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            <div class="lg:col-span-2">
              <CurrencyRatesTable />
            </div>
            <DirhamComparisonCard />
          </div>

          {/* بخش توضیحات - پایین */}
          <DescriptionSection />
        </div>
      </div>
    </IndexLayout>
  );
}
