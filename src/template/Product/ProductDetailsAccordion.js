"use client";

import { useState } from "react";
import { ChevronUp, Pencil, Truck, ShoppingBag, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const productDescription = `ساعت Invicta Reserve 0361 ترکیبی از قدرت، ظرافت و عملکرد دقیق است. این ساعت با موتور کرونوگراف سوئیسی و مقاومت در برابر آب، برای مردانی طراحی شده که به کیفیت و جزئیات اهمیت می‌دهند. قاب ضخیم استیل و بند محکم، همراه با صفحه چند لایه و عقربه‌های براق، ظاهری لوکس و حرفه‌ای ایجاد می‌کند. این ساعت بخشی از سری Reserve است که توسط Invicta برای علاقه‌مندان به دقت و دوام طراحی شده است.`;

const technicalSpecs = [
  { label: "کشور سازنده", value: "سوئیس" },
  { label: "جنس بدنه", value: "استیل ضدزنگ" },
  { label: "نوع موتور", value: "کوارتز کرونوگراف" },
  { label: "مقاومت در برابر آب", value: "تا عمق ۲۰۰ متر" },
  { label: "جنس بند", value: "استیل برس خورده" },
  { label: "شیشه", value: "مینرال مقاوم در برابر خط و خش" },
  { label: "قطر قاب", value: "۵۲ میلی متر" },
  { label: "رنگ بند و قاب", value: "نقره‌ای" },
];

const serviceGuarantees = [
  {
    icon: Shield,
    title: "تضمین اصالت و کیفیت",
  },
  {
    icon: Truck,
    title: "ارسال مطمئن به ایران",
  },
  {
    icon: ShoppingBag,
    title: "خرید مستقیم از آمازون",
  },
  {
    icon: Pencil,
    title: "پرداخت امن ریالی",
  },
];

// export default function ProductDetailsAccordion() {
//   const [accordionValue, setAccordionValue] = useState(["about", "specs"]);

//   // محاسبه اینکه آیا همه آکوردین‌های والد باز هستند
//   const isAllExpanded = accordionValue.length === 2;

//   const handleToggleExpand = () => {
//     if (isAllExpanded) {
//       // همه باز هستند، پس همه را ببند
//       setAccordionValue([]);
//     } else {
//       // همه بسته هستند، پس همه را باز کن
//       setAccordionValue(["about", "specs"]);
//     }
//   };

//   return (
//     <div className="w-full bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
//       <div className="max-w-7xl mx-auto px-4">
//         <Accordion
//           type="multiple"
//           value={accordionValue}
//           onValueChange={setAccordionValue}
//           className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
//         >
//           {/* About Product Accordion */}
//           <AccordionItem value="about" className="border-b border-gray-200 dark:border-gray-700">
//             <AccordionTrigger className="px-6 py-4 hover:no-underline justify-start [&>div]:hidden [&>svg]:hidden group">
//               <div className="flex items-center gap-2 flex-row-reverse w-full">
//                 <span className="text-lg font-semibold text-gray-900 dark:text-white">درباره محصول</span>
//                 <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180" />
//               </div>
//             </AccordionTrigger>
//             <AccordionContent className="px-6 pb-6 pt-0">
//               <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed text-right">
//                 {productDescription}
//               </p>
//             </AccordionContent>
//           </AccordionItem>

//           {/* Technical Specifications Accordion */}
//           <AccordionItem value="specs" className="border-b border-gray-200 dark:border-gray-700">
//             <AccordionTrigger className="px-6 py-4 hover:no-underline justify-start [&>div]:hidden [&>svg]:hidden group">
//               <div className="flex items-center gap-2 flex-row-reverse w-full">
//                 <span className="text-lg font-semibold text-gray-900 dark:text-white">مشخصات فنی</span>
//                 <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180" />
//               </div>
//             </AccordionTrigger>
//             <AccordionContent className="px-6 pb-6 pt-0">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
//                 {technicalSpecs.map((spec, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-row items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
//                   >
//                     <span className="text-sm text-gray-900 dark:text-white text-left flex-1">{spec.value}</span>
//                     <span className="text-sm font-medium text-gray-600 dark:text-gray-400 text-right flex-1">
//                       {spec.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>

//         {/* Show Less/More Button */}

//         {/* Service Guarantees Section */}
//       </div>
//     </div>
//   );
// }

export default function AccordionDemo() {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>درباره محصول</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-[#484B4F]">
              ساعت Invicta Reserve 0361 ترکیبی از قدرت، ظرافت و عملکرد دقیق است. با موتور کرونوگراف سوئیسی و طراحی مقاوم
              در برابر فشار آب، انتخابی مناسب برای مردانی است که کیفیت و جزئیات برایشان اهمیت دارد. قاب استیل ضخیم، بند
              محکم و صفحه چندلایه با عقربه‌های براق، جلوه‌ای لوکس و حرفه‌ای ایجاد می‌کند. این مدل بخشی از سری Reserve
              است — مجموعه‌ای که Invicta برای عاشقان دقت و دوام طراحی کرده است.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>مشخصات فنی</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="grid grid-cols-1 gap-0">
              {technicalSpecs.map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 text-right flex-1">
                    {spec.label}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white  flex-1">{spec.value}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="text-center mt-6">
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors">
          {"نمایش کمتر"}
        </button>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 border border-gray-200 p-2 rounded-xl">
        {serviceGuarantees.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="size-11 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3">
                <Icon size={28} className=" text-gray-500 dark:text-gray-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-white">{service.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
