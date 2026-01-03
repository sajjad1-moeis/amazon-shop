import { cn } from "@/lib/utils";
import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";
import React from "react";

function ViewAllProductsCard({ className }) {
  return (
    <Link href={"/products"}>
      <div
        className={cn(
          "flex  justify-center mt-5 dark:text-dark-title text-primary-400 gap-2 md:hidden cursor-pointer hover:text-primary-500 dark:hover:text-[#B1B1FF] transition-colors",
          className
        )}
      >
        <p>مشاهده همه محصولات</p>
        <ArrowLeft2 size={20} />
      </div>
    </Link>
  );
}

export default ViewAllProductsCard;
