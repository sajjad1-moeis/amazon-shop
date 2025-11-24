import TitleCard from "@/components/TitleCard";
import { Button } from "@/components/ui/button";
import { ArrowDown2, Sort } from "iconsax-reactjs";
import React from "react";

function BlogFilter() {
  return (
    <div class="flex-between mb-8">
      <TitleCard title={"لیست مقالات ما"} />
      <div class="flex-between">
        <Button variant="ghost" className="bg-gray-100 border border-gray-300 rounded-lg flex-between text-gray-500">
          <Sort size={20} />
          مرتب سازی
          <ArrowDown2 size={18} />
        </Button>
        <Button variant="ghost" className="bg-gray-100 border border-gray-300 rounded-lg flex-between text-gray-500">
          <Sort size={20} />
          مرتب سازی
          <ArrowDown2 size={18} />
        </Button>
      </div>
    </div>
  );
}

export default BlogFilter;
