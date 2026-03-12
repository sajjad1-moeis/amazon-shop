/**
 * اگر رشته تاریخ بدون timezone باشد (مثلاً از API)، به‌عنوان UTC در نظر گرفته می‌شود
 * تا بعد با timeZone ایران نمایش درست داده شود.
 */
function toDateForIran(dateString) {
  if (!dateString) return null;
  const s = String(dateString).trim();
  if (!s) return null;
  if (/Z$|[-+]\d{2}:?\d{2}$/.test(s)) return new Date(s);
  return new Date(s + "Z");
}

/** تاریخ و ساعت به وقت ایران (Asia/Tehran) و تقویم شمسی */
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = toDateForIran(dateString);
    if (!date || isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("fa-IR", {
      timeZone: "Asia/Tehran",
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





