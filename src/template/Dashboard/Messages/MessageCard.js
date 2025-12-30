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
    <div className="border-b border-gray-200 dark:border-dark-stroke last:border-b-0 pb-4 last:pb-0">
      <Accordion type="single" collapsible defaultValue={message.id === 3 ? `message-${message.id}` : undefined}>
        <AccordionItem value={`message-${message.id}`} className="border-0">
          <AccordionTrigger className="hover:no-underline py-1 [&>svg]:hidden group">
            <div className="flex items-center justify-between w-full">
              {/* Left: Arrow Icon and Title */}
              <div className="flex items-center gap-3 flex-1">
                <h3 className="text-base text-gray-700 dark:text-dark-titre text-right">{message.title}</h3>
              </div>

              {/* Right: Badge */}
              <div class="flex-center gap-8">
                <div className="mr-4">{getTypeBadge(message.type)}</div>
                <ArrowDown2
                  size={20}
                  className="text-gray-600 dark:text-dark-text transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pt-4">
            {message.message && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">{message.message}</p>
                {message.actionButton && (
                  <Link href={message.actionButton.href}>
                    <Button
                      variant="outline"
                      className="border-primary-600 dark:text-primary-300 border-2 dark:border-primary-300  mt-4 text-primary-600"
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
