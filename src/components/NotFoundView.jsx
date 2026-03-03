"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function NotFoundView({
  title,
  description,
  imageSrc,
  imageAlt,
  primaryButton,
  secondaryButton,
  className,
}) {
  return (
    <div className={cn("min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12", className)}>
      {/* جای عکس — با imageSrc پر می‌کنی؛ وگرنه placeholder */}
      <div className="relative w-full max-w-[280px] aspect-[4/3] mb-6 flex items-center justify-center  overflow-hidden">
        <Image src="/image/notFound.png" alt={imageAlt ?? title} fill className="object-contain" sizes="280px" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-[#0448A9] dark:text-dark-title mb-2">{title}</h1>
      {description && <p className="text-muted-foreground text-sm md:text-base max-w-md mb-8">{description}</p>}

      <div className="flex flex-wrap gap-3 justify-center">
        {secondaryButton?.href && (
          <Link href={secondaryButton.href}>
            <Button
              variant="outline"
              className="border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30"
            >
              {secondaryButton.label}
            </Button>
          </Link>
        )}

        {primaryButton?.href && (
          <Link href={primaryButton.href}>
            <Button className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white">
              {primaryButton.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
