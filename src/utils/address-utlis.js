/** نرمال‌سازی شماره موبایل ایران به فرمت 09xxxxxxxxx (۱۱ رقم) */
export function normalizeIranMobile(value) {
  if (value == null || typeof value !== "string") return "";
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("9")) return "0" + digits;
  if (digits.length === 11 && digits.startsWith("09")) return digits;
  if (digits.length === 11 && digits.startsWith("9")) return "0" + digits;
  return value.trim();
}

/** بررسی فرمت موبایل ایران (09xxxxxxxxx) */
export function isValidIranMobile(value) {
  const normalized = normalizeIranMobile(value);
  return /^09\d{9}$/.test(normalized);
}

export function formatAddress(formData) {
  const { province, city, address, plaque, unit } = formData;
  const parts = [province, city, address];

  if (plaque) parts.push(`پلاک ${plaque}`);
  if (unit) parts.push(`واحد ${unit}`);

  return parts.join("، ");
}

export function formatFullName(formData) {
  return `${formData.firstName} ${formData.lastName}`.trim();
}

export function parseAddressData(address) {
  return {
    title: address.title || "",
    province: address.province || "تهران",
    city: address.city || "شهر ری",
    address: address.address || "",
    plaque: address.plaque || "",
    unit: address.unit || "",
    postalCode: address.postalCode || "",
    firstName: address.firstName || address.name?.split(" ")[0] || "",
    lastName: address.lastName || address.name?.split(" ").slice(1).join(" ") || "",
    mobile: address.mobile || "",
    landline: address.landline || "",
    notes: address.notes || "",
  };
}

export function validateAddressForm(formData) {
  const errors = [];

  if (!formData.title?.trim()) errors.push("عنوان آدرس الزامی است");
  if (!formData.address?.trim()) errors.push("آدرس الزامی است");
  if (!formData.firstName?.trim()) errors.push("نام گیرنده الزامی است");
  if (!formData.lastName?.trim()) errors.push("نام خانوادگی گیرنده الزامی است");
  if (!formData.mobile?.trim()) errors.push("شماره تلفن گیرنده الزامی است");
  else if (!isValidIranMobile(formData.mobile)) errors.push("فرمت شماره تلفن نامعتبر است (مثال: 09123456789)");

  return {
    isValid: errors.length === 0,
    errors,
  };
}
