/**
 * نقش‌هایی که دسترسی به پنل ادمین دارند (حروف کوچک برای مقایسه بدون حساسیت به حروف)
 */
const ADMIN_ROLE_NAMES = [
  "admin",
  "superadmin",
  "super admin",
  "مدیر",
  "ادمین",
  "administrator",
];

/**
 * بررسی می‌کند کاربر بر اساس نقش‌هایش به پنل ادمین دسترسی دارد یا نه
 * @param {object|null} user - شیء کاربر از API (دارای roles یا role)
 * @returns {boolean}
 */
export function isAdminUser(user) {
  if (!user) return false;
  const roles = user.roles ?? (user.role ? [user.role] : []);
  if (!Array.isArray(roles) && typeof roles === "string") {
    return ADMIN_ROLE_NAMES.some((name) => roles.toLowerCase().trim() === name);
  }
  if (!Array.isArray(roles)) return false;
  return roles.some((r) => {
    const roleName = typeof r === "string" ? r : r?.name ?? r?.role ?? "";
    return ADMIN_ROLE_NAMES.some((name) => roleName.toLowerCase().trim() === name);
  });
}
