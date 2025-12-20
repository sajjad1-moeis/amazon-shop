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

const extractToken = (data) =>
  data?.tokens?.accessToken || data?.tokens?.token || data?.accessToken || data?.token || null;

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

      if (response.data.user) setUser(response.data.user);

      toast.success(response.message || "ورود موفقیت‌آمیز");
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error?.message || "خطا در ارتباط با سرور");
      return { success: false };
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
      toast.error(error?.message || "خطا در ارتباط با سرور");
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
      toast.error(error?.message || "خطا در ارتباط با سرور");
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
      toast.error(error?.message || "خطا در ارتباط با سرور");
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
      toast.error(error?.message || "خطا در ارتباط با سرور");
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
      toast.error(error?.message || "خطا در ارتباط با سرور");
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
        } catch (error) {
          console.error("Error logging out from all devices:", error);
          // Continue with logout even if API call fails
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
