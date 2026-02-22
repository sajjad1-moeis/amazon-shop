import React from "react";

function Categories() {
  return (
    <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {[...Array(5)].map((item) => (
        <img className="size-full " src="/image/AliEx/category.png" />
      ))}
    </div>
  );
}

export default Categories;
