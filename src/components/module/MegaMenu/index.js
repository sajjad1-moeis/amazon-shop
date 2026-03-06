"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import CategoryColumn from "./CategoryColumn";
import CategorySearch from "./CategorySearch";
import MainCategoriesSection from "./MainCategoriesSection";
import { megaMenuData } from "./megaMenuData";

// زیردسته‌بندی‌های تستی برای دسته‌بندی‌های دیگر
const fashionSubCategories = [
  {
    title: "لباس زنانه",
    items: [
      { label: "لباس مجلسی", href: "/categories/fashion/women/formal" },
      { label: "لباس روزمره", href: "/categories/fashion/women/casual" },
      { label: "لباس ورزشی", href: "/categories/fashion/women/sport" },
      { label: "لباس زیر زنانه", href: "/categories/fashion/women/underwear" },
    ],
  },
  {
    title: "لباس مردانه",
    items: [
      { label: "کت و شلوار", href: "/categories/fashion/men/suit" },
      { label: "تی شرت و پولوشرت", href: "/categories/fashion/men/t-shirt" },
      { label: "شلوار", href: "/categories/fashion/men/pants" },
      { label: "لباس زیر مردانه", href: "/categories/fashion/men/underwear" },
    ],
  },
  {
    title: "کفش",
    items: [
      { label: "کفش ورزشی", href: "/categories/fashion/shoes/sport" },
      { label: "کفش رسمی", href: "/categories/fashion/shoes/formal" },
      { label: "کفش کتانی", href: "/categories/fashion/shoes/sneakers" },
    ],
  },
];

const sportsSubCategories = [
  {
    title: "ورزش‌های هوازی",
    items: [
      { label: "دوچرخه", href: "/categories/sports/cardio/bike" },
      { label: "تردمیل", href: "/categories/sports/cardio/treadmill" },
      { label: "الپتیکال", href: "/categories/sports/cardio/elliptical" },
    ],
  },
  {
    title: "ورزش‌های قدرتی",
    items: [
      { label: "دمبل و هالتر", href: "/categories/sports/strength/dumbbells" },
      { label: "نیمکت ورزشی", href: "/categories/sports/strength/bench" },
      { label: "کمربند بدنسازی", href: "/categories/sports/strength/belt" },
    ],
  },
  {
    title: "لوازم سفر",
    items: [
      { label: "کوله پشتی", href: "/categories/sports/travel/backpack" },
      { label: "چمدان", href: "/categories/sports/travel/suitcase" },
      { label: "کیف دستی سفر", href: "/categories/sports/travel/travel-bag" },
    ],
  },
];

const booksSubCategories = [
  {
    title: "کتاب",
    items: [
      { label: "کتاب رمان", href: "/categories/books/novel" },
      { label: "کتاب علمی", href: "/categories/books/scientific" },
      { label: "کتاب کودک", href: "/categories/books/children" },
      { label: "کتاب دانشگاهی", href: "/categories/books/academic" },
    ],
  },
  {
    title: "لوازم التحریر",
    items: [
      { label: "خودکار و مداد", href: "/categories/books/stationery/pens" },
      { label: "دفتر و کاغذ", href: "/categories/books/stationery/notebooks" },
      { label: "مقوای رنگی", href: "/categories/books/stationery/cardboard" },
    ],
  },
];

const automotiveSubCategories = [
  {
    title: "لوازم خودرو",
    items: [
      { label: "روغن موتور", href: "/categories/automotive/oil" },
      { label: "فیلتر هوا", href: "/categories/automotive/air-filter" },
      { label: "لنت ترمز", href: "/categories/automotive/brake-pads" },
      { label: "باتری خودرو", href: "/categories/automotive/battery" },
    ],
  },
  {
    title: "لوازم موتورسیکلت",
    items: [
      { label: "کلاه ایمنی", href: "/categories/automotive/motorcycle/helmet" },
      { label: "دستکش موتور", href: "/categories/automotive/motorcycle/gloves" },
      { label: "کاور موتور", href: "/categories/automotive/motorcycle/cover" },
    ],
  },
];

const audioVideoSubCategories = [
  {
    title: "صوتی",
    items: [
      { label: "هدفون", href: "/categories/audio-video/headphones" },
      { label: "اسپیکر", href: "/categories/audio-video/speakers" },
      { label: "میکروفون", href: "/categories/audio-video/microphone" },
      { label: "آمپلی فایر", href: "/categories/audio-video/amplifier" },
    ],
  },
  {
    title: "تصویری",
    items: [
      { label: "تلویزیون", href: "/categories/audio-video/tv" },
      { label: "پروژکتور", href: "/categories/audio-video/projector" },
      { label: "دوربین", href: "/categories/audio-video/camera" },
    ],
  },
];

