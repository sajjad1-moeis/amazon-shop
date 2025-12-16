import { Edit2, Timer1 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function BlogCard({ blog }) {
  if (!blog) {
    return null;
  }

  const imageUrl = blog.featuredImageUrl
    ? blog.featuredImageUrl.startsWith("http")
      ? blog.featuredImageUrl
      : `https://micrls.com${blog.featuredImageUrl}`
    : "/image/Blogs/blog.png";

  const slug = blog.slug || blog.id;

  return (
    <Link href={`/blog/${slug}`}>
      <div className="bg-white dark:bg-dark-box dark:border dark:border-dark-field rounded-xl overflow-hidden shadow dark:shadow-gray-900/50">
        <div className="relative aspect-square max-h-[177px] lg:max-h-[300px] w-full bg-black dark:bg-black">
          <Image
            src={imageUrl}
            alt={blog.title || "عکس بلاگ"}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="p-3">
          <p className="text-lg text-gray-800 dark:text-dark-titre font-semibold">
            {blog.title || "عنوان بلاگ"}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-dark-text">
            {blog.shortDescription || "توضیحات بلاگ"}
          </p>
          <div className="mt-4 flex justify-between text-gray-400 dark:text-[#9CA3AF] text-xs">
            <div className="flex items-center gap-2">
              <Timer1 size={18} />
              <p>{blog.viewCount || 0} بازدید</p>
            </div>
            <div className="flex items-center gap-2">
              <Edit2 size={18} />
              <p>{blog.authorFullName || "نویسنده"}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
