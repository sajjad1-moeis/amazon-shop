/**
 * فرمت کردن تاریخ به فرمت فارسی
 * @param {string} dateString - تاریخ به صورت string
 * @returns {string} تاریخ فرمت شده
 */
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
};

