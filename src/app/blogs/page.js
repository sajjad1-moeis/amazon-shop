import BlogCard from "@/components/BlogCard";
import IndexLayout from "@/layout/IndexLayout";
import BlogList from "@/template/Blogs/BlogList";
import PaginationBlogs from "@/template/Blogs/PaginationBlogs";
import Image from "next/image";
import React from "react";

function Page() {
  return (
    <IndexLayout>
      <div className="bg-gray-50 pb-20 dark:bg-dark-bg">
        <div className="relative aspect-square max-h-40 lg:max-h-[376px] w-full mb-10 md:mb-20">
          <Image src="/image/Blogs/blogBg.png" alt={`محصول بازدید شده شماره `} fill className="object-cover" />
        </div>{" "}
        <BlogList count={6} />
        <div className="grid lg:grid-cols-2 gap-5 container my-4 md:my-8">
          <div className="relative aspect-square max-h-40 md:max-h-[250px] w-full">
            <Image
              src="/image/Blogs/banner1.png"
              alt={`محصول بازدید شده شماره `}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="relative aspect-square max-h-40 md:max-h-[250px] w-full">
            <Image
              src="/image/Blogs/banner2.png"
              alt={`محصول بازدید شده شماره `}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-3 lg:gap-6 container">
          {[...Array(6)].map((blog) => (
            <BlogCard />
          ))}
        </div>
        <PaginationBlogs count={6} />
      </div>
    </IndexLayout>
  );
}

export default Page;
