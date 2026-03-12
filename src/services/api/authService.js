import { getPublicClient, getAuthenticatedClient } from "./client";

// برای اینکه در پاسخ 4xx/5xx هم بدنهٔ API (success, message, data) برگردد و فرانت بتواند پیام خطا را نشان دهد
const postAuth = (client, path, body) =>
  client
    .post(path, { json: body, throwHttpErrors: false })
    .then((res) => res.json());

export const authService = {
  sendRegistrationOtp: async (data) => {
    const client = getPublicClient();
    return postAuth(client, "Auth/SendRegistrationOtp", data);
  },

  verifyRegistrationOtp: async (data) => {
    const client = getPublicClient();
    return postAuth(client, "Auth/VerifyRegistrationOtp", data);
  },

  loginWithPhone: async (data) => {
    const client = getPublicClient();
    return postAuth(client, "Auth/LoginWithPhone", data);
  },

  loginWithGoogle: async (data) => {
    const client = getPublicClient();
    return postAuth(client, "Auth/LoginWithGoogle", data);
  },

  sendForgotPasswordOtp: async (data) => {
    const client = getPublicClient();
    return postAuth(client, "Auth/SendForgotPasswordOtp", data);
  },

  resetPassword: async (data) => {
    const client = getPublicClient();
    return postAuth(client, "Auth/ResetPassword", data);
  },

  resendOtp: async (data) => {
    const client = getPublicClient();
    return postAuth(client, "Auth/ResendOtp", data);
  },

  getUserByToken: async (token) => {
    const client = getPublicClient();
    return postAuth(client, "Auth/GetUserByToken", { token });
  },

  logoutFromAllDevices: async () => {
    const client = getAuthenticatedClient();
    return client
      .post("Auth/LogoutFromAllDevices", { throwHttpErrors: false })
      .then((res) => res.json());
  },
};
