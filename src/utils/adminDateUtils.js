/**
 * توابع تاریخ برای پنل ادمین:
 * - نمایش و انتخاب: همیشه فارسی (شمسی)
 * - ارسال به سرور: همیشه انگلیسی (ISO 8601)
 */

const FA_OPTIONS_DATE = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  calendar: "persian",
};

const FA_OPTIONS_DATETIME = {
  ...FA_OPTIONS_DATE,
  hour: "2-digit",
  minute: "2-digit",
};

/**
 * نمایش تاریخ به فارسی (فقط تاریخ)
 * @param {string|Date} dateInput - ISO رشته یا شی Date
 * @returns {string}
 */
export function formatDateFa(dateInput) {
  if (dateInput == null || dateInput === "") return "—";
  try {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (Number.isNaN(date.getTime())) return String(dateInput);
    return date.toLocaleDateString("fa-IR", FA_OPTIONS_DATE);
  } catch {
    return String(dateInput);
  }
}

/**
 * نمایش تاریخ و زمان به فارسی
 */
export function formatDateTimeFa(dateInput) {
  if (dateInput == null || dateInput === "") return "—";
  try {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (Number.isNaN(date.getTime())) return String(dateInput);
    return date.toLocaleDateString("fa-IR", FA_OPTIONS_DATETIME);
  } catch {
    return String(dateInput);
  }
}

