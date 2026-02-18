import ky from "ky";
import { getToken } from "@/lib/token-manager";

// روی سرور: در .env.local مقدار NEXT_PUBLIC_API_URL را بگذار (مثلاً http://107.161.175.45:8080/api)
const API_BASE_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "https://micrls.com/api";

// آدرس اسکرپر پایتون (طبق IMPLEMENTATION_GUIDE: فرانت مستقیم به پایتون برای جستجو)
// مثال: http://107.161.175.45:5000 (بدون /api در انتها)
const SCRAPER_BASE_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_SCRAPER_URL
    ? process.env.NEXT_PUBLIC_SCRAPER_URL.replace(/\/$/, "")
    : "";

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

/** کلاینت مخصوص اسکرپر پایتون (جستجو و عکس — انتقال بهینه با gzip) */
const scraperClient =
  SCRAPER_BASE_URL
    ? ky.create({
        prefixUrl: SCRAPER_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
        },
        timeout: 30000,
        retry: {
          limit: 1,
          methods: ["get"],
          statusCodes: [408, 500, 502, 503, 504],
        },
        hooks: {
          beforeError: [
            async (error) => {
              const { response } = error;
              if (response && response.body) {
                try {
                  const body = await response.json();
                  error.message = body.message || body.error || error.message;
                  error.data = body;
                } catch {}
              }
              return error;
            },
          ],
        },
      })
    : null;

export const getScraperClient = () => scraperClient;
export const isScraperConfigured = () => Boolean(SCRAPER_BASE_URL);

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
