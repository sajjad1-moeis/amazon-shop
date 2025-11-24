import IndexLayout from "@/layout/IndexLayout";
import BlogList from "@/template/Blogs/BlogList";
import PaginationBlogs from "@/template/Blogs/PaginationBlogs";
import Image from "next/image";
import React from "react";

function Page() {
  return (
    <IndexLayout>
      <div class="bg-gray-50 pb-20">
        <div className="relative aspect-square max-h-[376px] w-full mb-20">
          <Image src="/image/Blogs/blogBg.png" alt={`محصول بازدید شده شماره `} fill className="object-cover" />
        </div>{" "}
        <BlogList count={6} />
        <div class="grid grid-cols-2 gap-5 container my-8">
          <div className="relative aspect-square max-h-[250px] w-full">
            <Image
              src="/image/Blogs/banner1.png"
              alt={`محصول بازدید شده شماره `}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="relative aspect-square max-h-[250px] w-full">
            <Image
              src="/image/Blogs/banner2.png"
              alt={`محصول بازدید شده شماره `}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
        <BlogList count={6} />
        <PaginationBlogs count={6} />
      </div>
    </IndexLayout>
  );
}

export default Page;
