import {
  Bag,
  BitcoinConvert,
  BoxTick,
  Buildings2,
  Calendar,
  CardPos,
  CardTick1,
  ConvertCard,
  DollarCircle,
  Element4,
  Eye,
  Gift,
  GlobalRefresh,
  Heart,
  Home,
  Paypal,
  Profile,
  Send2,
  ShieldTick,
  Shop,
  ShoppingCart,
  TickSquare,
  Truck,
  Wallet,
} from "iconsax-reactjs";
import ShippingReturnPolicy from "./template/Guide/ShippingReturnPolicy";
import CustomsShippingServices from "./template/Guide/CustomsShipping";
import AmazonShoppingGuide from "./template/Guide/AmazonShopping";
import PointsTerms from "./template/Guide/PointsTerms";

export const ADDRESS_FORM_FIELDS = [
  {
    id: "title",
    label: "عنوان آدرس",
    placeholder: "مثال: خانه، محل کار",
    type: "text",
    gridCols: 1,
    required: true,
  },
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
    label: "شماره تلفن گیرنده",
    placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
    type: "tel",
    gridCols: 2,
    required: true,
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

const format = (v) => v?.toLocaleString("fa-IR");

export const PRIMARY = [
  {
    name: "link",
    label: "لینک",
    placeholder: "لینک محصول خود را وارد کنید",
    rules: {
      required: "لطفاً لینک محصول را وارد کنید",
      pattern: {
        value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/,
        message: "فرمت لینک صحیح نیست",
      },
    },
  },
];

const USD = 83000;
const SHIP = 1200;

export const SECONDARY = [
  {
    name: "priceUSD",
    label: "قیمت (دلار)",
    placeholder: "قیمت را وارد کنید",
    helper: `هر دلار ${format(USD)} تومان`,
    rules: {
      required: "قیمت دلاری را وارد کنید",
      pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "فقط عدد مجاز است" },
    },
  },
  {
    name: "weightGram",
    label: "وزن (گرم)",
    placeholder: "وزن محصول را وارد کنید",
    helper: `حمل هر گرم ${format(SHIP)} تومان`,
    rules: {
      pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "فقط عدد مجاز است" },
    },
  },
];

export const cancelOrderAccordion = [
  {
    value: "before-pay",
    title: "لغو قبل از پرداخت",
    content: "برای سفارش‌هایی که پرداخت نشده‌اند، لغو سفارش بسیار آسان است.",
  },
  {
    value: "international",
    title: "لغو خریدهای بین‌المللی (Amazon US و مشابه)",
    content: "سفارش‌های بین‌المللی فقط تا ۲۴ ساعت اول امکان لغو دارند.",
  },
  {
    value: "in-progress",
    title: "لغو سفارش‌هایی که در وضعیت در حال انجام هستند",
    content: "لغو سفارش پس از ورود به مرحله پردازش امکان‌پذیر نیست.",
  },
  {
    value: "pending",
    title: "سفارش‌های در انتظار بررسی",
    content: "سفارش‌های در حالت انتظار بررسی امکان لغو دارند.",
  },
];

export const deliveryInfo = [
  {
    id: 1,
    title: "روش حمل و نقل",
    description: [
      "در شکوفارس، رضایت مشتری اولویت اصلی ما است. به همین دلیل است که ما نهایت دقت را می‌کنیم تا محصولات شما را مستقیماً با بهترین و امن‌ترین روش زمان ممکن، به دست شما برسانیم. بسته به مبدأ ارسال و مقصد، گزینه‌های ویژه برای ارسال در دسترس می‌باشد.",
      "ما به تمامی مشتریان این امکان را می‌دهیم که زمان تحویل کالا را از اسراع وقت به زمان معمولی کاهش دهند. بسته به موقعیت جغرافیایی شما و نوع کالای شما، برنامه‌های تحویل مختلفی بسته به شرایط ممکن می‌باشد. اگر در روز دوشنبه سفارش خود را ثبت نموده‌اید، بسته شما حداکثر تا روز سه‌شنبه تحویل شما می‌گردد.",
      "در صورت ارسال به خارج از ایران، شرکت سومی وجود دارد که تمامی امور گمرکی با داری تأمین لازم را در جهت ارائه خدمات انجام دهد. همچنین، ممکن است محصول شما قبل از ارسال نهایی نیاز به بررسی بیشتری داشته باشد و این امر باعث زمان‌بر شدن ارسال محسوب شود. ارسال مستلزم رعایت مقررات رایج ارائه خدمات حمل‌ونقل می‌باشد و برای پیگیری یا ارائه خدمات حمل و نقل لازم است شماره تماس مشتری در اختیار شرکت قرار گیرد.",
    ],
  },
  {
    id: 2,
    title: "زمان تحویل تخمینی",
    description: ["ایران – تحویل اکسپرس – زمان تحویل یک هفته کاری تا از ایران و ۷ روز کاری بسته بندی و ارسال محصول"],
  },
  {
    id: 3,
    title: "تحویل در داخل ایران",
    description: [
      "ما با پست پیشتاز و تیپاکس و چهار یار برای تحویل داخلی به مشتریان خود در سراسر کشور ایران قرارداد بسته‌ایم.",
    ],
  },
  {
    id: 4,
    title: "تحویل کالا",
    description: [
      "زمان تحویل ممکن است بسته به مشتری و یا شرکت کننده متفاوت باشد. زمان تحویل در صفحات محصولات نمایش داده می‌شود. ما همیشه سعی می‌کنیم شاخص‌های زمان تحویل مورد انتظار را نمایش دهیم. زمان تحویل ۶ روز پس از پرداخت خریدار (تأیید پرداخت خریدار) خواهد بود.",
      "در برخی موارد نادر، زمان تحویل به دلایل خارجی افزایش می‌یابد و محصول به موقع تحویل داده نمی‌شود. این ممکن است ناشی از تأخیر در تولید یا هماهنگی حمل باشد. آب‌وهوای نامناسب، مسائل گمرکی، تراکم حمل‌ونقل یا محدودیت‌های بین‌المللی از جمله مواردی هستند که می‌توانند موجب شود زمان تحویل بیش از حد انتظار طولانی شود. در چنین شرایطی، تیم ما به‌طور فعال با تامین‌کننده و شرکت حمل‌ونقل همکاری کرده تا به‌روزرسانی‌های دقیق‌تری ارائه دهد.",
      "در موارد نادر، ممکن است تحویل بیشتر طول بکشد زیرا:",
    ],
    bottomLinks: [
      "تاخیر در پرواز",
      "تطبیقات با جشنواره‌های ملی",
      "مراحل ترخیص کالا از گمرک",
      "سایر شرایط پیش‌بینی نشده",
    ],
  },
];

