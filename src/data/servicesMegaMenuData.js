const base = "/gift-cart"; // مسیر پایه؛ در صورت نیاز به صفحه جدا per-section تغییر دهید
const currency = "/currency-services";
const paypal = "/paypal-cashout";

export const SERVICES_MEGA_MENU_TABS = [
  { id: "payment", label: "پرداخت ارزی" },
  { id: "premium", label: "خرید اکانت پریمیوم" },
  { id: "giftcard", label: "گیفت کارت" },
];

export const SERVICES_MEGA_MENU_CONTENT = {
  payment: [
 
    {
      title: "گیفت کارت اپلیکیشن",
      viewAllHref: base,
      items: [
        { label: "گیفت کارت اپل", href: base },
        { label: "گیفت کارت گوگل پلی", href: base },
        { label: "گیفت کارت اسپاتیفای", href: base },
        { label: "گیفت کارت نتفلیکس", href: base },
        { label: "گیفت کارت اسکایپ", href: base },
      ],
    },
    {
      title: "گیفت کارت بازی",
      viewAllHref: base,
      items: [
        { label: "گیفت کارت پلی استیشن", href: base },
        { label: "گیفت کارت ایکس باکس", href: base },
        { label: "گیفت کارت استیم", href: base },
        { label: "گیفت کارت نینتندو", href: base },
      ],
    },
   
   
    {
      title: "ویزا و سفارت",
      viewAllHref: currency,
      items: [
        { label: "پرداخت هزینه ویزا و سفارت آمریکا", href: currency },
        { label: "پرداخت هزینه ویزا و سفارت کانادا", href: currency },
      ],
    },
  ],
  premium: [
    {
      title: "ابزار سئو و مارکتینگ",
      viewAllHref: currency,
      items: [
        { label: "شارژ اکانت فیسبوک ادز", href: currency },
        { label: "شارژ اکانت گوگل ادز", href: currency },
        { label: "خرید اکانت Semrush", href: currency },
        { label: "خرید اکانت Ahrefs", href: currency },
        { label: "خرید اکانت Moz pro", href: currency },
      ],
    },
    {
      title: "اکانت های کاربردی",
      viewAllHref: currency,
      items: [
        { label: "خرید اکانت لینکدین پریمیوم", href: currency },
        { label: "خرید اکانت یوتیوب پریمیوم", href: currency },
        { label: "خرید اکانت chatgpt", href: currency },
        { label: "خرید اکانت اسلک پریمیوم", href: currency },
      ],
    },
    {
      title: "هزینه های دانشگاه",
      viewAllHref: currency,
      items: [
        { label: "شهریه دانشگاه", href: currency },
        { label: "اپلیکیشن فی", href: currency },
        { label: "اجاره خوابگاه", href: currency },
      ],
    },
  ],
  giftcard: [
    {
      title: "گیفت کارت پرداخت آنلاین",
      viewAllHref: base,
      items: [{ label: "گیفت کارت آمازون", href: base }],
    },
    {
      title: "گیفت کارت اپلیکیشن",
      viewAllHref: base,
      items: [
        { label: "گیفت کارت اپل", href: base },
        { label: "گیفت کارت گوگل پلی", href: base },
        { label: "گیفت کارت اسپاتیفای", href: base },
        { label: "گیفت کارت نتفلیکس", href: base },
      ],
    },
    {
      title: "گیفت کارت بازی",
      viewAllHref: base,
      items: [
        { label: "گیفت کارت پلی استیشن", href: base },
        { label: "گیفت کارت ایکس باکس", href: base },
        { label: "گیفت کارت استیم والت", href: base },
        { label: "گیفت کارت نینتندو", href: base },
      ],
    },
  ],
};
