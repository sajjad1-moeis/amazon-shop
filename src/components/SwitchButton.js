"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function SwitchButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" className="flex items-center gap-2 rounded-xl px-3 py-1 text-white">
        <Moon size={18} />
        <span className="text-sm">تاریک</span>
      </Button>
    );
  }

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-xl px-3 py-1 text-white max-sm:text-gray-800 max-md:hover:bg-gray-100 dark:text-white hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm">{theme === "dark" ? "روشن" : "تاریک"}</span>
    </Button>
  );
}
