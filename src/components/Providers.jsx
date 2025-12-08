"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" dir="rtl" />
    </AuthProvider>
  );
}
