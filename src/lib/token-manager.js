const TOKEN_COOKIE_NAME = "accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

const setCookie = (name, value, days = 365) => {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const saveToken = (token, refreshToken = null) => {
  if (token) {
    setCookie(TOKEN_COOKIE_NAME, token);
  }
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
  }
};

export const getToken = () => {
  return getCookie(TOKEN_COOKIE_NAME);
};

export const getRefreshToken = () => {
  return getCookie(REFRESH_TOKEN_COOKIE_NAME);
};

export const removeToken = () => {
  deleteCookie(TOKEN_COOKIE_NAME);
  deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
};

export const isAuthenticated = () => {
  return !!getToken();
};
