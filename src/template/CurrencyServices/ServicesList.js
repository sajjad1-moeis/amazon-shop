import { services } from "@/data";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ServicesList() {
  return (
    <div className="mb-20 mt-4 md:mt-36">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-dark-titre text-center mb-4 md:mb-12">
        سرویس‌های قابل ارائه
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        {services.map((service, index) => {
          return (
            <div
              key={service.id}
              className="bg-white dark:bg-dark-box rounded-lg shadow-lg dark:border-blue-700 p-3 flex flex-col h-full hover:shadow-lg transition-all"
            >
              {/* تصویر */}
              <div className="relative aspect-square md:mb-5 max-h-32 lg:max-h-56 w-full">
                <Image
                  src={`/image/CurrencyServices/service${index + 1}.png`}
                  alt={`محصول بازدید شده شماره `}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              {/* عنوان */}
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-dark-titre mb-3">{service.title}</h3>

              {/* بخش ویژگی‌ها (کشسان برای ایجاد ارتفاع برابر) */}
              <div className="space-y-2.5 text-right  p-2 rounded-xl bg-primary-50  dark:bg-dark-field flex flex-col flex-grow">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm max-md:text-xs flex items-center gap-2 text-primary-600  dark:text-dark-title"
                  >
                    <span className="bg-primary-600 dark:bg-dark-title mt-0.5 size-2 rounded-full"></span>
                    <p>{feature}</p>
                  </li>
                ))}
              </div>

              {/* دکمه (چسبنده به پایین) */}
              <Button className="w-full bg-primary-700 dark:bg-dark-primary hover:bg-blue-700 text-white mt-4 rounded-lg">
                {service.buttonText}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
