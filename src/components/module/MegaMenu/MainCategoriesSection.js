"use client";

import React from "react";
import Link from "next/link";
import { Monitor, Shirt, Footprints, BookOpen, Car, Camera, Sofa } from "lucide-react";
import { cn } from "@/lib/utils";

const mainCategories = [
  { label: "کالای دیجیتال", href: "/categories/digital", icon: Monitor },
  { label: "مد و پوشاک", href: "/categories/fashion", icon: Shirt },
  { label: "ورزش و سفر", href: "/categories/sports", icon: Footprints },
  { label: "کتاب، لوازم التحریر و هنر", href: "/categories/books", icon: BookOpen },
  { label: "لوازم خودرو و موتور سیکلت", href: "/categories/automotive", icon: Car },
  { label: "صوتی و تصویری", href: "/categories/audio-video", icon: Camera },
  { label: "خانه و آشپزخانه", href: "/categories/home-kitchen", icon: Sofa },
];

export default function MainCategoriesSection({ className }) {
  return (
    <div className={cn("", className)} dir="rtl">
      <div className="space-y-2">
        {mainCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Link
              key={index}
              href={category.href}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-field transition-colors group"
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                <Icon size={20} />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-dark-titre group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {category.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
