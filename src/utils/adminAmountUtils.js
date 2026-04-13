/**
 * پارس اعداد مالی/آمار از پاسخ API (عدد، رشته، جداکنندهٔ هزارگان فارسی/انگلیسی).
 * قرارداد بک‌اند: JSON با نام فیلدهای camelCase و اعداد به‌صورت عدد JSON؛
 * در ورودی به API هم با AllowReadingFromString رشتهٔ عددی پذیرفته می‌شود.
 */
export function toFiniteAmount(value, fallback = 0) {
  if (value == null || value === "") return fallback;
  if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
  const s = String(value)
    .trim()
    .replace(/\u066C/g, "")
    .replace(/٬/g, "")
    .replace(/,/g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : fallback;
}

/** برای نمایش آماری: اگر مقدار نامعتبر بود null برمی‌گرداند تا UI خط تیره نشان دهد. */
export function toOptionalFiniteNumber(value) {
  if (value == null || value === "") return null;
  const n = toFiniteAmount(value, NaN);
  return Number.isFinite(n) ? n : null;
}
