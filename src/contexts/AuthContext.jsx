"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { authAPI } from "@/lib/api-client";
import { saveToken, getToken, removeToken, isAuthenticated } from "@/lib/token-manager";
import { isAdminUser } from "@/utils/authHelpers";
import { AUTH_SESSION_EXPIRED_EVENT } from "@/services/api/client";
import { mergeGuestCartToServer } from "@/lib/guestCart";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const extractToken = (data) =>
  data?.tokens?.accessToken || data?.tokens?.token || data?.accessToken || data?.token || null;

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [googleSyncInProgress, setGoogleSyncInProgress] = useState(false);
  const googleSyncDoneRef = useRef(false);
  const { data: session, status: sessionStatus } = useSession();

  /* ---------- Init Auth ---------- */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getToken();
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await authAPI.getUserByToken(token);

        if (response?.success && response?.data) {
          setUser(response.data.user || response.data);
        } else {
          removeToken();
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /** بعد از ورود موفق: اگر روی صفحهٔ اصلی یا auth هستیم به داشبورد/ادمین برو، وگرنه همان صفحه (ادامه خرید) بمان. */
  const redirectAfterLogin = (currentPath, loggedUser) => {
    const isHomeOrAuth =
      !currentPath ||
      currentPath === "/" ||
      currentPath.startsWith("/api/auth");
    if (isHomeOrAuth) {
      router.push(isAdminUser(loggedUser) ? "/admin" : "/dashboard");
    } else {
      router.refresh();
    }
  };

  /* ---------- Sync Google session to backend ---------- */
  const mockGoogleLogin = process.env.NEXT_PUBLIC_MOCK_GOOGLE_LOGIN === "true";

  useEffect(() => {
    if (
      sessionStatus !== "authenticated" ||
      !session?.idToken ||
      user ||
      googleSyncDoneRef.current ||
      getToken()
    ) {
      return;
    }
    googleSyncDoneRef.current = true;
    setGoogleSyncInProgress(true);
    const syncGoogle = async () => {
      try {
        setLoading(true);

        if (mockGoogleLogin) {
          saveToken("mock-token-google-test");
          const fakeUser = {
            id: 0,
            userId: 0,
            email: session.user?.email ?? "",
            firstName: session.user?.name ?? "کاربر تست",
            lastName: "",
            roles: [],
          };
          setUser(fakeUser);
          toast.success("ورود با گوگل (حالت تست بدون بک‌اند)");
          redirectAfterLogin("/", fakeUser);
          return;
        }

        const response = await authAPI.loginWithGoogle({ googleToken: session.idToken });
        if (!response?.success || !response?.data) {
          const backendMsg = response?.message || "ورود با گوگل انجام نشد";
          toast.error(backendMsg);
          googleSyncDoneRef.current = false;
          return;
        }
        const token = extractToken(response.data);
        if (token) saveToken(token);
        const loggedUser = response.data.user || response.data;
        if (loggedUser) setUser(loggedUser);
        const userId = loggedUser?.id ?? loggedUser?.userId;
        if (userId) {
          try {
            await mergeGuestCartToServer(userId, shoppingCartService);
          } catch (_) {}
        }
        toast.success(response.message || "ورود با گوگل موفقیت‌آمیز بود");
        redirectAfterLogin(typeof window !== "undefined" ? window.location.pathname : "/", loggedUser);
      } catch (error) {
        const isNetworkError =
          !error?.data &&
          (error?.message === "Failed to fetch" ||
            error?.name === "TypeError" ||
            /network|fetch|connection|ECONNREFUSED/i.test(String(error?.message || "")));
        const msg = isNetworkError
          ? "سرور در دسترس نیست. لطفاً بکند را اجرا کنید (مثلاً پورت ۷۸۹۲) و دوباره امتحان کنید."
          : error?.data?.message || error?.message || "خطا در ارتباط با سرور";
        toast.error(msg);
        googleSyncDoneRef.current = false;
      } finally {
        setLoading(false);
        setGoogleSyncInProgress(false);
      }
    };
    syncGoogle();
  }, [sessionStatus, session?.idToken, user, mockGoogleLogin]);

  /* ---------- Auth Actions ---------- */

  const login = async (phoneNumber, password) => {
    try {
      setLoading(true);
      const response = await authAPI.loginWithPhone({
        phoneNumber,
        password,
      });

      if (!response?.success || !response?.data) {
        toast.error(response?.message || "خطا در ورود");
        return { success: false, message: response?.message };
      }

      const token = extractToken(response.data);
      if (token) saveToken(token);

      const loggedUser = response.data.user || response.data;
      if (loggedUser) setUser(loggedUser);

      const userId = loggedUser?.id ?? loggedUser?.userId;
      if (userId) {
        try {
          await mergeGuestCartToServer(userId, shoppingCartService);
        } catch (_) {}
      }

      toast.success(response.message || "ورود موفقیت‌آمیز");
      return { success: true, data: response.data };
    } catch (error) {
      const msg = error?.data?.message || error?.message || "خطا در ارتباط با سرور";
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const sendRegistrationOtp = async (data) => {
    try {
      setLoading(true);
      const response = await authAPI.sendRegistrationOtp(data);

      if (response?.success) {
        toast.success(response.message || "کد تایید ارسال شد");
        return { success: true };
      }

      toast.error(response?.message || "خطا در ارسال کد");
      return { success: false };
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "خطا در ارتباط با سرور");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const verifyRegistrationOtp = async (phoneNumber, otpCode) => {
    try {
      setLoading(true);
      const response = await authAPI.verifyRegistrationOtp({
        phoneNumber,
        otpCode,
      });

      if (!response?.success || !response?.data) {
        toast.error(response?.message || "خطا در تایید کد");
        return { success: false };
      }

      const token = extractToken(response.data);
      if (token) saveToken(token);

      if (response.data.user) setUser(response.data.user);

      toast.success(response.message || "ثبت‌نام موفقیت‌آمیز");
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "خطا در ارتباط با سرور");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const sendForgotPasswordOtp = async (phoneNumber) => {
    try {
      setLoading(true);
      const response = await authAPI.sendForgotPasswordOtp({
        phoneNumber,
      });

      if (response?.success) {
        toast.success(response.message || "کد تایید ارسال شد");
        return { success: true };
      }

      toast.error(response?.message || "خطا در ارسال کد");
      return { success: false };
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "خطا در ارتباط با سرور");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    try {
      setLoading(true);
      const response = await authAPI.resetPassword(data);

      if (!response?.success || !response?.data) {
        toast.error(response?.message || "خطا در تغییر رمز عبور");
        return { success: false };
      }

      const token = extractToken(response.data);
      if (token) saveToken(token);

      if (response.data.user) setUser(response.data.user);

      toast.success(response.message || "رمز عبور با موفقیت تغییر کرد");
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "خطا در ارتباط با سرور");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (phoneNumber, otpType) => {
    try {
      setLoading(true);
      const response = await authAPI.resendOtp({
        phoneNumber,
        otpType,
      });

      if (response?.success) {
        toast.success(response.message || "کد تایید جدید ارسال شد");
        return { success: true };
      }

      toast.error(response?.message || "خطا در ارسال مجدد کد");
      return { success: false };
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "خطا در ارتباط با سرور");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = (callbackUrl) => {
    const url =
      callbackUrl ?? (typeof window !== "undefined" ? window.location.pathname || "/" : "/");
    signIn("google", { callbackUrl: url });
  };

  const logout = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (token) {
        try {
          await authAPI.logoutFromAllDevices();
        } catch (error) {
          console.error("Error logging out from all devices:", error);
          // Continue with logout even if API call fails
        }
      }
      try {
        await signOut({ redirect: false });
      } catch (_) {}
      googleSyncDoneRef.current = false;
      toast.success("با موفقیت خارج شدید");
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("خطا در خروج از سیستم");
      return { success: false };
    } finally {
      removeToken();
      setUser(null);
      setLoading(false);
    }
  };

  const getAuthToken = () => getToken();

  /** به‌روزرسانی سشن پس از تغییر رمز — ذخیره توکن جدید و کاربر (Phase 19) */
  const updateSession = (data) => {
    const token = data?.tokens?.accessToken || data?.tokens?.token || data?.accessToken || data?.token;
    if (token) saveToken(token);
    if (data?.user) setUser(data.user);
  };

  /* ---------- Context Value ---------- */

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: isAuthenticated() && user !== null,
      isAdmin: isAdminUser(user),
      login,
      loginWithGoogle,
      sendRegistrationOtp,
      verifyRegistrationOtp,
      sendForgotPasswordOtp,
      resetPassword,
      resendOtp,
      logout,
      getAuthToken,
      updateSession,
    }),
    [user, loading]
  );

  if (googleSyncInProgress) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-dark-bg">
        <p className="text-sm text-gray-600 dark:text-gray-400">در حال ورود...</p>
      </div>
    );
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
