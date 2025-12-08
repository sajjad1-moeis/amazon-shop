"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ADMIN_SIDEBAR_ITEMS } from "@/data/adminSidebarData";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const SideBarContent = () => {
  const pathname = usePathname();
  const [defaultValue, setDefaultValue] = useState("");
  const keyLocation = pathname?.split("/admin/")[1] || "index";

  useEffect(() => {
    ADMIN_SIDEBAR_ITEMS.forEach((item) => {
      if (item.children && keyLocation.includes(item.key)) {
        setDefaultValue(item.key);
      }
    });
  }, [pathname, keyLocation]);

  const isActive = (item) => {
    if (item.children) {
      return item.children.some((child) => pathname === child.href) || keyLocation.includes(item.key);
    }
    return pathname === item.href;
  };

  return (
    <div className="h-full lg:bg-gray-800 lg:bg-opacity-50 border-0 lg:!border-l lg:border-gray-700 backdrop-blur-md lg:p-4 flex flex-col lg:shadow-lg">
      <Link href="/" className="flex flex-col items-center">
        <Image
          src="/image/logo.png"
          alt="لوگو"
          width={120}
          height={50}
          className="max-w-[120px] my-3 filter invert brightness-0"
        />
      </Link>

      <nav className="mt-5 flex-grow">
        <Accordion type="single" collapsible defaultValue={defaultValue} className="w-full">
          {ADMIN_SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            if (item.children) {
              return (
                <AccordionItem key={item.key} value={item.key} className="border-none mb-2">
                  <AccordionTrigger
                    className={cn(
                      "flex items-center gap-2 p-2 px-3 text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-700 transition-colors [&[data-state=open]>svg]:rotate-180",
                      active && "bg-gray-700"
                    )}
                  >
                    <Icon
                      variant="Bold"
                      className="!rotate-0"
                      size={20}
                      style={{ color: item.color, minWidth: "20px" }}
                    />
                    <p className="ml-4 whitespace-nowrap text-base flex-grow text-right text-white">{item.name}</p>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <ul className="p-3 space-y-2 border-b border-b-white/15">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "block p-2 text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-700 transition-colors text-white",
                              pathname === child.href && "bg-gray-700"
                            )}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            }

            return (
              <Link key={item.href} href={item.href} className="block mb-2">
                <div
                  className={cn(
                    "flex items-center gap-2 p-2 px-3 font-medium rounded-lg hover:bg-gray-700 transition-colors text-white",
                    active && "bg-gray-700"
                  )}
                >
                  <Icon variant="Bold" size={20} style={{ color: item.color, minWidth: "20px" }} />
                  <p className="ml-4 whitespace-nowrap text-right">{item.name}</p>
                </div>
              </Link>
            );
          })}
        </Accordion>
      </nav>
    </div>
  );
};

export default function AdminSidebar() {
  return (
    <div className="relative max-lg:hidden w-64">
      <SideBarContent />
    </div>
  );
}
