"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ADMIN_SIDEBAR_ITEMS } from "@/data/adminSidebarData";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    ADMIN_SIDEBAR_ITEMS.forEach((item) => {
      if (item.children && pathname?.includes(item.key)) {
        setDefaultValue(item.key);
      }
    });
  }, [pathname]);

  const isActive = (item) => {
    if (item.children) {
      return item.children.some((child) => pathname === child.href) || pathname?.includes(item.key);
    }
    return pathname === item.href;
  };

  return (
    <div className=" h-full bg-gray-900 border-l border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/image/logo.png" alt="لوگو" width={40} height={40} className="filter invert brightness-0" />
          <p className="text-white font-semibold text-lg">پنل ادمین</p>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <Accordion type="single" collapsible defaultValue={defaultValue} className="w-full">
          {ADMIN_SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            if (item.children) {
              return (
                <AccordionItem key={item.key} value={item.key} className="border-none">
                  <AccordionTrigger
                    className={cn(
                      "flex items-center gap-2 p-2 px-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors mb-2 [&[data-state=open]]:bg-gray-800",
                      active && "bg-gray-800"
                    )}
                  >
                    <Icon variant="Bold" size={20} style={{ color: item.color, minWidth: "20px" }} />
                    <span className="flex-1 text-right">{item.name}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <ul className="space-y-1 pr-6">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "block p-2 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors",
                              pathname === child.href && "bg-gray-800 text-blue-400"
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
                    "flex items-center gap-2 p-2 px-3 font-medium rounded-lg hover:bg-gray-800 transition-colors",
                    active && "bg-gray-800"
                  )}
                >
                  <Icon variant="Bold" size={20} style={{ color: item.color, minWidth: "20px" }} />
                  <span className="flex-1 text-right">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </Accordion>
      </nav>
    </div>
  );
}
