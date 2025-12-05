import TabsSection from "@/template/CurrencyServices/TabsSection";
import PaymentSteps from "@/template/CurrencyServices/PaymentSteps";
import Benefits from "@/template/CurrencyServices/BenefitsSection";
import ServicesList from "@/template/CurrencyServices/ServicesList";
import Testimonials from "@/template/CurrencyServices/Testimonials";
import IndexLayout from "@/layout/IndexLayout";
import FAQSection from "@/components/module/FAQSection";
import { cn } from "@/lib/utils";

export const DotBg = ({ className }) => {
  return (
    <div className={cn("absolute top-0 h-1/3 md:h-3/4 w-full overflow-hidden", className)}>
      <img src="/image/CurrencyServices/dotBg.png" className="w-full h-full  object-contain" alt="" />
    </div>
  );
};

export default function CurrencyServices() {
  return (
    <IndexLayout>
      <div class="bg-gray-50 dark:bg-dark-bg">
        <TabsSection />
        <div class="relative">
          <DotBg className="liner-currency-white dark:hidden" />
          <DotBg className={"hidden dark:block liner-currency-dark"} />
          <div class="container relative">
            <Benefits />
            <ServicesList />
          </div>
        </div>
        <PaymentSteps />
        <Testimonials />
        <FAQSection />
        <div class="pb-10 md:pb-20" />
      </div>
    </IndexLayout>
  );
}
