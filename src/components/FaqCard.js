import { Add } from "iconsax-reactjs";
import React from "react";

function FaqCard({ id, question, answer }) {
  return (
    <div key={id} value={id} className="bg-white rounded-xl  p-4" style={{ boxShadow: "0px 1px 5px -1px #0000001F" }}>
      <div className="text-right hover:no-underline  flex items-center gap-2">
        <div class="size-8 bg-primary-300 text-white flex-center rounded-full">
          <Add />
        </div>
        <span className=" text-gray-700 flex-1 text-right">{question}</span>
      </div>
      <div className="text-right pt-4 mt-4 text-gray-600 leading-7 border-t border-gray-200 max-md:text-sm">
        {answer}
      </div>
    </div>
  );
}

export default FaqCard;
