"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getToken();
        if (token) {
          const response = await authAPI.getUserByToken(token);
          if (response.success && response.data) {
            setUser(response.data.user || response.data);
          } else {
            removeToken();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (phoneNumber, password) => {
    try {
      setLoading(true);
      const response = await authAPI.loginWithPhone({
        phoneNumber,
        password,
      });

      if (response.success && response.data) {
        let token = null;
        if (response.data.tokens?.accessToken) {
          token = response.data.tokens.accessToken;
        } else if (response.data.tokens?.token) {
          token = response.data.tokens.token;
        } else if (response.data.accessToken) {
          token = response.data.accessToken;
        } else if (response.data.token) {
          token = response.data.token;
        }

        if (token) {
          saveToken(token);
        }

        if (response.data.user) {
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

  const verifyRegistrationOtp = async (phoneNumber, otpCode) => {
    try {
      setLoading(true);
      const response = await authAPI.verifyRegistrationOtp({
        phoneNumber,
        otpCode,
      });

      if (response.success && response.data) {
        let token = null;
        if (response.data.tokens?.accessToken) {
          token = response.data.tokens.accessToken;
        } else if (response.data.tokens?.token) {
          token = response.data.tokens.token;
        } else if (response.data.accessToken) {
          token = response.data.accessToken;
        } else if (response.data.token) {
          token = response.data.token;
        }

        if (token) {
          saveToken(token);
        }

        if (response.data.user) {
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

  const resetPassword = async (data) => {
    try {
      setLoading(true);
      const response = await authAPI.resetPassword(data);

      if (response.success && response.data) {
        let token = null;
        if (response.data.tokens?.accessToken) {
          token = response.data.tokens.accessToken;
        } else if (response.data.tokens?.token) {
          token = response.data.tokens.token;
        } else if (response.data.accessToken) {
          token = response.data.accessToken;
        } else if (response.data.token) {
          token = response.data.token;
        }

        if (token) {
          saveToken(token);
        }

        if (response.data.user) {
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

  const logout = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (token) await authAPI.logoutFromAllDevices();

      toast.success("با موفقیت خارج شدید");
      return { success: true };
    } finally {
      setLoading(false);
      removeToken();
      setUser(null);
      return { success: true };
    }
  };

  const getAuthToken = () => {
    return getToken();
  };

  const value = {
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
