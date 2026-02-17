import React from "react";

function Categories() {
  return (
    <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {[...Array(5)].map((_, i) => (
        <img key={i} className="size-full " src="/image/AliEx/category.png" alt="" />
      ))}
    </div>
  );
}

export default Categories;