export const faqs = [
  {
    id: "item-1",
    question: "چرا نمی توان مستقیم از آمازون خرید کرد؟",
    answer:
      "آمازون آمریکا به علت تحریم ها به ایرانیها خدماتی عرضه نمیکند و کالایی را برایشان ارسال نمی کند لذا امکان خرید مستقیم از آمازون برای مردم ایران میسر نیست.",
  },
  {
    id: "item-2",
    question: "خرید چه کالاهایی از آمازون مقدور هست",
    answer:
      "در حال حاضر بیش از ۳۰ میلیون محصول در آمازون امارات به فروش میرسد که از بین کالاها محصولات آرایشی و بهداشتی مانند عطر ریش تراش اتو مو لوازم آرایشی برندهای محبوب لوازم خانگی مانند جارو برقی های رباتیک لوازم آشپزخانه مانیتورهای بالای ۳۰ اینچ پوشاک ورزشی لوازم جانبی کامپیوتر لپ تاپ و محصولات گیمینگ جز کالاهایی هستند که خرید آنها از آمازون دبی به صرفه است. کالاهایی که غیر مجاز باشد مانند اسلحه انواع مخمر مشروبات الکلی لوازم قمار و ... که در قوانین جمهوری اسلامی ایران قابل خریداری نیست.",
  },
  {
    id: "item-3",
    question: "آیا امکان مرجوع کردن کالا وجود دارد؟",
    answer:
      "میکرولس سلامت فیزیکی کالا و همچنین تشابه آن با کالای سفارشی در آمازون را تضمین میکند اگر کالای شما سلامت فیزیکی نداشت و یا مشابه کالای سفارشی نباشد میتوانید به ما اطلاع بدهید تا بصورت قطعی برایتان پیگیری کنیم تا کالا را مرجوع نمایید. همچنین کیفیت کلی سازنده محصول وابسته به برند و شرکت آن است و فروشگاه میکرولس مسئول آن نمی باشد.",
  },
];

export const faqTabs = [
  {
    value: "amazon",
    label: "خرید از آمازون",
    faqs: [
      {
        question: "چطور می‌توانم لینک محصول آمازون را ثبت کنم؟",
        answer: "وارد سایت amazon.com یا amazon.ae شوید، لینک محصول را کپی کنید و در بخش درخواست خرید ثبت کنید.",
      },
      {
        question: "آیا میکروسل قیمت نهایی را قبل از خرید نمایش می‌دهد؟",
        answer:
          "بله، پس از وارد کردن لینک، قیمت نهایی شامل کالا، ارسال، گمرک و سایر هزینه‌ها محاسبه و نمایش داده می‌شود.",
      },
      {
        question: "چطور مطمئن شوم محصول اصل است؟",
        answer: "میکروسل فقط از فروشندگان معتبر آمازون خرید می‌کند و اطلاعات فروشنده نیز قبل از خرید بررسی می‌شود.",
      },
    ],
  },

  {
    value: "payment",
    label: "هزینه‌ها و پرداخت",
    faqs: [
      {
        question: "پرداخت سفارش چگونه انجام می‌شود؟",
        answer: "پس از تأیید قیمت نهایی، پرداخت از طریق درگاه بانکی معتبر انجام می‌شود.",
      },
      {
        question: "آیا هزینه گمرک جداگانه دریافت می‌شود؟",
        answer: "خیر، تمامی هزینه‌ها در قیمت نهایی محاسبه و نمایش داده شده است.",
      },
      {
        question: "آیا امکان پرداخت مرحله‌ای وجود دارد؟",
        answer: "فعلاً پرداخت فقط به صورت کامل امکان‌پذیر است.",
      },
    ],
  },

  {
    value: "delivery",
    label: "ارسال و زمان‌بندی",
    faqs: [
      {
        question: "مدت زمان ارسال از آمازون چقدر است؟",
        answer: "معمولاً ۷ تا ۱۴ روز کاری تا رسیدن محصول به ایران زمان می‌برد.",
      },
      {
        question: "آیا امکان ارسال سریع وجود دارد؟",
        answer: "در برخی محصولات امکان ارسال سریع وجود دارد که هزینه آن متفاوت است.",
      },
      {
        question: "چطور می‌توانم وضعیت بسته را پیگیری کنم؟",
        answer: "پس از خرید، یک کد رهگیری در پروفایل شما ثبت می‌شود که از طریق آن وضعیت ارسال قابل مشاهده است.",
      },
    ],
  },

  {
    value: "customs",
    label: "گمرک و مالیات",
    faqs: [
      {
        question: "آیا کالاهای آمازون شامل گمرک می‌شوند؟",
        answer: "بله، کالاهای وارداتی شامل حقوق ورودی و مالیات هستند که در قیمت نهایی محاسبه شده‌اند.",
      },
      {
        question: "چه کالاهایی گمرک بیشتری دارند؟",
        answer: "کالای الکترونیکی، موبایل، لپ‌تاپ و برخی لوازم برند معمولاً تعرفه بیشتری دارند.",
      },
      {
        question: "آیا باید خودم برای ترخیص اقدام کنم؟",
        answer: "خیر، تمام مراحل گمرکی توسط میکروسل انجام می‌شود.",
      },
    ],
  },

  {
    value: "return",
    label: "مرجوعی و مشکلات سفارش",
    faqs: [
      {
        question: "اگر کالای اشتباه ارسال شود چه کنم؟",
        answer: "به پشتیبانی اطلاع دهید تا درخواست مرجوعی ثبت و کالا برای شما تعویض یا بازپرداخت شود.",
      },
      {
        question: "محصول آسیب‌دیده چطور مرجوع می‌شود؟",
        answer: "در صورت آسیب فیزیکی، عکس محصول ارسال می‌شود و مرجوعی طبق قوانین انجام خواهد شد.",
      },
      {
        question: "آیا همه کالاها قابل مرجوعی هستند؟",
        answer: "برخی کالاهای مصرفی یا بهداشتی قابلیت مرجوعی ندارند مگر اینکه مشکل فنی داشته باشند.",
      },
    ],
  },

  {
    value: "account",
    label: "حساب کاربری و پشتیبانی",
    faqs: [
      {
        question: "چطور می‌توانم سفارش‌های قبلی را ببینم؟",
        answer: "در پروفایل کاربری، بخش سفارش‌ها، تمام سفارش‌های فعال و تکمیل‌شده قابل مشاهده است.",
      },
      {
        question: "پشتیبانی چگونه در دسترس است؟",
        answer: "پشتیبانی از طریق تیکت، چت آنلاین و تماس تلفنی در ساعات کاری فعال است.",
      },
      {
        question: "چطور آدرس یا اطلاعات پروفایل را ویرایش کنم؟",
        answer: "در بخش پروفایل، امکان ویرایش اطلاعات شخصی، آدرس و شماره تماس وجود دارد.",
      },
    ],
  },
];

