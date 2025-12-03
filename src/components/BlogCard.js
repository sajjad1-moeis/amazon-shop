import { Edit2, Timer1 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function BlogCard() {
  return (
    <Link href={"/blog/5"}>
      <div className="bg-white dark:bg-dark-box dark:border dark:border-dark-field rounded-xl overflow-hidden shadow dark:shadow-gray-900/50">
        <div className="relative aspect-square max-h-[177px] lg:max-h-[300px] w-full bg-black dark:bg-black">
          <Image src="/image/Blogs/blog.png" alt={`عکس بلاگ`} fill className="object-cover rounded-md" />
        </div>
        <div className="p-3">
          <p className="text-lg text-gray-800 dark:text-dark-titre font-semibold">راهنمای کامل خرید از آمازون آمریکا</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-dark-text">
            در این مقاله یاد می‌گیرید چگونه از آمازون آمریکا سفارش بدهید و هزینه‌ها را دقیق محاسبه کنید.
          </p>
          <div className="mt-4 flex justify-between text-gray-400 dark:text-[#9CA3AF] text-xs">
            <div className="flex items-center gap-2">
              <Timer1 size={18} />
              <p>۵ دقیقه مطالعه</p>
            </div>
            <div className="flex items-center gap-2">
              <Edit2 size={18} />
              <p>تیم میکرولس</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
