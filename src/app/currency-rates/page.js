import IndexLayout from "@/layout/IndexLayout";
import CurrencyRatesSection from "@/template/Home/CurrencyRatesSection";
import MainRatesGrid from "@/template/CurrencyRates/MainRatesGrid";
import RateChart from "@/template/CurrencyRates/RateChart";

export default function CurrencyRatesPage() {
  return (
    <IndexLayout>
      <div className="bg-gray-50 dark:bg-dark-bg min-h-screen">
        {/* بخش نرخ لحظه‌ای ارز */}
        <CurrencyRatesSection />

        <div className="container px-4 py-6 md:py-8">
          {/* Main Exchange Rates Section */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              نرخ ارزهای اصلی
            </h2>
            <MainRatesGrid />
          </div>

          {/* Historical Rate Chart Section */}
          <div className="mt-8 md:mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              نمودار تغییرات نرخ درهم امارات
            </h2>
            <RateChart />
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}

