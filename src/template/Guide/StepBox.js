import React from "react";

function StepBox({ id, title, desc }) {
  return (
    <div key={id} className="flex items-start gap-4">
      <div className="w-8 h-8 flex-none bg-primary-500 text-white rounded-full flex items-center justify-center text-sm">
        {id}
      </div>
      <div>
        <p className=" text-gray-600 text-base md:text-lg">{title}</p>
        <p className="text-gray-500 text-sm mt-2">{desc}</p>
      </div>
    </div>
  );
}

export default StepBox;
