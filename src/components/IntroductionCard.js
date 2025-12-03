import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Home } from "iconsax-reactjs";

function IntroductionCard({ items = [], title, desc = "" }) {
  return (
    <div className="relative bg-[url(/image/BgIntroduction.png)] py-8 flex items-center justify-center flex-col">
      {/* Breadcrumb */}

      <div class="absolute liner-introduction-white size-full inset-0 dark:hidden" />
      <div class="absolute liner-introduction-dark hidden dark:block size-full inset-0" />

      <div className="absolute top-4 right-6">
        <Breadcrumb>
          <BreadcrumbList>
            {/* آیتم خانه ثابت */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <div className="flex items-center gap-2 text-primary-700 dark:text-dark-title">
                  <Home size={20} variant="Bold" />
                  خانه
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* آیتم‌های داینامیک */}
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator className="rotate-180" />
                {item.href ? (
                  <BreadcrumbItem className=" text-primary-700 dark:text-dark-title">
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-gray-600 dark:text-dark-text">{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* عنوان */}
      <div class="relative">
        <p className="text-2xl md:text-3xl lg:text-4xl text-primary-700 dark:text-dark-title font-bold  max-lg:mt-5 text-center">
          {title}
        </p>
        <p className="md:mt-5 mt-2 text-gray-500 max-md:text-xs text-center dark:text-dark-text">{desc}</p>
      </div>
    </div>
  );
}

export default IntroductionCard;