export const GUIDE_ITEMS = [
  {
    id: "shipping-return",
    label: "سیاست ارسال و بازگشت کالا",
    component: ShippingReturnPolicy,
  },
  {
    id: "customs-shipping",
    label: "خدمات گمرکی و حمل و نقل",
    component: CustomsShippingServices,
  },
  {
    id: "amazon-guide",
    label: "راهنمای خرید از آمازون",
    component: AmazonShoppingGuide,
  },
  {
    id: "points-terms",
    label: "شرایط استفاده از امتیازات",
    component: PointsTerms,
  },
];

import {
  Headphone,
  Flash,
  TickCircle,
  Wallet3,
  Card,
  Global,
  MoneyRecive,
  DocumentText,
  DocumentText1,
  TickCircle as TickCircleIcon,
  WalletMoney,
  MoneySend,
  DocumentText as ReceiptText,
  DocumentText as DocumentTextIcon,
} from "iconsax-reactjs";
import CurrencyPaymentForm from "./template/CurrencyServices/CurrencyPayment";

export const benefits = [
  { id: 4, icon: TickCircle, title: "کارمزد شفاف", description: "نرخ مشخص و بدون هزینه پنهان" },
  { id: 3, icon: Flash, title: "انجام سریع تراکنش", description: "انجام پرداخت در کوتاه ترین زمان" },
  { id: 2, icon: Headphone, title: "پشتیبانی تخصصی", description: "تیم پشتیبانی مالی و ارزی" },
  { id: 1, icon: ShieldTick, title: "امنیت بالا", description: "پرداخت از کانال های معتبر بین المللی" },
];

export const paymentSteps = [
  { id: 1, number: 1, icon: DocumentText1, title: "ثبت درخواست", description: "ارسال فرم و مشخصات مبلغ" },
  { id: 2, number: 2, icon: TickCircleIcon, title: "بررسی و تایید", description: "بررسی اطلاعات توسط تیم ما" },
  { id: 3, number: 3, icon: WalletMoney, title: "پرداخت مشتری", description: "پرداخت ریالی توسط کاربر" },
  { id: 4, number: 4, icon: MoneySend, title: "انجام تراکنش ارزی", description: "پرداخت ارزی در سیستم بین المللی" },
  { id: 5, number: 5, icon: ReceiptText, title: "ارسال تاییدیه پرداخت", description: "ارسال رسید رسمی برای کاربر" },
];

export const services = [
  {
    id: 1,
    icon: Wallet3,
    title: "شارژ حساب ارزی",
    features: ["شارژ PayPal, Amazon", "شارژ PayPal, Amazon", "شارژ PayPal, Amazon"],
    buttonText: "درخواست شارژ",
  },
  {
    id: 2,
    icon: Card,
    title: "پرداخت آمازون",
    features: ["پرداخت سفارش آمریکا/امارات"],
    buttonText: "ثبت سفارش آمازون",
  },
  {
    id: 3,
    icon: Global,
    title: "پرداخت ارزی بین المللی",
    features: ["Visa / Mastercard"],
    buttonText: "ثبت درخواست پرداخت",
  },
  {
    id: 4,
    icon: MoneyRecive,
    title: "تسویه حساب بین المللی",
    features: ["پرداخت به اشخاص خارجی"],
    buttonText: "شروع فرایند تسویه",
  },
  {
    id: 5,
    icon: Global,
    title: "پرداخت سرویس های خارجی",
    features: ["Adobe, Apple, Google"],
    buttonText: "ثبت درخواست",
  },
  {
    id: 6,
    icon: DocumentText,
    title: "پرداخت هزینه های گمرکی",
    features: ["پرداخت Tax و Duty"],
    buttonText: "درخواست پرداخت",
  },
];

export const testimonials = [
  { id: 1, name: "الهام حسینی", text: "تو دنیای امروز...", rating: 4.5 },
  { id: 2, name: "سارا اکبری", text: "تو دنیای امروز...", rating: 4.5 },
  { id: 3, name: "محمدرضا شفیعی", text: "تو دنیای امروز...", rating: 4.5 },
  { id: 4, name: "علی کریمی", text: "تو دنیای امروز...", rating: 4.5 },
];

