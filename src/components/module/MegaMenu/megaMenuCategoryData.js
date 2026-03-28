import { Monitor, Shirt, Footprints, BookOpen, Car, Camera, Sofa } from "lucide-react";
import { megaMenuData } from "./megaMenuData";

/** دسته‌های اصلی مگامنو / تب‌های موبایل — برچسب باید با کلیدهای categoryMapping یکی باشد */
export const staticMainCategories = [
  { label: "کالای دیجیتال", href: "/categories/digital", icon: Monitor },
  { label: "مد و پوشاک", href: "/categories/fashion", icon: Shirt },
  { label: "ورزش و سفر", href: "/categories/sports", icon: Footprints },
  { label: "کتاب، لوازم التحریر و هنر", href: "/categories/books", icon: BookOpen },
  { label: "لوازم خودرو و موتور سیکلت", href: "/categories/automotive", icon: Car },
  { label: "صوتی و تصویری", href: "/categories/audio-video", icon: Camera },
  { label: "خانه و آشپزخانه", href: "/categories/home-kitchen", icon: Sofa },
];

/** زیردسته‌های تستی — منبع واحد برای مگامنو و دراور موبایل */

export const fashionSubCategories = [
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

export const sportsSubCategories = [
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

export const booksSubCategories = [
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

export const automotiveSubCategories = [
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

export const audioVideoSubCategories = [
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

export const homeKitchenSubCategories = [
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

export const categoryMapping = {
  "کالای دیجیتال": megaMenuData,
  "مد و پوشاک": fashionSubCategories,
  "ورزش و سفر": sportsSubCategories,
  "کتاب، لوازم التحریر و هنر": booksSubCategories,
  "لوازم خودرو و موتور سیکلت": automotiveSubCategories,
  "صوتی و تصویری": audioVideoSubCategories,
  "خانه و آشپزخانه": homeKitchenSubCategories,
};

/**
 * ستون‌های زیردسته برای یک دسته اصلی (با فیلتر جستجو)
 * @returns {{ title: string, items: {label: string, href: string}[] }[]}
 */
export function getColumnsForMainCategory(selectedCategory, searchValue = "") {
  const raw = categoryMapping[selectedCategory] || [];
  const q = (searchValue || "").trim().toLowerCase();
  if (!q) return raw;
  return raw
    .map((col) => ({
      ...col,
      items: (col.items || []).filter((item) => (item.label || "").toLowerCase().includes(q)),
    }))
    .filter((col) => col.items.length > 0);
}
