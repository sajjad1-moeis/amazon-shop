"use client";

import { AuthModal } from "@/template/Auth/AuthModal";
import { User } from "iconsax-reactjs";
import React, { useState } from "react";

function BtnShowLoginModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-lg border-2 dark:border-[#898989] dark:text-[#898989] border-white"
      >
        <User />
      </button>
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default BtnShowLoginModal;
