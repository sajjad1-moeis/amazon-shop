import { authService } from "@/services/api/authService";

export const authAPI = {
  sendRegistrationOtp: authService.sendRegistrationOtp,
  verifyRegistrationOtp: authService.verifyRegistrationOtp,
  loginWithPhone: authService.loginWithPhone,
  sendForgotPasswordOtp: authService.sendForgotPasswordOtp,
  resetPassword: authService.resetPassword,
  resendOtp: authService.resendOtp,
  getUserByToken: authService.getUserByToken,
  logoutFromAllDevices: authService.logoutFromAllDevices,
  refreshToken: authService.refreshToken,
};

export default authService;
