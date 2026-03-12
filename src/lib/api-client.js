import { authService } from "@/services/api/authService";

export const authAPI = {
  sendRegistrationOtp: authService.sendRegistrationOtp,
  verifyRegistrationOtp: authService.verifyRegistrationOtp,
  loginWithPhone: authService.loginWithPhone,
  loginWithGoogle: authService.loginWithGoogle,
  sendForgotPasswordOtp: authService.sendForgotPasswordOtp,
  resetPassword: authService.resetPassword,
  resendOtp: authService.resendOtp,
  getUserByToken: authService.getUserByToken,
  logoutFromAllDevices: authService.logoutFromAllDevices,
};

export default authService;
