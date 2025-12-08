import ky from "ky";

const API_BASE_URL = "https://micrls.com/api/Auth";

// ایجاد instance اصلی ky
const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
  retry: {
    limit: 2,
    methods: ["get", "post"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;
        if (response && response.body) {
          try {
            const body = await response.json();
            error.message = body.message || error.message;
            error.data = body;
          } catch {
            // اگر JSON نبود، پیام پیش‌فرض استفاده می‌شود
          }
        }
        return error;
      },
    ],
  },
});

// Helper برای درخواست‌های با توکن
export const authenticatedRequest = (accessToken) => {
  return apiClient.extend({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// API Methods
export const authAPI = {
  // ارسال کد تایید ثبت‌نام
  sendRegistrationOtp: async (data) => {
    return apiClient.post("SendRegistrationOtp", { json: data }).json();
  },

  // تایید کد و تکمیل ثبت‌نام
  verifyRegistrationOtp: async (data) => {
    return apiClient.post("VerifyRegistrationOtp", { json: data }).json();
  },

  // ورود با شماره تلفن
  loginWithPhone: async (data) => {
    return apiClient.post("LoginWithPhone", { json: data }).json();
  },

  // ارسال کد بازیابی رمز عبور
  sendForgotPasswordOtp: async (data) => {
    return apiClient.post("SendForgotPasswordOtp", { json: data }).json();
  },

  // تنظیم رمز عبور جدید
  resetPassword: async (data) => {
    return apiClient.post("ResetPassword", { json: data }).json();
  },

  // ارسال مجدد کد OTP
  resendOtp: async (data) => {
    return apiClient.post("ResendOtp", { json: data }).json();
  },

  // تازه‌سازی توکن
  refreshToken: async (data) => {
    return apiClient.post("RefreshToken", { json: data }).json();
  },

  // دریافت اطلاعات کاربر از توکن
  getUserByToken: async (token) => {
    return apiClient.post("GetUserByToken", { json: { token } }).json();
  },

  // خروج از حساب
  logout: async (refreshToken, accessToken) => {
    return authenticatedRequest(accessToken)
      .post("Logout", { json: { refreshToken } })
      .json();
  },

  // خروج از همه دستگاه‌ها
  logoutFromAllDevices: async (accessToken) => {
    return authenticatedRequest(accessToken).post("LogoutFromAllDevices").json();
  },
};

export default apiClient;

