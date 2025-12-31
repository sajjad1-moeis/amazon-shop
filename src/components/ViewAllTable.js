import { ArrowLeft, ArrowLeft2, ArrowLeft3 } from "iconsax-reactjs";
import React from "react";

function ViewAllTable() {
  return (
    <div className="flex-center mt-4 text-sm gap-3 lg:hidden dark:text-primary-300 text-primary-700 ">
      <p>برای مشاهده کامل، بکشید</p>
      <div class="flex">
        <ArrowLeft2 size={20} />
        <ArrowLeft2 size={20} className="-mr-3" />
      </div>
    </div>
  );
}

export default ViewAllTable;