export const selectConfigs = {
  service: {
    options: [
      { value: "paypal", label: "PayPal" },
      { value: "amazon", label: "Amazon Pay" },
      { value: "wallet", label: "Wallet" },
      { value: "swift", label: "SWIFT" },
    ],
    className:
      "h-[51px] bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-right",
  },
  currency: {
    options: [
      { value: "usd", label: "USD", flag: "🇺🇸" },
      { value: "eur", label: "EUR", flag: "🇪🇺" },
      { value: "gbp", label: "GBP", flag: "🇬🇧" },
    ],
    className: "h-12 border-none outline-none bg-transparent dark:bg-transparent rounded-xl text-right",
    showFlag: true,
  },
};

export const tabsCurrency = [
  { value: "forex", label: "پرداخت ارزی", icon: Global, componnet: CurrencyPaymentForm },
  { value: "card", label: "صدور کردیت کارت", icon: CardPos, componnet: CurrencyPaymentForm },
  { value: "wallet", label: "وال پی", icon: Paypal, componnet: CurrencyPaymentForm },
  { value: "swift", label: "سوییفت", icon: GlobalRefresh, componnet: CurrencyPaymentForm },
  { value: "giftcard", label: "گیفت کارت", icon: Gift, componnet: CurrencyPaymentForm },
  { value: "other", label: "خدمات دیگر", icon: DollarCircle, componnet: CurrencyPaymentForm },
];

// داده‌های تستی
export const mockProducts = [
  {
    id: 1,
    name: "لپ تاپ Dell XPS 15",
    category: "لپ تاپ",
    brand: "Dell",
    price: 45000000,
    stock: 15,
    sold: 45,
    status: "active",
    image: "/image/Home/product.png",
  },
  {
    id: 2,
    name: "گوشی سامسونگ Galaxy S24",
    category: "موبایل",
    brand: "Samsung",
    price: 32000000,
    stock: 8,
    sold: 120,
    status: "active",
    image: "/image/Home/product.png",
  },
  {
    id: 3,
    name: "هدفون Sony WH-1000XM5",
    category: "هدفون",
    brand: "Sony",
    price: 8500000,
    stock: 0,
    sold: 89,
    status: "out_of_stock",
    image: "/image/Home/product.png",
  },
  {
    id: 4,
    name: "ساعت هوشمند Apple Watch",
    category: "ساعت",
    brand: "Apple",
    price: 12000000,
    stock: 25,
    sold: 67,
    status: "active",
    image: "/image/Home/product.png",
  },
  {
    id: 5,
    name: "تبلت iPad Pro",
    category: "تبلت",
    brand: "Apple",
    price: 55000000,
    stock: 12,
    sold: 34,
    status: "active",
    image: "/image/Home/product.png",
  },
];

export const navigationItems = [
  { id: "dashboard", label: "داشبورد", icon: Element4, href: "/dashboard", hasChildren: false },
  {
    id: "currency",
    label: "خدمات ارزی",
    icon: BitcoinConvert,
    href: "/dashboard/currency-services",
    hasChildren: false,
  },
  {
    id: "orders",
    label: "خرید و سفارشها",
    icon: Bag,
    href: "/dashboard/orders",
    hasChildren: true,
    children: [
      { label: "خریدهای من", href: "/dashboard/purchases" },
      { label: "سفارشهای من", href: "/dashboard/orders" },
      { label: "فاکتورها", href: "/dashboard/invoices" },
      { label: "درخواست های مرجوعی", href: "/dashboard/returns" },
    ],
  },
  { id: "favorites", label: "علاقه مندی ها", icon: Heart, href: "/dashboard/favorites", hasChildren: false },
  { id: "support", label: "تیکت و پشتیبانی", icon: Headphone, href: "/dashboard/support", hasChildren: false },
  {
    id: "comparisons",
    label: "مقایسه های ذخیره شده",
    icon: DocumentText,
    href: "/dashboard/comparisons",
    hasChildren: false,
  },
  { id: "recent-views", label: "بازدیدهای اخیر", icon: Eye, href: "/dashboard/recent-views", hasChildren: false },
  {
    id: "account",
    label: "حساب کاربری من",
    icon: Profile,
    href: "/dashboard/account",
    hasChildren: true,
    children: [
      { id: "profile", label: "پروفایل کاربری", href: "/dashboard/account/profile" },
      { id: "addresses", label: "آدرسهای من", href: "/dashboard/account/addresses" },
      { id: "comments", label: "نظرات و سوالات", href: "/dashboard/account/comments" },
      { id: "invite", label: "دعوت دوستان", href: "/dashboard/account/invite" },
    ],
  },
];

export const mockAddresses = [
  {
    id: 1,
    name: "محسن رضایی",
    mobile: "۰۹۱۲۹۸۱۴۴۲۱",
    province: "تهران",
    city: "پونک",
    postalCode: "۱۴۵۶۷۵۹۲۲۱",
    address: "تهران، شهر ری خیابان کریم خان ، کوچه آزاده ۲ پلاک ۱۲",
    isDefault: true,
  },
  {
    id: 2,
    name: "محسن رضایی",
    mobile: "۰۹۱۲۹۸۱۴۴۲۱",
    province: "تهران",
    city: "سعادت آباد",
    postalCode: "۱۹۸۷۶۱۳۴۵۱",
    address: "بلوار دریا، خیابان صراف ها، پلاک ۳۴",
    isDefault: false,
  },
];

