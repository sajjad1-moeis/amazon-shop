import React from "react";

function LinerBg() {
  return (
    <>
      <div
        className="absolute dark:hidden size-full inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(250, 250, 250, 0) 80%, #FAFAFA 100%) , linear-gradient(180deg, rgba(3, 9, 36, 0.8) 7.34%, rgba(0, 0, 0, 0) 31.76%)",
        }}
      />
      <div
        className="absolute dark:block hidden size-full inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(3, 9, 36, 0.8) 7.34%, rgba(0, 0, 0, 0) 31.76%),linear-gradient(180deg, rgba(38, 38, 38, 0) 52.12%, #262626 100%)",
        }}
      />
    </>
  );
}

export default LinerBg;
