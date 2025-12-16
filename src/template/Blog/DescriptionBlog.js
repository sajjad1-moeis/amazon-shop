import TitleCard from "@/components/TitleCard";
import React from "react";

function DescriptionBlog({ content }) {
  if (!content) {
    return null;
  }

  return (
    <div className="mt-14 lg:mt-32">
      <div
        className="text-gray-500 leading-7 text-right mt-8 dark:text-dark-text prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default DescriptionBlog;
