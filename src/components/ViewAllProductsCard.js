import { cn } from "@/lib/utils";
import { ArrowLeft2 } from "iconsax-reactjs";
import React from "react";

function ViewAllProductsCard({ className }) {
  return (
    <div className={cn("flex  justify-center mt-5  text-primary-400 gap-2 md:hidden", className)}>
      <p>مشاهده همه محصولات</p>
      <ArrowLeft2 size={20} />
    </div>
  );
}

export default ViewAllProductsCard;
