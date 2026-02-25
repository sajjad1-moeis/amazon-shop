"use client";

import { AuthModal } from "@/template/Auth/AuthModal";
import { User, Logout } from "iconsax-reactjs";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

function BtnShowLoginModal() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleClick = () => {
    if (isAuthenticated) {
      setMenuOpen((v) => !v);
    } else {
      setOpen(!open);
    }
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={handleClick}
          className="p-3 rounded-lg border-2 dark:border-[#898989] dark:text-[#898989] border-white"
          aria-expanded={menuOpen}
          aria-haspopup="true"
        >
          <User />
        </button>
        {isAuthenticated && menuOpen && (
          <div
            className="absolute right-0 top-full mt-2 min-w-[160px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-box shadow-lg py-1 z-50"
            role="menu"
          >
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mx-1"
            >
              <User size={18} />
              پنل کاربری
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mx-1"
            >
              <Logout size={18} />
              خروج
            </button>
          </div>
        )}
      </div>
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default BtnShowLoginModal;
