// Token Manager - مدیریت توکن‌ها در localStorage

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

// ذخیره توکن‌ها
export const saveTokens = (accessToken, refreshToken) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

// دریافت توکن‌ها
export const getTokens = () => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    return { accessToken, refreshToken };
  }
  return { accessToken: null, refreshToken: null };
};

// حذف توکن‌ها
export const removeTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// دریافت Access Token
export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
};

// دریافت Refresh Token
export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
};

// ذخیره اطلاعات کاربر
export const saveUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

// دریافت اطلاعات کاربر
export const getUser = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

// بررسی اینکه کاربر لاگین است
export const isAuthenticated = () => {
  const tokens = getTokens();
  return !!(tokens.accessToken && tokens.refreshToken);
};

// بررسی انقضای Access Token
export const isAccessTokenExpired = () => {
  const token = getAccessToken();
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // تبدیل به میلی‌ثانیه
    return Date.now() >= exp;
  } catch {
    return true;
  }
};

// بررسی انقضای Refresh Token
export const isRefreshTokenExpired = () => {
  const token = getRefreshToken();
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // تبدیل به میلی‌ثانیه
    return Date.now() >= exp;
  } catch {
    return true;
  }
};


