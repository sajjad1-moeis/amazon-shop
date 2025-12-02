import { Bag2, CardPos, Shield, Truck } from "iconsax-reactjs";
import Image from "next/image";

const features = [
  {
    icon: <CardPos size={28} variant="Bold" />,
    title: "پرداخت امن ریالی",
    desc: "بدون نیاز به کارت بین‌المللی، پرداخت راحت",
  },
  {
    icon: <Bag2 size={28} variant="Bold" />,
    title: "خرید مستقیم از آمازون",
    desc: "ما کالا را از سایت اصلی برایتان تهیه می‌کنیم",
  },
  {
    icon: <Truck size={28} variant="Bold" />,
    title: "ارسال مطمئن به ایران",
    desc: "تحویل درب منزل با گارانتی سلامت کالا",
  },
  {
    icon: <Shield size={28} variant="Bold" />,
    title: "تضمین اصالت و کیفیت",
    desc: "سیرکوالیتی؛ قبل از ارسال کالا بررسی می‌شود",
  },
];

export default function LandingSection() {
  return (
    <div className="w-full flex flex-col items-center bg-[#f8fafc] py-20">
      {/* Top Section */}
      <div className="container w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {/* Left Box */}
        <div className="bg-white shadow-lg rounded-2xl p-4 text-right leading-7 text-gray-600 h-max my-auto max-lg:text-sm">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4 text-gray-700">چشم‌انداز ما روشن است:</h2>
          <p>میکروپارس می‌خواهد به اولین انتخاب ایرانیان برای خرید جهانی تبدیل شود.</p>
          <p> جایی که شفافیت، سرعت و اصالت سه اصل همیشگی‌اند.</p>
          <p className="mt-4">
            ما به آینده‌ای فکر می‌کنیم که در آن خرید از هر فروشگاه جهانی، برای هر کاربر ایرانی به سادگی خرید از یک
            فروشگاه داخلی باشد.
          </p>
        </div>

        {/* Center Image */}
        <div className="flex justify-center max-lg:hidden">
          <Image src="/image/About-Us/earth.png" alt="earth amazon" width={300} height={300} />
        </div>

        {/* Right Box */}
        <div className="bg-white shadow-lg rounded-2xl p-4 text-right leading-7 text-gray-600 my-auto h-max max-lg:text-sm">
          <h2 className="md:text-2xl lg:text-3xl font-bold mb-4 text-gray-700">ماموریت ما ساده اما عمیق است:</h2>
          <p>
            در میکروپارس، تمام هزینه‌ها از قیمت کالا تا حمل و گمرک، به‌صورت شفاف نمایش داده می‌شود. شما می‌دانید دقیقاً
            چه چیزی می‌پردازید و چرا.
          </p>
          <p className="mt-4">
            هر سفارشی قابل رهگیری است، هر کالا قبل از ارسال بررسی می‌شود، و هر مشتری می‌داند دقیقاً چه زمانی کالا‌یش را
            دریافت خواهد کرد.
          </p>
        </div>
      </div>

      {/* Features Title */}
      <h3 className="text-2xl lg:text-3xl font-bold mt-14 md:mt-20 mb-10">ویژگی‌هایی که ما را متمایز می‌کند</h3>

      <div className="container w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {features.map((item, index) => (
          <div key={index} className="bg-white shadow rounded-2xl p-6 flex flex-col  ">
            <div className="bg-primary-700 text-primary-50 p-2.5 rounded-lg w-max">{item.icon}</div>
            <p className="mt-3 font-bold text-xl text-primary-700">{item.title}</p>
            <p className="text-sm mt-3 text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
