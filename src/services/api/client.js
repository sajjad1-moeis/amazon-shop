import ky from "ky";
import { getToken, getRefreshToken, saveToken, removeToken } from "@/lib/token-manager";
import { isTokenExpired, isTokenExpiringSoon } from "@/utils/jwtUtils";
import { authService } from "./authService";

const API_BASE_URL = "https://micrls.com/api";

let isRefreshing = false;
let refreshPromise = null;

const refreshTokenIfNeeded = async () => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  const token = getToken();
  if (!token) {
    return null;
  }

  if (isTokenExpired(token) || isTokenExpiringSoon(token)) {
    isRefreshing = true;
    refreshPromise = (async () => {
      try {
        const refreshTokenValue = getRefreshToken();
        const tokenToUse = refreshTokenValue || token;

        const response = await authService.refreshToken(tokenToUse);
        if (response.success && response.data) {
          let newToken = null;
          let newRefreshToken = null;

          if (response.data.tokens?.accessToken) {
            newToken = response.data.tokens.accessToken;
            newRefreshToken = response.data.tokens.refreshToken;
          } else if (response.data.tokens?.token) {
            newToken = response.data.tokens.token;
            newRefreshToken = response.data.tokens.refreshToken;
          } else if (response.data.accessToken) {
            newToken = response.data.accessToken;
            newRefreshToken = response.data.refreshToken;
          } else if (response.data.token) {
            newToken = response.data.token;
            newRefreshToken = response.data.refreshToken;
          }

          if (newToken) {
            saveToken(newToken, newRefreshToken);
            return newToken;
          }
        }
        return null;
      } catch (error) {
        removeToken();
        throw error;
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  }

  return token;
};

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
    beforeRequest: [
      async (request) => {
        const url = request.url.toString();
        if (
          url.includes("/Auth/") &&
          (url.includes("/Login") ||
            url.includes("/RefreshToken") ||
            url.includes("/Verify") ||
            url.includes("/Register"))
        ) {
          return;
        }

        const token = getToken();
        if (token) {
          try {
            await refreshTokenIfNeeded();
            const updatedToken = getToken();
            if (updatedToken) {
              request.headers.set("Authorization", `Bearer ${updatedToken}`);
            }
          } catch (error) {
            console.error("Error refreshing token:", error);
          }
        }
      },
    ],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (response?.status === 401) {
          const url = error.request?.url?.toString() || "";
          if (!url.includes("/Auth/Login") && !url.includes("/Auth/RefreshToken")) {
            removeToken();
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
          }
        }

        if (response && response.body) {
          try {
            const body = await response.json();
            error.message = body.message || error.message;
            error.data = body;
          } catch {}
        }
        return error;
      },
    ],
  },
});

export const getAuthenticatedClient = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Access token not found");
  }
  return apiClient.extend({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPublicClient = () => {
  return apiClient;
};

export default apiClient;
