import TabsSection from "@/template/CurrencyServices/TabsSection";
import PaymentSteps from "@/template/CurrencyServices/PaymentSteps";
import Benefits from "@/template/CurrencyServices/BenefitsSection";
import ServicesList from "@/template/CurrencyServices/ServicesList";
import Testimonials from "@/template/CurrencyServices/Testimonials";
import IndexLayout from "@/layout/IndexLayout";
import FAQSection from "@/components/module/FAQSection";
import WhyGiftCardSection from "@/template/GiftCart/WhyGiftCardSection";
import CurrencyPaymentForm from "@/template/CurrencyServices/CurrencyPayment";
import HeroSection from "@/template/GiftCart/HeroSection";
import GiftCardStepsSection from "@/template/GiftCart/BuyStepsSection";
import BestSellingSection from "@/template/GiftCart/BestSellingSection";
import { DotBg } from "../currency-services/page";

export default function CurrencyServices() {
  return (
    <IndexLayout>
      <div className="bg-gray-50 dark:bg-dark-bg">
        <HeroSection />
        <div className="relative">
          <DotBg className="liner-currency-white dark:hidden" />
          <DotBg className={"hidden dark:block liner-currency-dark"} />

          <div className="container relative">
            <BestSellingSection />
            <WhyGiftCardSection />
          </div>
        </div>
        <GiftCardStepsSection />
        <Testimonials />
        <FAQSection />
        <div className="pb-10 md:pb-20" />
      </div>
    </IndexLayout>
  );
}
