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

  if (!formData.firstName?.trim()) errors.push("نام گیرنده الزامی است");
  if (!formData.lastName?.trim()) errors.push("نام خانوادگی گیرنده الزامی است");
  if (!formData.address?.trim()) errors.push("آدرس الزامی است");

  return {
    isValid: errors.length === 0,
    errors,
  };
}
