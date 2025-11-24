import { Calendar, CardPos, ConvertCard } from "iconsax-reactjs";

export const ADDRESS_FORM_FIELDS = [
  {
    id: "province",
    label: "استان",
    placeholder: "",
    type: "text",
    gridCols: 2,
    required: true,
  },
  {
    id: "city",
    label: "شهر",
    placeholder: "",
    type: "text",
    gridCols: 2,
    required: true,
  },
  {
    id: "address",
    label: "آدرس",
    placeholder: "آدرس دقیق را وارد کنید",
    type: "text",
    gridCols: 1,
    required: true,
  },
  {
    id: "plaque",
    label: "",
    placeholder: "پلاک",
    type: "text",
    gridCols: 2,
    required: false,
  },
  {
    id: "unit",
    label: "",
    placeholder: "واحد",
    type: "text",
    gridCols: 2,
    required: false,
  },
  {
    id: "postalCode",
    label: "",
    placeholder: "کد پستی را وارد کنید تا ادرس شما را دریافت کنیم",
    type: "text",
    gridCols: 1,
    required: false,
  },
  {
    id: "firstName",
    label: "نام گیرنده",
    placeholder: "نام را وارد کنید",
    type: "text",
    gridCols: 2,
    required: true,
  },
  {
    id: "lastName",
    label: "نام خانوادگی گیرنده",
    placeholder: "نام خانوادگی را وارد کنید",
    type: "text",
    gridCols: 2,
    required: true,
  },
  {
    id: "mobile",
    label: "شماره تلفن",
    placeholder: "شماره تلفن همراه را وارد کنید",
    type: "tel",
    gridCols: 2,
    required: false,
  },
  {
    id: "landline",
    label: "شماره تلفن ثابت",
    placeholder: "شماره تلفن ثابت را وارد کنید",
    type: "tel",
    gridCols: 2,
    required: false,
  },
  {
    id: "notes",
    label: "توضیحات (اختیاری)",
    placeholder: "اگر سفارش نیاز به توضیح دارد در این قسمت وارد کنید",
    type: "textarea",
    gridCols: 1,
    required: false,
  },
];

export const paymentMethods = [
  {
    id: "online",
    title: "پرداخت آنلاین با تمامی کارتها",
    subtitle: "پرداخت با تمامی کارتهای عضو شتاب",
    icon: CardPos,
  },
  {
    id: "bank",
    title: "واریز به حساب بانکی",
    subtitle: "پرداخت بصورت کارت به کارت یا شماره حساب",
    icon: ConvertCard,
  },
  {
    id: "installment",
    title: "پرداخت اقساطی طرح اعتماد",
    subtitle: "پرداخت قسطی (۲ قسط)",
    icon: Calendar,
    hasInfo: true,
  },
];

export const reviews = [
  {
    id: 1,
    name: "محمد",
    date: "۲۴ اسفند",
    comment:
      "من با استفاده از سرویس میکرولس به هدفون از آمازون خریدم دقیقاً طبق زمانی که گفته بودن رسید. تجربه عالی ای بود!",
    rating: 4.5,
    likes: 2,
  },
  {
    id: 2,
    name: "سميرا",
    date: "۲۴ اسفند",
    comment:
      "من با استفاده از سرویس میکرولس به هدفون از آمازون خریدم دقیقاً طبق زمانی که گفته بودن رسید. تجربه عالی ای بودا",
    rating: 4.5,
    likes: 2,
  },
  {
    id: 3,
    name: "مریم کشمیری",
    date: "۲۳ اسفند",
    comment:
      "من با استفاده از سرویس میکرولس به هدفون از آمازون خریدم دقیقاً طبق زمانی که گفته بودن رسید. تجربه عالی ای بود!",
    rating: 4.5,
    likes: 2,
  },
];

export const brands = [
  {
    id: 1,
    name: "Adidas",
    logo: "adidas",
    description:
      "میکرولس یک فروشگاه آنلاین معتبر در زمینه الکترونیک، کامپیوتر، لپ تاپ، لوازم جانبی و تجهیزات گیمینگ است که در بخش‌های گرافیک، صوتی، تصویری و دستگاه‌های هوشمند نیز فعالیت می‌کند.",
  },
  {
    id: 2,
    name: "Microless",
    logo: "Microless",
    description:
      "میکرولس یک فروشگاه آنلاین معتبر در زمینه الکترونیک، کامپیوتر، لپ تاپ، لوازم جانبی و تجهیزات گیمینگ است که در بخش‌های گرافیک، صوتی، تصویری و دستگاه‌های هوشمند نیز فعالیت می‌کند.",
  },
  {
    id: 3,
    name: "V PERFUNES",
    logo: "V PERFUNES",
    description:
      "پرفیوم‌ها در زمینه عطر و ادکلن اصل از برندهای معروف تخصص دارد و همچنین انواع ساعت، کیف، کفش و پوشاک مردانه و زنانه را ارائه می‌دهد و هدف آن ارائه تجربه است.",
  },
  {
    id: 4,
    name: "noon",
    logo: "noon",
    description:
      "نون یکی از بزرگترین فروشگاه‌های آنلاین در خاورمیانه است که در دسته‌بندی‌های مختلفی مانند الکترونیک، مد، سلامت و زیبایی، عطر، محصولات مادر و کودک و کالاهای خانگی فعالیت می‌کند و تخفیف‌هایی را ارائه می‌دهد.",
  },
  {
    id: 5,
    name: "amazon",
    logo: "amazon",
    description:
      "آمازون امارات یکی از زیرمجموعه‌های رسمی جهانی آمازون است که بیش از 30 میلیون محصول در دسته‌بندی‌های مختلف از کتاب و دستگاه‌های دیجیتال تا مد، خانه و زیبایی را ارائه می‌دهد که همه در یک پلتفرم با قیمت‌های معقول در دسترس هستند.",
  },
];

export const purchasingSteps = [
  {
    id: 1,
    title: "ارسال درخواست خرید کالا",
    logo: "step1.png",
    description: "درخواستت ثبت می‌شود تا محصول دقیقاً بررسی و استعلام شود.",
  },
  {
    id: 2,
    title: "بررسی امکان تامین توسط میکرولس",
    logo: "step2.png",
    description: "کارشناسان ما موجودی و امکان خرید از ایبی را بررسی می‌کنند.",
  },
  {
    id: 3,
    title: "اعلام قیمت",
    logo: "step3.png",
    description: "هزینه نهایی شامل قیمت محصول و حمل‌ونقل بهت اعلام می‌شود.",
  },
  {
    id: 4,
    title: "خرید محصول",
    logo: "step4.png",
    description: " بعد از تایید شما، محصول به صورت امن توسط میکرولس خریداری می‌شود.",
  },
];
