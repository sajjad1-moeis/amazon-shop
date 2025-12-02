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
      <div className="absolute top-4 right-6">
        <Breadcrumb>
          <BreadcrumbList>
            {/* آیتم خانه ثابت */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <div className="flex items-center gap-2 text-primary-700">
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
                  <BreadcrumbItem className=" text-primary-700">
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-gray-600">{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* عنوان */}
      <p className="text-2xl md:text-3xl lg:text-4xl text-primary-700 font-bold  max-lg:mt-5 text-center">{title}</p>
      <p className="md:mt-5 mt-2 text-gray-500 max-md:text-xs text-center">{desc}</p>
    </div>
  );
}

export default IntroductionCard;
