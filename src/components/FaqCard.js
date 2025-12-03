import { Add } from "iconsax-reactjs";
import React from "react";

function FaqCard({ id, question, answer }) {
  return (
    <div
      key={id}
      value={id}
      className="bg-white dark:bg-dark-field rounded-xl  p-4"
      style={{ boxShadow: "0px 1px 5px -1px #0000001F" }}
    >
      <div className="text-right hover:no-underline  flex items-center gap-2">
        <div className="size-8 bg-primary-300 dark:bg-primary-400 text-white flex-center rounded-full">
          <Add />
        </div>
        <span className=" text-gray-700 flex-1 text-right dark:text-dark-titre">{question}</span>
      </div>
      <div className="text-right pt-4 mt-4 text-gray-600 leading-7 border-t dark:border-dark-stroke dark:text-dark-text border-gray-200 max-md:text-sm">
        {answer}
      </div>
    </div>
  );
}

export default FaqCard;
