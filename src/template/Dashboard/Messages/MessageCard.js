"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowDown2 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function MessageCard({ message }) {
  const getTypeBadge = (type) => {
    switch (type) {
      case "support":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            {message.typeLabel}
          </span>
        );
      case "payment":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {message.typeLabel}
          </span>
        );
      case "order":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            {message.typeLabel}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-dark-stroke last:border-b-0 pb-3 sm:pb-4 last:pb-0">
      <Accordion type="single" collapsible defaultValue={message.id === 3 ? `message-${message.id}` : undefined}>
        <AccordionItem value={`message-${message.id}`} className="border-0">
          <AccordionTrigger className="hover:no-underline py-1 sm:py-2 [&>svg]:hidden group">
            <div className="flex items-center justify-between w-full gap-2 sm:gap-3">
              {/* Left: Arrow Icon and Title */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <h3 className="text-sm sm:text-base text-gray-700 dark:text-dark-titre text-right line-clamp-2 flex-1">
                  {message.title}
                </h3>
              </div>

              {/* Right: Badge */}
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <div className="hidden sm:block">{getTypeBadge(message.type)}</div>
                <ArrowDown2
                  size={18}
                  className="sm:w-5 sm:h-5 text-gray-600 dark:text-dark-text transition-transform duration-200 group-data-[state=open]:rotate-180 flex-shrink-0"
                />
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pt-3 sm:pt-4">
            {message.message && (
              <div className="space-y-3 sm:space-y-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                  {message.message}
                </p>
                {message.actionButton && (
                  <Link href={message.actionButton.href}>
                    <Button
                      variant="outline"
                      className="border-primary-600 dark:text-primary-300 border-2 dark:border-primary-300 mt-3 sm:mt-4 text-primary-600 text-xs sm:text-sm w-full sm:w-auto"
                    >
                      {message.actionButton.label}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