const homeKitchenSubCategories = [
  {
    title: "خانه",
    items: [
      { label: "مبلمان", href: "/categories/home-kitchen/furniture" },
      { label: "فرش و موکت", href: "/categories/home-kitchen/carpet" },
      { label: "پرده", href: "/categories/home-kitchen/curtains" },
      { label: "چراغ و روشنایی", href: "/categories/home-kitchen/lighting" },
    ],
  },
  {
    title: "آشپزخانه",
    items: [
      { label: "قابلمه و تابه", href: "/categories/home-kitchen/pots" },
      { label: "چاقو و تخته", href: "/categories/home-kitchen/knives" },
      { label: "ماشین ظرفشویی", href: "/categories/home-kitchen/dishwasher" },
      { label: "یخچال", href: "/categories/home-kitchen/refrigerator" },
    ],
  },
];

// Mapping بین دسته‌بندی‌های اصلی و زیردسته‌بندی‌ها
const categoryMapping = {
  "کالای دیجیتال": megaMenuData,
  "مد و پوشاک": fashionSubCategories,
  "ورزش و سفر": sportsSubCategories,
  "کتاب، لوازم التحریر و هنر": booksSubCategories,
  "لوازم خودرو و موتور سیکلت": automotiveSubCategories,
  "صوتی و تصویری": audioVideoSubCategories,
  "خانه و آشپزخانه": homeKitchenSubCategories,
};

export default function MegaMenu({ trigger }) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("کالای دیجیتال"); // دسته پیش‌فرض

  // فیلتر کردن دسته‌بندی‌ها بر اساس دسته انتخاب شده و جستجو
  const getFilteredData = () => {
    // اگر سرچ فعال باشه، همه دسته‌بندی‌ها رو جستجو کن
    if (searchValue) {
      // جمع‌آوری همه دسته‌بندی‌ها از همه mapping ها
      const allCategories = Object.values(categoryMapping).flat();
      return allCategories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())),
        }))
        .filter((category) => category.items.length > 0);
    }

    // اگر سرچ فعال نباشه، فقط زیردسته‌بندی‌های دسته انتخاب شده رو نشون بده
    const categoryData = categoryMapping[selectedCategory] || [];
    return categoryData;
  };

  const filteredData = getFilteredData();

  return (
    <NavigationMenu open={true} className="relative z-[5555]" dir="rtl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent h-auto p-0">
            {trigger}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!w-[95vw] max-w-7xl !right-0 !top-full !mt-2 !p-0 !h-auto !z-50" dir="rtl">
            <div
              className="w-full p-0 bg-white dark:bg-dark-box rounded-xl shadow-xl border border-gray-200 dark:border-dark-stroke relative z-50"
              dir="rtl"
            >
              {/* همه محصولات + فیلتر امارات و امریکا (فیگما) */}
              <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-dark-stroke bg-gray-50 dark:bg-dark-field/50">
                <Link
                  href="/products"
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  همه محصولات
                </Link>
                <span className="text-gray-400 dark:text-gray-500">|</span>
                <Link
                  href="/products?region=ae"
                  className="text-sm text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 px-2 py-1 rounded-md hover:bg-primary-50 dark:hover:bg-dark-field"
                >
                  امارات
                </Link>
                <Link
                  href="/products?region=us"
                  className="text-sm text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 px-2 py-1 rounded-md hover:bg-primary-50 dark:hover:bg-dark-field"
                >
                  امریکا
                </Link>
              </div>
              {/* Content Layout */}
              <div className="flex">
                {/* Right Side: Main Categories + Search */}
                <div className="p-4 flex flex-col gap-4 min-w-[220px] border-l border-gray-200 dark:border-dark-stroke ">
                  {/* Search Section */}
                  <CategorySearch searchValue={searchValue} onSearch={setSearchValue} />

                  {/* Main Categories */}
                  <MainCategoriesSection
                    selectedCategory={selectedCategory}
                    onCategoryHover={setSelectedCategory}
                  />
                </div>

                {/* Left Side: Category Columns */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-y-6 p-4">
                  {filteredData.length > 0 ? (
                    filteredData.map((category, index) => (
                      <CategoryColumn key={index} title={category.title} items={category.items} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-gray-500 dark:text-dark-text">
                      نتیجه‌ای یافت نشد
                    </div>
                  )}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
