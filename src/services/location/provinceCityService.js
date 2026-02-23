/**
 * سرویس استان و شهر ایران از API آماده
 * استفاده در فرم آدرس و هر جایی که به انتخاب استان/شهر نیاز است
 */

const LOCATION_API_BASE = "https://iranplacesapi.liara.run/api";

/** @typedef {{ id: number; name: string; slug: string; tel_prefix?: string }} Province */
/** @typedef {{ id: number; name: string; slug: string; province_id: number }} City */

/** @type {Province[] | null} */
let provincesCache = null;

/**
 * دریافت لیست استان‌ها (کش می‌شود)
 * @returns {Promise<Province[]>}
 */
export async function getProvinces() {
  if (provincesCache) return provincesCache;
  const res = await fetch(`${LOCATION_API_BASE}/provinces`);
  if (!res.ok) throw new Error("خطا در دریافت لیست استان‌ها");
  const data = await res.json();
  provincesCache = Array.isArray(data) ? data : [];
  return provincesCache;
}

/**
 * دریافت لیست شهرهای یک استان
 * @param {number} provinceId
 * @returns {Promise<City[]>}
 */
export async function getCitiesByProvinceId(provinceId) {
  if (!provinceId) return [];
  const res = await fetch(`${LOCATION_API_BASE}/cities?province_id=${provinceId}`);
  if (!res.ok) throw new Error("خطا در دریافت لیست شهرها");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/**
 * پیدا کردن استان با نام (برای مقدار اولیه فرم)
 * @param {string} provinceName
 * @param {Province[]} provinces
 * @returns {Province | undefined}
 */
export function findProvinceByName(provinceName, provinces) {
  if (!provinceName || !provinces?.length) return undefined;
  const normalized = provinceName.trim();
  return provinces.find((p) => p.name === normalized || p.name?.replace(/\s/g, "") === normalized.replace(/\s/g, ""));
}

/**
 * پیدا کردن شهر با نام در لیست شهرها
 * @param {string} cityName
 * @param {City[]} cities
 * @returns {City | undefined}
 */
export function findCityByName(cityName, cities) {
  if (!cityName || !cities?.length) return undefined;
  const normalized = cityName.trim();
  return cities.find((c) => c.name === normalized || c.name?.replace(/\s/g, "") === normalized.replace(/\s/g, ""));
}

export const provinceCityService = {
  getProvinces,
  getCitiesByProvinceId,
  findProvinceByName,
  findCityByName,
};
