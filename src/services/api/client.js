import ky from "ky";
import { getToken } from "@/lib/token-manager";

// روی سرور: در .env.local مقدار NEXT_PUBLIC_API_URL را بگذار (مثلاً http://107.161.175.45:8080/api)
const API_BASE_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "https://micrls.com/api";

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
