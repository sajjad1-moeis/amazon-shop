import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowLeft2, ArrowLeft3 } from "iconsax-reactjs";
import React from "react";

function ViewAllTable({ className }) {
  return (
    <div
      className={cn(
        "flex-center mt-4 text-sm gap-3 dark:text-primary-300 text-primary-700 ",
        className || " md:hidden"
      )}
    >
      <p>برای مشاهده کامل، بکشید</p>
      <div className="flex">
        <ArrowLeft2 size={20} />
        <ArrowLeft2 size={20} className="-mr-3" />
      </div>
    </div>
  );
}

export default ViewAllTable;
