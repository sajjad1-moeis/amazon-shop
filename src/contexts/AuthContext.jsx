"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authAPI } from "@/lib/api-client";
import {
  saveTokens,
  getTokens,
  removeTokens,
  saveUser,
  getUser,
  isAuthenticated,
  isAccessTokenExpired,
  isRefreshTokenExpired,
  getAccessToken,
  getRefreshToken,
} from "@/lib/token-manager";
import { toast } from "sonner";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // تازه‌سازی خودکار توکن
  const refreshTokenSilently = useCallback(async () => {
    if (isRefreshing) return;

    const tokens = getTokens();
    if (!tokens?.accessToken || !tokens?.refreshToken) return;

    if (isRefreshTokenExpired()) {
      removeTokens();
      setUser(null);
      return;
    }

    setIsRefreshing(true);
    try {
      const response = await authAPI.refreshToken({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });

      if (response.success && response.data?.tokens) {
        saveTokens(response.data.tokens);
        if (response.data.user) {
          saveUser(response.data.user);
          setUser(response.data.user);
        }
        return true;
      }
    } catch (error) {
      console.error("خطا در تازه‌سازی توکن:", error);
      removeTokens();
      setUser(null);
      return false;
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  // بارگذاری اولیه
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedUser = getUser();
        const tokens = getTokens();

        if (tokens && savedUser && !isRefreshTokenExpired()) {
          setUser(savedUser);

          // اگر Access Token منقضی شده، تازه‌سازی کن
          if (isAccessTokenExpired()) {
            await refreshTokenSilently();
          }
        } else {
          removeTokens();
        }
      } catch (error) {
        console.error("خطا در بارگذاری اولیه:", error);
        removeTokens();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // تازه‌سازی توکن (برای استفاده دستی)
  const refreshToken = useCallback(async () => {
    return await refreshTokenSilently();
  }, [refreshTokenSilently]);

  // لاگین
  const login = async (phoneNumber, password) => {
    try {
      setLoading(true);
      const response = await authAPI.loginWithPhone({
        phoneNumber,
        password,
      });

      if (response.success && response.data) {
        if (response.data.tokens) {
          saveTokens(response.data.tokens);
        }
        if (response.data.user) {
          saveUser(response.data.user);
          setUser(response.data.user);
        }
        toast.success(response.message || "ورود موفقیت‌آمیز");
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || "خطا در ورود");
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || "خطا در ارتباط با سرور";
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ثبت‌نام - ارسال OTP
  const sendRegistrationOtp = async (data) => {
    try {
      setLoading(true);
      const response = await authAPI.sendRegistrationOtp(data);

      if (response.success) {
        toast.success(response.message || "کد تایید ارسال شد");
        return { success: true, message: response.message };
      } else {
        toast.error(response.message || "خطا در ارسال کد");
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || "خطا در ارتباط با سرور";
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // تایید ثبت‌نام
  const verifyRegistrationOtp = async (phoneNumber, otpCode) => {
    try {
      setLoading(true);
      const response = await authAPI.verifyRegistrationOtp({
        phoneNumber,
        otpCode,
      });

      if (response.success && response.data) {
        if (response.data.tokens) {
          saveTokens(response.data.tokens);
        }
        if (response.data.user) {
          saveUser(response.data.user);
          setUser(response.data.user);
        }
        toast.success(response.message || "ثبت‌نام موفقیت‌آمیز");
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || "خطا در تایید کد");
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || "خطا در ارتباط با سرور";
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ارسال کد بازیابی رمز عبور
  const sendForgotPasswordOtp = async (phoneNumber) => {
    try {
      setLoading(true);
      const response = await authAPI.sendForgotPasswordOtp({ phoneNumber });

      if (response.success) {
        toast.success(response.message || "کد تایید ارسال شد");
        return { success: true, message: response.message };
      } else {
        toast.error(response.message || "خطا در ارسال کد");
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || "خطا در ارتباط با سرور";
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // تنظیم رمز عبور جدید
  const resetPassword = async (data) => {
    try {
      setLoading(true);
      const response = await authAPI.resetPassword(data);

      if (response.success && response.data) {
        if (response.data.tokens) {
          saveTokens(response.data.tokens);
        }
        if (response.data.user) {
          saveUser(response.data.user);
          setUser(response.data.user);
        }
        toast.success(response.message || "رمز عبور با موفقیت تغییر کرد");
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || "خطا در تغییر رمز عبور");
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || "خطا در ارتباط با سرور";
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ارسال مجدد OTP
  const resendOtp = async (phoneNumber, otpType) => {
    try {
      setLoading(true);
      const response = await authAPI.resendOtp({ phoneNumber, otpType });

      if (response.success) {
        toast.success(response.message || "کد تایید جدید ارسال شد");
        return { success: true, message: response.message };
      } else {
        toast.error(response.message || "خطا در ارسال مجدد کد");
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || "خطا در ارتباط با سرور";
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // خروج
  const logout = async (logoutFromAll = false) => {
    try {
      setLoading(true);
      const tokens = getTokens();

      if (tokens?.refreshToken && tokens?.accessToken) {
        if (logoutFromAll) {
          await authAPI.logoutFromAllDevices(tokens.accessToken);
        } else {
          await authAPI.logout(tokens.refreshToken, tokens.accessToken);
        }
      }

      removeTokens();
      setUser(null);
      toast.success("با موفقیت خارج شدید");
      return { success: true };
    } catch (error) {
      // حتی اگر خطا داد، توکن‌ها را حذف کن
      removeTokens();
      setUser(null);
      console.error("خطا در خروج:", error);
      return { success: true }; // به هر حال خروج انجام شده
    } finally {
      setLoading(false);
    }
  };

  // بررسی اینکه کاربر لاگین است
  const checkAuth = () => {
    return isAuthenticated() && user !== null;
  };

  // دریافت Access Token برای استفاده در درخواست‌ها
  const getAuthToken = () => {
    return getAccessToken();
  };

  const value = {
    user,
    loading,
    isRefreshing,
    isAuthenticated: checkAuth(),
    login,
    sendRegistrationOtp,
    verifyRegistrationOtp,
    sendForgotPasswordOtp,
    resetPassword,
    resendOtp,
    logout,
    refreshToken,
    getAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
