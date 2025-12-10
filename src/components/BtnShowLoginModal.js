"use client";

import { AuthModal } from "@/template/Auth/AuthModal";
import { User } from "iconsax-reactjs";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

function BtnShowLoginModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      setOpen(!open);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="p-3 rounded-lg border-2 dark:border-[#898989] dark:text-[#898989] border-white"
      >
        <User />
      </button>
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default BtnShowLoginModal;
