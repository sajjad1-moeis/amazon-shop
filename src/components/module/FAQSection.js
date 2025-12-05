import FaqCard from "../FaqCard";
import { faqs } from "@/data";

export default function FAQSection() {
  return (
    <div className="container mt-14 md:mt-28" dir="rtl">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold lg:text-3xl dark:text-dark-title text-primary-700 mb-2 text-right flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-400  dark:bg-dark-title rounded"></div>
          سوالات متداول
        </h2>
      </div>

      <div type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq) => (
          <FaqCard {...faq} />
        ))}
      </div>
    </div>
  );
}
