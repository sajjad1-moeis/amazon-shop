/**
 * Logger utility برای مدیریت console logs
 * در production فقط error ها را log می‌کند
 */

const isDevelopment = process.env.NODE_ENV === "development";

const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  error: (...args) => {
    console.error(...args);
    // در اینجا می‌توانید error را به یک سرویس error tracking ارسال کنید
    // مثلاً Sentry, LogRocket, etc.
  },

  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};

export default logger;

