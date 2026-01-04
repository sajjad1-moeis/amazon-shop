import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "iconsax-reactjs";
import React from "react";

function BreadCrump({ items = [] }) {
  return (
    <Breadcrumb className="p-4 px-2">
      <BreadcrumbList className="">
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
  );
}

export default BreadCrump;
