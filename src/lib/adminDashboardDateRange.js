/**
 * بازه‌های زمانی داشبورد ادمین (فاز ۳) — تاریخ محلی مرورگر، خروجی ISO برای API.
 */

export const DASHBOARD_RANGE_QUERY = {
  TODAY: "today",
  LAST_7_DAYS: "7d",
  LAST_30_DAYS: "30d",
  THIS_MONTH: "month",
  CUSTOM: "custom",
};

const MS_DAY = 86400000;

function startOfLocalDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfLocalDay(d) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

/** پارامتر معتبر range یا پیش‌فرض */
export function normalizeRangeParam(value) {
  const v = (value || "").toLowerCase();
  const allowed = Object.values(DASHBOARD_RANGE_QUERY);
  if (allowed.includes(v)) return v;
  return DASHBOARD_RANGE_QUERY.LAST_7_DAYS;
}

/**
 * @param {string} range — یکی از DASHBOARD_RANGE_QUERY
 * @param {string} [fromYmd] — برای custom: YYYY-MM-DD
 * @param {string} [toYmd]
 * @returns {{ start: Date, end: Date }}
 */
export function getDateRangeForPreset(range, fromYmd, toYmd) {
  const now = new Date();
  const r = normalizeRangeParam(range);

  if (r === DASHBOARD_RANGE_QUERY.CUSTOM && fromYmd && toYmd) {
    const start = startOfLocalDay(new Date(`${fromYmd}T12:00:00`));
    const end = endOfLocalDay(new Date(`${toYmd}T12:00:00`));
    if (start.getTime() > end.getTime()) return { start: end, end: start };
    return { start, end };
  }

  if (r === DASHBOARD_RANGE_QUERY.TODAY) {
    return { start: startOfLocalDay(now), end: endOfLocalDay(now) };
  }

  if (r === DASHBOARD_RANGE_QUERY.THIS_MONTH) {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    return { start, end: endOfLocalDay(now) };
  }

  const days = r === DASHBOARD_RANGE_QUERY.LAST_30_DAYS ? 30 : 7;
  const end = endOfLocalDay(now);
  const start = startOfLocalDay(new Date(end.getTime() - (days - 1) * MS_DAY));
  return { start, end };
}

/** بازهٔ قبلی با همان طول (برای مقایسهٔ درصدی) */
export function getPreviousPeriodRange(start, end) {
  const durationMs = end.getTime() - start.getTime() + 1;
  const prevEnd = new Date(start.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - durationMs + 1);
  return { start: prevStart, end: prevEnd };
}

export function toIsoRange(start, end) {
  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
}

export function rangePresetLabelFa(range) {
  switch (normalizeRangeParam(range)) {
    case DASHBOARD_RANGE_QUERY.TODAY:
      return "امروز";
    case DASHBOARD_RANGE_QUERY.LAST_7_DAYS:
      return "۷ روز اخیر";
    case DASHBOARD_RANGE_QUERY.LAST_30_DAYS:
      return "۳۰ روز اخیر";
    case DASHBOARD_RANGE_QUERY.THIS_MONTH:
      return "این ماه";
    case DASHBOARD_RANGE_QUERY.CUSTOM:
      return "بازه دلخواه";
    default:
      return "۷ روز اخیر";
  }
}
