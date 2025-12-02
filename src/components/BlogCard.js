import { Edit2, Timer1 } from "iconsax-reactjs";
import Image from "next/image";
import React from "react";

function BlogCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow">
      <div className="relative aspect-square max-h-[177px] lg:max-h-[300px] w-full">
        <Image src="/image/Blogs/blog.png" alt={`عکس بلاگ`} fill className="object-cover rounded-md" />
      </div>
      <div class="p-3">
        <p className="text-lg text-gray-800">راهنمای کامل خرید از آمازون آمریکا</p>
        <p className="mt-2 text-sm text-gray-500">
          در این مقاله یاد می‌گیرید چگونه از آمازون آمریکا سفارش بدهید و هزینه‌ها را دقیق محاسبه کنید.
        </p>
        <div class="mt-4 flex-between text-gray-400 text-xs">
          <div className="flex-between gap-2">
            <Timer1 size={18} />
            <p>5 دقیقه مطالعه</p>
          </div>
          <div className="flex-between gap-2">
            <Edit2 size={18} />
            <p>تیم میکرولس</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
