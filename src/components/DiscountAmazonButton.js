import React from "react";
import { Button } from "./ui/button";
import { DiscountShape } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

function DiscountAmazonButton({ className }) {
  return (
    <Button
      variant="ghost"
      className={cn("flex items-center gap-2 rounded-xl px-3 py-1 text-[#FFCD38] dark:text-[#F6992B]", className)}
    >
      <DiscountShape variant="Bold" />
      <span className="text-sm">تخفیف های آمازون</span>
    </Button>
  );
}

export default DiscountAmazonButton;
