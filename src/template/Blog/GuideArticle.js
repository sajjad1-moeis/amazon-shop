import Image from "next/image";
import { Calendar2, Edit2, Heart, Share, Timer1 } from "iconsax-reactjs";
import DescriptionBlog from "./DescriptionBlog";

export default function AmazonGuideArticle() {
  return (
    <div className="container bg-white p-4 py-8 lg:p-8 " dir="rtl">
      {/* Header Section */}
      <div className="mb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          <div className=" lg:col-span-2">
            <div className="relative aspect-square max-h-[304px] w-full">
              <Image
                src="/image/Blogs/blog.png"
                alt={`محصول بازدید شده شماره `}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-3 w-full ">
            <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-primary-700 lg:leading-[50px] text-right">
              چگونه از آمازون آمریکا خرید کنیم؟ (راهنمای کامل برای خریداران ایرانی)
            </h1>

            <div className="flex-between  md:gap-6 max-md:text-xs text-sm text-gray-400 mb-4 mt-5 flex-wrap">
              <div className="flex items-center gap-2">
                <Timer1 size={22} />
                <span>۵ دقیقه مطالعه</span>
              </div>
              <div className="flex items-center gap-2">
                <Edit2 size={22} />
                <span>تیم میکرولس</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar2 size={22} />
                <span>۱۴۰۳/۰۱/۰۱</span>
              </div>
              <div className="flex items-center gap-2 max-md:absolute top-4 left-4">
                <button className="text-gray-500 max-md:text-gray-300">
                  <Heart size={28} />
                </button>
                <button className="text-primary-500">
                  <Share size={28} />
                </button>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4 mt-4 text-gray-500 max-md:text-sm">
              <p>
                خرید از آمازون همیشه یکی از جذاب‌ترین گزینه‌ها برای دسترسی به محصولات اصل و متنوع دنیا بوده است. اما
                برای کاربران ایرانی، این فرآیند ممکن است کمی پیچیده به‌نظر برسد.{" "}
              </p>
              <p>
                در این مقاله قدم‌به‌قدم به شما نشان می‌دهیم که چگونه از آمازون آمریکا خرید کنید و کالا را بدون دردسر به
                ایران برسانید . شما کالا را به ضمانت ما خریداری می کنید
              </p>
            </div>
          </div>
        </div>
      </div>

      <DescriptionBlog />
    </div>
  );
}
