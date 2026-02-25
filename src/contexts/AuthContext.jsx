"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { authAPI } from "@/lib/api-client";
import { saveToken, getToken, removeToken, isAuthenticated } from "@/lib/token-manager";
import { toast } from "sonner";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const extractToken = (data) => {
  if (!data || typeof data !== "object") return null;
  return (
    data.tokens?.accessToken ||
    data.tokens?.token ||
    data.accessToken ||
    data.access_token ||
    data.token ||
    null
  );
};

/** نرمال مثل بک‌اند: 98xxxxxxxxxx یا 9xxxxxxxxx → 09xxxxxxxxx */
const normalizePhone = (phone) => {
  if (!phone || typeof phone !== "string") return "";
  const p = phone.trim().replace(/\s/g, "").replace(/\D/g, "");
  if (p.length === 12 && p.startsWith("98")) return "0" + p.slice(2);
  if (p.length === 10 && p.startsWith("9")) return "0" + p;
  return p;
};

/** یکسان‌سازی خواندن پاسخ API (camelCase و PascalCase) */
const parseAuthResponse = (response) => ({
  ok: response?.success ?? response?.Success ?? false,
  data: response?.data ?? response?.Data ?? null,
  message: response?.message ?? response?.Message ?? "",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const { ok, data, message: msg } = parseAuthResponse(response);

        if (ok && data) {
          setUser(data.user ?? data);
        } else {
          toast.error(`${msg || "کاربر یافت نشد"} — لطفاً دوباره وارد شوید. (در صورت استفاده از برنچ تیمی، فایل .env.local را با همان آدرس API تنظیم کنید.)`);
          removeToken();
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        const msg = error?.data?.message || error?.message || "کاربر یافت نشد";
        toast.error(`${msg} — لطفاً دوباره وارد شوید.`);
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /* ---------- Auth Actions ---------- */

  const login = async (phoneNumber, password) => {
    try {
      setLoading(true);
      const phone = normalizePhone(phoneNumber);
      if (!phone) {
        toast.error("شماره موبایل معتبر نیست");
        return { success: false, message: "شماره موبایل معتبر نیست" };
      }
      const response = await authAPI.loginWithPhone({
        phoneNumber: phone,
        password: password?.trim() ?? "",
      });
      const { ok, data, message: msg } = parseAuthResponse(response);

      if (!ok || !data) {
        toast.error(msg || "خطا در ورود");
        return { success: false, message: msg };
      }

      const token = extractToken(data);
      if (token) saveToken(token);
      if (data.user) setUser(data.user);

      toast.success(msg || "ورود موفقیت‌آمیز");
      return { success: true, data };
    } catch (error) {
      const errMsg = error?.data?.message ?? error?.message ?? "خطا در ارتباط با سرور";
      toast.error(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const sendRegistrationOtp = async (data) => {
    try {
      setLoading(true);
      const phone = normalizePhone(data?.phoneNumber ?? "");
      const payload = {
        phoneNumber: phone,
        password: data?.password?.trim() ?? "",
        confirmPassword: data?.confirmPassword?.trim() ?? "",
      };
      const response = await authAPI.sendRegistrationOtp(payload);
      const { ok, message: msg } = parseAuthResponse(response);

      if (ok) {
        toast.success(msg || "کد تایید ارسال شد");
        return { success: true };
      }
      toast.error(msg || "خطا در ارسال کد");
      return { success: false };
    } catch (error) {
      toast.error(error?.data?.message ?? error?.message ?? "خطا در ارتباط با سرور");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const verifyRegistrationOtp = async (phoneNumber, otpCode) => {
    try {
      setLoading(true);
      const phone = normalizePhone(phoneNumber);
      const code = String(otpCode ?? "").trim().slice(0, 6);
      if (!phone || code.length !== 6) {
        toast.error(phone ? "کد تایید باید ۶ رقم باشد" : "شماره موبایل معتبر نیست");
        return { success: false };
      }
      const response = await authAPI.verifyRegistrationOtp({
        phoneNumber: phone,
        otpCode: code,
      });

      const { ok, data, message: msg } = parseAuthResponse(response);

      if (!ok || !data) {
        toast.error(msg || "خطا در تایید کد");
        return { success: false };
      }

      const token = extractToken(data);
      if (token) {
        saveToken(token);
        if (data.user) setUser(data.user);
        toast.success(msg || "ثبت‌نام موفقیت‌آمیز");
      } else {
        setUser(null);
        toast.success(msg || "ثبت‌نام موفقیت‌آمیز");
        toast.info("لطفاً با شماره و رمز عبور وارد شوید.");
      }
      return { success: true, data };
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
      const phone = normalizePhone(phoneNumber ?? "");
      if (!phone) {
        toast.error("شماره موبایل معتبر نیست");
        return { success: false };
      }
      const response = await authAPI.sendForgotPasswordOtp({ phoneNumber: phone });
      const { ok, message: msg } = parseAuthResponse(response);

      if (ok) {
        toast.success(msg || "کد تایید ارسال شد");
        return { success: true };
      }
      toast.error(msg || "خطا در ارسال کد");
      return { success: false };
    } catch (error) {
      toast.error(error?.data?.message ?? error?.message ?? "خطا در ارتباط با سرور");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    try {
      setLoading(true);
      const phone = normalizePhone(data?.phoneNumber ?? "");
      const code = String(data?.otpCode ?? "").trim().slice(0, 6);
      const payload = {
        phoneNumber: phone,
        otpCode: code,
        newPassword: data?.newPassword?.trim() ?? "",
        confirmPassword: data?.confirmPassword?.trim() ?? "",
      };
      const response = await authAPI.resetPassword(payload);
      const { ok, data: resData, message: msg } = parseAuthResponse(response);

      if (!ok || !resData) {
        toast.error(msg || "خطا در تغییر رمز عبور");
        return { success: false };
      }

      const token = extractToken(resData);
      if (token) saveToken(token);
      if (resData.user) setUser(resData.user);

      toast.success(msg || "رمز عبور با موفقیت تغییر کرد");
      return { success: true, data: resData };
    } catch (error) {
      toast.error(error?.data?.message ?? error?.message ?? "خطا در ارتباط با سرور");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (phoneNumber, otpType) => {
    try {
      setLoading(true);
      const phone = normalizePhone(phoneNumber ?? "");
      if (!phone) {
        toast.error("شماره موبایل معتبر نیست");
        return { success: false };
      }
      const type = String(otpType ?? "").toLowerCase() === "forgot" ? "forgot" : "register";
      const response = await authAPI.resendOtp({ phoneNumber: phone, otpType: type });
      const { ok, message: msg } = parseAuthResponse(response);

      if (ok) {
        toast.success(msg || "کد تایید جدید ارسال شد");
        return { success: true };
      }
      toast.error(msg || "خطا در ارسال مجدد کد");
      return { success: false };
    } catch (error) {
      toast.error(error?.data?.message ?? error?.message ?? "خطا در ارتباط با سرور");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (token) {
        try {
          await authAPI.logoutFromAllDevices();
        } catch (err) {
          console.error("Error logging out from all devices:", err);
        }
      }
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

  /* ---------- Context Value ---------- */

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: isAuthenticated() && user !== null,
      login,
      sendRegistrationOtp,
      verifyRegistrationOtp,
      sendForgotPasswordOtp,
      resetPassword,
      resendOtp,
      logout,
      getAuthToken,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
