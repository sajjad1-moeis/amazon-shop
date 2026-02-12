import React from "react";
import { Button } from "./ui/button";
import { DiscountShape } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import Link from "next/link";

function DiscountAmazonButton({ className }) {
  return (
    <Link href="/products?discount=true">
      <Button
        variant="ghost"
        className={cn("flex items-center gap-2 rounded-xl px-3 py-1 text-[#FFCD38] dark:text-[#F6992B]", className)}
      >
        <DiscountShape className="max-sm:hidden" variant="Bold" />
        <span className="text-xs md:text-sm">تخفیف های آمازون</span>
      </Button>
    </Link>
  );
}

export default DiscountAmazonButton;
