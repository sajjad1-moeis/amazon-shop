import { getPublicClient, getAuthenticatedClient } from "./client";

export const authService = {
  sendRegistrationOtp: async (data) => {
    const client = getPublicClient();
    return client.post("Auth/SendRegistrationOtp", { json: data }).json();
  },

  verifyRegistrationOtp: async (data) => {
    const client = getPublicClient();
    return client.post("Auth/VerifyRegistrationOtp", { json: data }).json();
  },

  loginWithPhone: async (data) => {
    const client = getPublicClient();
    return client.post("Auth/LoginWithPhone", { json: data }).json();
  },

  sendForgotPasswordOtp: async (data) => {
    const client = getPublicClient();
    return client.post("Auth/SendForgotPasswordOtp", { json: data }).json();
  },

  resetPassword: async (data) => {
    const client = getPublicClient();
    return client.post("Auth/ResetPassword", { json: data }).json();
  },

  resendOtp: async (data) => {
    const client = getPublicClient();
    return client.post("Auth/ResendOtp", { json: data }).json();
  },

  getUserByToken: async (token) => {
    const client = getPublicClient();
    return client.post("Auth/GetUserByToken", { json: { token } }).json();
  },

  logoutFromAllDevices: async () => {
    const client = getAuthenticatedClient();
    return client.post("Auth/LogoutFromAllDevices").json();
  },

  refreshToken: async (token) => {
    const client = getPublicClient();
    return client.post("Auth/RefreshToken", { json: { token } }).json();
  },
};