export const products = [
  {
    id: "۱۲۴۴۲۲",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۳",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۴",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۵",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۶",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۷",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۸",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۹",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
];

export const initialRequests = [
  {
    id: "ER-۵۵۲۱",
    serviceType: "انتقال حواله",
    amount: "۱,۲۰۰ USD",
    status: "reviewing",
    date: "۱۴۰۳/۱۰/۰۹ - ۰۹:۱۲",
  },
  {
    id: "ER-۵۵۲۰",
    serviceType: "پرداخت سرویس خارجی",
    amount: "۲۰۰ USD",
    status: "successful",
    date: "۱۴۰۳/۱۰/۰۸ - ۱۲:۴۲",
  },
];

export const orderDetailData = {
  id: "1",
  orderNumber: "۴۵۲۱۹-۸",
  orderDate: "۱۴۰۳/۱۰/۱۸",
  itemsCount: 3,
  totalAmount: "۴,۲۸۰,۰۰۰",
  status: "to-iran",
  paymentMethod: "آنلاین",
  products: [
    {
      id: "p1",
      name: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
      quantity: 1,
      unitPrice: 120450000,
      totalPrice: 120450000,
      color: "طلایی",
      colorCode: "#FFD700",
      image: "/image/Home/product.png",
    },
    {
      id: "p2",
      name: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
      quantity: 1,
      unitPrice: 120450000,
      totalPrice: 120450000,
      color: "طلایی",
      colorCode: "#FFD700",
      image: "/image/Home/product.png",
    },
    {
      id: "p3",
      name: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
      quantity: 1,
      unitPrice: 120450000,
      totalPrice: 120450000,
      color: "طلایی",
      colorCode: "#FFD700",
      image: "/image/Home/product.png",
    },
    {
      id: "p4",
      name: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
      quantity: 1,
      unitPrice: 120450000,
      totalPrice: 120450000,
      color: "طلایی",
      colorCode: "#FFD700",
      image: "/image/Home/product.png",
    },
  ],
  productsProgress: [
    {
      id: "p1",
      name: "محصول اول",
      deliveryEstimate: "۷ روز کاری",
      totalDays: "۲۰ روز کاری",
      currentStepIndex: 5,
      currentStatus: "در مسیر ایران",
      timelineSteps: [
        { id: "order", label: "ثبت سفارش", Icon: TickCircle },
        { id: "payment", label: "پرداخت موفق", Icon: CardTick1 },
        { id: "purchase", label: "خرید از فروشنده", Icon: Shop },
        { id: "dubai", label: "رسید به انبار دبی", Icon: BoxTick },
        { id: "to-iran", label: "ارسال به ایران", Icon: Send2 },
        { id: "clearance", label: "ترخیص", Icon: Truck },
        { id: "delivery", label: "تحویل مشتری", Icon: TickSquare },
      ],
    },
    {
      id: "p2",
      name: "محصول دوم",
      deliveryEstimate: "۷ روز کاری",
      totalDays: "۳۰ روز کاری",
      currentStepIndex: 5,
      currentStatus: "در مسیر ایران",
      timelineSteps: [
        { id: "order", label: "ثبت سفارش", Icon: TickCircle },
        { id: "payment", label: "پرداخت موفق", Icon: CardTick1 },
        { id: "purchase", label: "خرید از فروشنده", Icon: Shop },
        { id: "dubai", label: "رسید به انبار دبی", Icon: BoxTick },
        { id: "to-iran", label: "ارسال به ایران", Icon: Send2 },
        { id: "clearance", label: "ترخیص", Icon: Truck },
        { id: "delivery", label: "تحویل مشتری", Icon: TickSquare },
      ],
    },
    {
      id: "p3",
      name: "محصول سوم",
      deliveryEstimate: "۷ روز کاری",
      totalDays: "۳۰ روز کاری",
      currentStepIndex: 5,
      currentStatus: "در مسیر ایران",
      timelineSteps: [
        { id: "order", label: "ثبت سفارش", Icon: TickCircle },
        { id: "payment", label: "پرداخت موفق", Icon: CardTick1 },
        { id: "purchase", label: "خرید از فروشنده", Icon: Shop },
        { id: "dubai", label: "رسید به انبار دبی", Icon: BoxTick },
        { id: "to-iran", label: "ارسال به ایران", Icon: Send2 },
        { id: "clearance", label: "ترخیص", Icon: Truck },
        { id: "delivery", label: "تحویل مشتری", Icon: TickSquare },
      ],
    },
  ],
  deliveryAddress: {
    name: "محسن رضایی",
    phone: "۰۹۱۲۹۸۱۴۴۲۱",
    province: "تهران",
    city: "پونک",
    postalCode: "۱۴۵۶۷۵۹۲۲۱",
    address: "تهران، شهر ری خیابان کریم خان ، کوچه آزاده ۲ پلاک ۱۲",
  },
  paymentStatus: {
    paidPercentage: 65,
    paidAmount: "۱,۲۰۰,۰۰۰",
    remainingPercentage: 35,
    remainingAmount: "۴۵۰,۰۰۰",
  },
  media: [
    { type: "video", url: "/videos/product1.mp4", thumbnail: "/image/Home/product.png.jpg" },
    { type: "image", url: "/image/Home/product.png.jpg" },
    { type: "image", url: "/image/Home/product.png.jpg" },
    { type: "image", url: "/image/Home/product.png.jpg" },
    { type: "image", url: "/image/Home/product.png.jpg" },
  ],
  trackingCodes: [
    {
      label: "Amazon Tracking",
      code: "TBA-۳۴۷۶۹۱۲۳",
      url: "https://amazon.com/tracking/TBA-34769123",
    },
    {
      label: "UAE-IR Tracking",
      code: "ML-DXB-۸۷۳۲۱",
      url: "https://tracking.com/ML-DXB-87321",
    },
    {
      label: "داخل ایران Tracking",
      code: "۵۲۲۹۹۳۷۲۸۳۴۵",
      url: "https://post.ir/tracking/522993728345",
    },
  ],
  paymentInfo: {
    itemsPrice: 12450000,
    discount: 150000,
    totalWeight: 12.5,
    shippingType: "هوایی سریع",
    shippingCostDubai: 150000,
    tax: 150000,
    domesticShipping: 150000,
    finalAmount: 150000,
    installmentPlan: "فعال",
    paidPercentage: 35,
    paidAmount: 150000,
  },
  needsSecondPayment: true,
  remainingAmount: 1200000,
  hasTicket: false,
};

export const initialOrders = [
  {
    id: "1",
    orderNumber: "۸-۴۵۲۱۹",
    orderDate: "۱۴۰۳/۱۰/۱۸",
    itemsCount: 4,
    totalAmount: "۴,۲۸۰,۰۰۰",
    status: "to-iran",
    paymentStatus: "پرداخت کامل",
    needsSecondPayment: false,
    products: [
      {
        id: "p1",
        name: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
        quantity: 1,
        price: 27450000,
        image: "/image/Home/product.png",
      },
      {
        id: "p2",
        name: "m - Advanced ming Console",
        quantity: 1,
        price: 15000000,
        image: null,
      },
    ],
    timeline: {
      currentStepIndex: 2,
      productName: "محصول اول",
      steps: [
        { id: "clearance", label: "ترخیص", Icon: Truck },
        { id: "to-iran", label: "ارسال به ایران", Icon: Send2 },
        { id: "warehouse", label: "رسید به انبار", Icon: Buildings2 },
      ],
    },
  },
  {
    id: "2",
    orderNumber: "۷-۴۵۲۱۸",
    orderDate: "۱۴۰۳/۱۰/۱۷",
    itemsCount: 2,
    totalAmount: "۳,۵۰۰,۰۰۰",
    status: "processing",
    paymentStatus: "پرداخت جزئی",
    needsSecondPayment: true,
    products: [
      {
        id: "p3",
        name: "iPhone 15 Pro Max",
        quantity: 1,
        price: 35000000,
        image: null,
      },
    ],
    timeline: {
      currentStepIndex: 1,
      productName: "محصول اول",
      steps: [
        { id: "clearance", label: "ترخیص", Icon: Truck },
        { id: "to-iran", label: "ارسال به ایران", Icon: Send2 },
        { id: "warehouse", label: "رسید به انبار", Icon: Buildings2 },
      ],
    },
  },
  {
    id: "3",
    orderNumber: "۶-۴۵۲۱۷",
    orderDate: "۱۴۰۳/۱۰/۱۶",
    itemsCount: 1,
    totalAmount: "۱,۲۰۰,۰۰۰",
    status: "delivered",
    paymentStatus: "پرداخت کامل",
    needsSecondPayment: false,
    products: [
      {
        id: "p4",
        name: "Samsung Galaxy S24 Ultra",
        quantity: 1,
        price: 12000000,
        image: null,
      },
    ],
    timeline: {
      currentStepIndex: 3,
      productName: "محصول اول",
      steps: [
        { id: "clearance", label: "ترخیص", Icon: Truck },
        { id: "to-iran", label: "ارسال به ایران", Icon: Send2 },
        { id: "warehouse", label: "رسید به انبار", Icon: Buildings2 },
      ],
    },
  },
];

export const initialInvoices = [
  {
    id: "1",
    invoiceNumber: "INV-20240214-9873",
    orderNumber: "MCL-20240214-5512",
    orderType: "نماینده (Partner)",
    issueDate: "۱۴۰۳/۱۰/۲۱",
    amount: "۱۲,۳۵۰,۰۰۰",
    amountNumber: 12350000,
    status: "paid",
    statusText: "پرداخت شده",
  },
  {
    id: "2",
    invoiceNumber: "INV-20240214-9873",
    orderNumber: "MCL-20240214-5512",
    orderType: "نماینده (Partner)",
    issueDate: "۱۴۰۳/۱۰/۲۱",
    amount: "۱۲,۳۵۰,۰۰۰",
    amountNumber: 12350000,
    status: "paid",
    statusText: "پرداخت شده",
  },
  {
    id: "3",
    invoiceNumber: "INV-20240213-9872",
    orderNumber: "MCL-20240213-5511",
    orderType: "عادی (Normal)",
    issueDate: "۱۴۰۳/۱۰/۲۰",
    amount: "۸,۵۰۰,۰۰۰",
    amountNumber: 8500000,
    status: "paid",
    statusText: "پرداخت شده",
  },
  {
    id: "4",
    invoiceNumber: "INV-20240212-9871",
    orderNumber: "MCL-20240212-5510",
    orderType: "ویژه (Special)",
    issueDate: "۱۴۰۳/۱۰/۱۹",
    amount: "۱۵,۲۰۰,۰۰۰",
    amountNumber: 15200000,
    status: "pending",
    statusText: "در انتظار پرداخت",
  },
];

export const activeReturn = {
  id: "RM-۴۵۲۱۹",
  product: {
    name: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
  },
  reason: "خرابی محصول",
  date: "۱۴۰۳/۱۰/۲۰",
  status: "reviewing",
  currentStep: 2,
};

export const initialReturns = [
  {
    id: "RM-۴۵۲۱۹",
    product: {
      name: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
      image: "/image/Home/product.png",
    },
    reason: "خرابی محصول",
    date: "۱۴۰۳/۱۰/۲۰",
    status: "reviewing",
    refundAmount: null,
  },
  {
    id: "RM-۴۵۲۱۸",
    product: {
      name: "iPhone 15 Pro Max - 256GB",
      image: "/image/Home/product.png",
    },
    reason: "کالای اشتباه",
    date: "۱۴۰۳/۱۰/۱۸",
    status: "approved",
    refundAmount: "۳۵,۰۰۰,۰۰۰",
  },
  {
    id: "RM-۴۵۲۱۷",
    product: {
      name: "Samsung Galaxy S24 Ultra - 512GB",
      image: "/image/Home/product.png",
    },
    reason: "آسیب دیده",
    date: "۱۴۰۳/۱۰/۱۵",
    status: "completed",
    refundAmount: "۱۲,۰۰۰,۰۰۰",
  },
  {
    id: "RM-۴۵۲۱۶",
    product: {
      name: "MacBook Pro 16-inch M3 Max",
      image: "/image/Home/product.png",
    },
    reason: "مطابق توضیحات نیست",
    date: "۱۴۰۳/۱۰/۱۲",
    status: "rejected",
    refundAmount: null,
  },
  {
    id: "RM-۴۵۲۱۵",
    product: {
      name: "AirPods Pro 2nd Generation",
      image: "/image/Home/product.png",
    },
    reason: "سایر",
    date: "۱۴۰۳/۱۰/۱۰",
    status: "approved",
    refundAmount: "۸,۵۰۰,۰۰۰",
  },
  {
    id: "RM-۴۵۲۱۴",
    product: {
      name: "Nintendo Switch OLED Model",
      image: "/image/Home/product.png",
    },
    reason: "خرابی محصول",
    date: "۱۴۰۳/۱۰/۰۸",
    status: "reviewing",
    refundAmount: null,
  },
  {
    id: "RM-۴۵۲۱۳",
    product: {
      name: "Xbox Series X Console",
      image: "/image/Home/product.png",
    },
    reason: "کالای اشتباه",
    date: "۱۴۰۳/۱۰/۰۵",
    status: "completed",
    refundAmount: "۲۸,۰۰۰,۰۰۰",
  },
  {
    id: "RM-۴۵۲۱۲",
    product: {
      name: "iPad Pro 12.9-inch M2",
      image: "/image/Home/product.png",
    },
    reason: "آسیب دیده",
    date: "۱۴۰۳/۱۰/۰۳",
    status: "reviewing",
    refundAmount: null,
  },
];

export const mockOrders = [
  {
    id: "A-45219",
    date: "۱۴۰۳/۱۰/۱۸",
    totalAmount: "۴,۲۸۰,۰۰۰",
    status: "delivered",
    statusText: "تحویل شده",
    items: [
      {
        id: "p1",
        name: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
        image: "/image/Home/product.png",
        quantity: 1,
        price: "۲۷,۴۵۰,۰۰۰",
      },
      {
        id: "p2",
        name: "DualSense Wireless Controller for PlayStation 5",
        image: "/image/Home/product.png",
        quantity: 2,
        price: "۳,۵۰۰,۰۰۰",
      },
    ],
  },
  {
    id: "A-45218",
    date: "۱۴۰۳/۱۰/۱۷",
    totalAmount: "۳۵,۰۰۰,۰۰۰",
    status: "delivered",
    statusText: "تحویل شده",
    items: [
      {
        id: "p3",
        name: "iPhone 15 Pro Max - 256GB - Natural Titanium",
        image: "/image/Home/product.png",
        quantity: 1,
        price: "۳۵,۰۰۰,۰۰۰",
      },
    ],
  },
];

export const PERSONAL_FIELDS = [
  {
    name: "firstName",
    label: "نام",
    required: true,
    maxLength: 50,
  },
  {
    name: "lastName",
    label: "نام خانوادگی",
    required: true,
    maxLength: 50,
  },
  {
    name: "email",
    label: "ایمیل",
    type: "email",
    required: true,
  },
  {
    name: "phoneNumber",
    label: "شماره تماس",
    required: true,
    pattern: {
      value: /^09[0-9]{9}$/,
      message: "شماره تماس معتبر نیست",
    },
  },
  {
    name: "profileImage",
    label: "مسیر تصویر پروفایل",
    placeholder: "uploads/user/1/profile/image.jpg",
  },
];

export const mockInvoiceData = {
  id: "INV-۱۲۳۴۴",
  invoiceNumber: "۸۷۴۳-۲۰۲۴۰۲۰۳-IN۷",
  issueDate: "۱۴۰۳/۱۰/۱۸",
  orderType: "نماینده (Partner)",
  orderId: "MCL-P-۲۰۲۴۰۲۰۳-۸۷۴۳",
  totalAmount: 12350000,
  status: "paid",
  timelineSteps: [
    { id: "order", label: "ثبت سفارش", Icon: TickCircle, date: "۱۴۰۳/۰۷/۰۵", completed: true },
    { id: "payment", label: "پرداخت موفق", Icon: CardTick1, date: "۱۴۰۳/۰۱/۱۲", completed: true },
    { id: "purchase", label: "خرید از فروشنده", Icon: Shop, completed: false },
  ],
  recipient: {
    name: "محمد صالحی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    nationalId: "۶۶۰۰۱۲۲۳۴۵",
    deliveryType: "پست پیشتاز",
    address: "تهران، پاسداران، خیابان گلستان ششم، پلاک ۲۸، واحد ۳",
  },
  products: [
    {
      id: "p1",
      name: "محصول نمونه Microless",
      quantity: 1,
      representativePrice: 12300000,
      subtotal: 12300000,
      weight: 12.5,
    },
    {
      id: "p2",
      name: "محصول دوم نمونه",
      quantity: 2,
      representativePrice: 12300000,
      subtotal: 12300000,
      weight: 12.5,
    },
  ],
  paymentInfo: {
    totalAmount: 12450000,
    paidAmount: 12450000,
    remainingAmount: 0,
    paymentDate: "۱۴۰۳/۰۶/۰۳",
    transactionNumber: "۳۴۷۸۹۹۱۲۳",
    paymentMethod: "درگاه زرین پال",
  },
  trackingCodes: [
    {
      label: "Amazon Tracking",
      code: "TBA-۳۴۷۶۹۱۲۳",
      url: "https://amazon.com/tracking/TBA-34769123",
    },
    {
      label: "UAE-IR Tracking",
      code: "ML-DXB-۸۷۳۲۱",
      url: "https://tracking.com/ML-DXB-87321",
    },
    {
      label: "داخل ایران Tracking",
      code: "۵۲۲۹۹۳۷۲۸۳۴۵",
      url: "https://post.ir/tracking/522993728345",
    },
  ],
};

export const initialComparisons = [
  {
    id: 1,
    title: "مقایسه کنترلرهای پلی استیشن",
    category: "لوازم جانبی کنسول",
    products: [
      {
        id: "p1",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
      {
        id: "p2",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
    ],
    saveDate: "۱۴۰۳/۱۰/۱۹",
    productsCount: 3,
  },
  {
    id: 2,
    title: "مقایسه کنترلرهای پلی استیشن",
    category: "لوازم جانبی کنسول",
    products: [
      {
        id: "p3",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
      {
        id: "p4",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
    ],
    saveDate: "۱۴۰۳/۱۰/۱۹",
    productsCount: 3,
  },
  {
    id: 3,
    title: "مقایسه کنترلرهای پلی استیشن",
    category: "لوازم جانبی کنسول",
    products: [
      {
        id: "p5",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
      {
        id: "p6",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
    ],
    saveDate: "۱۴۰۳/۱۰/۱۹",
    productsCount: 3,
  },
];

export const initialComments = [
  {
    id: 1,
    productTitle: "Sony Play Station ۵ Slim – Advanced Edition Gaming Console",
    productImage: "/image/Home/product.png",
    comment: "کیفیت ساخت خیلی خوبه و دکمه ها عملکرد نرمی دارن",
    rating: 4.5,
    status: "pending",
    statusText: "در حال بررسی",
    date: "۱۴۰۳/۰۱/۲۱",
    replies: [
      {
        id: 1,
        text: "از نظر شما ممنونیم. خوشحالیم که رضایت داشتید",
        date: "۱۴۰۳/۰۱/۲۲",
      },
      {
        id: 2,
        text: "پاسخ دوم برای تست",
        date: "۱۴۰۳/۰۱/۲۳",
      },
    ],
  },
  {
    id: 2,
    productTitle: "Sony Play Station ۵ Slim – Advanced Edition Gaming Console",
    productImage: "/image/Home/product.png",
    comment: "کیفیت ساخت خیلی خوبه و دکمه ها عملکرد نرمی دارن",
    rating: 4.5,
    status: "approved",
    statusText: "تأیید شده",
    date: "۱۴۰۳/۰۱/۲۱",
    replies: [],
  },
];

export const initialMessages = [
  {
    id: 1,
    title: "پاسخ جدید به تیکت شما",
    type: "support",
    typeLabel: "پشتیبانی",
    message: "",
    actionButton: null,
  },
  {
    id: 2,
    title: "پرداخت موفق | کیف پول",
    type: "payment",
    typeLabel: "پرداخت",
    message: "",
    actionButton: null,
  },
  {
    id: 3,
    title: "در حال ارسال: کنترلر پلی استیشن ۵",
    type: "order",
    typeLabel: "سفارشات",
    message:
      "متن پیام: سفارش شما با شماره ۴۵۲۳۱# با موفقیت تحویل داده شد. در صورت نیاز میتوانید جزئیات سفارش را مشاهده کنید.",
    actionButton: {
      label: "مشاهده سفارش",
      href: "/dashboard/orders/1",
    },
  },
  {
    id: 4,
    title: "پرداخت موفق | کیف پول",
    type: "payment",
    typeLabel: "پرداخت",
    message: "",
    actionButton: null,
  },
];

export // داده‌های تستی
const mockProduct = {
  id: "1",
  name: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری REC کرونوگراف حرفه ای و لوکس",
  title: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری REC کرونوگراف حرفه ای و لوکس",
  englishName: "Invicta Men's Watch, Model 0361, Reserve Series - Professional and Luxury Chronograph",
  price: 15370000,
  discountPrice: 12450000,
  mainImage: "/image/Home/product.png",
  images: [
    "/image/Home/product.png",
    "/image/Home/product.png",
    "/image/Home/product.png",
    "/image/Home/product.png",
    "/image/Home/product.png",
  ],
  rating: 4.7,
  reviewCount: 235,
  inStock: true,
  categoryName: "ساعت هوشمند",
  categoryId: "1",
  parentCategoryName: "کالای دیجیتال",
  brandName: "Invicta",
  shortDescription:
    "طراحی چشم گیر با موتور سوئیسی و بدنه استیل مقاوم مناسب برای استایل رسمی و اسپرت با دقت بالا و عملکرد کرونوگراف چند حالته.",
  description:
    "<p>ساعت مچی مردانه Invicta با طراحی لوکس و حرفه‌ای. این ساعت دارای موتور سوئیسی با دقت بالا و بدنه استیل مقاوم است که مناسب برای استایل رسمی و اسپرت می‌باشد.</p>",
  colors: [
    { id: "1", value: "white", label: "سفید", name: "سفید" },
    { id: "2", value: "gold", label: "طلایی", name: "طلایی" },
    { id: "3", value: "navy", label: "سرمه ای", name: "سرمه ای" },
  ],
  attributes: [
    { name: "برند", key: "brand", value: "Invicta", label: "Invicta" },
    { name: "مدل", key: "model", value: "Reserve Chronograph", label: "Reserve Chronograph" },
    { name: "کشور سازنده", key: "country", value: "سوئیس", label: "سوئیس" },
    { name: "جنس بدنه", key: "material", value: "استیل ضدزنگ", label: "استیل ضدزنگ" },
    { name: "نوع موتور", key: "movement", value: "کوارتز کرونوگراف", label: "کوارتز کرونوگراف" },
    { name: "مقاومت در برابر آب", key: "waterResistance", value: "تا عمق ۲۰۰ متر", label: "تا عمق ۲۰۰ متر" },
  ],
  badges: ["پرفروش ترین", "ارسال بین المللی"],
  seller: "امازون امارات",
  sellerLogo: "/image/Header/paypal.png",
  amazonLink: "https://amazon.ae",
};
