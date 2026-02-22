import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";
import React from "react";

function TitleCard({ className, title, content, titleClassName, contentHref }) {
  const ContentLink = contentHref ? Link : React.Fragment;
  const contentProps = contentHref ? { href: contentHref } : {};

  return (
    <div class={`flex-between ${className}`}>
      <div className="">
        <p className={`text-gray-700  dark:text-dark-title mb-3  ${titleClassName || "text-lg md:text-2xl "} `}>
          {title}
        </p>
        <svg
          className="max-md:max-w-32"
          width="178"
          height="4"
          viewBox="0 0 178 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="1.5" y1="1.5" x2="15.8333" y2="1.5" stroke="#DBDEEF" strokeWidth="3" stroke-linecap="round" />
          <line x1="22.833" y1="1.5" x2="37.1663" y2="1.5" stroke="#B6BCDF" strokeWidth="3" stroke-linecap="round" />
          <line x1="44.167" y1="1.5" x2="58.5003" y2="1.5" stroke="#6171C8" strokeWidth="3" stroke-linecap="round" />
          <line
            x1="69.5137"
            y1="1.51382"
            x2="175.514"
            y2="2.48631"
            stroke="#3F51B5"
            strokeWidth="3"
            stroke-linecap="round"
          />
        </svg>
      </div>
      {content && (
        <ContentLink {...contentProps}>
          <div className="flex-between text-primary-400 dark:text-[#ADB4FF] gap-2 max-md:hidden cursor-pointer hover:text-primary-500 dark:hover:text-[#B1B1FF] transition-colors">
            <p>{content}</p>
            <ArrowLeft2 size={20} />
          </div>
        </ContentLink>
      )}
    </div>
  );
}

export default TitleCard;
