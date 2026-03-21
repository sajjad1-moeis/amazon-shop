/**
 * کمک‌توابع دسته‌بندی محصول (مگامنو، موبایل، صفحه دسته‌بندی)
 */

export function unwrapCategoryList(res) {
  const list = res?.data ?? res;
  return Array.isArray(list) ? list : [];
}

export function categoryProductHref(cat) {
  const slug = cat?.slug ?? cat?.slugKey;
  const id = cat?.id ?? cat?.key;
  if (slug) return `/products?category=${encodeURIComponent(slug)}`;
  if (id != null) return `/products?category=${encodeURIComponent(String(id))}`;
  return "/products";
}

export function categoryLabel(cat) {
  return cat?.name ?? cat?.title ?? cat?.label ?? "-";
}

/** والد در ریسپانس API (گاهی parentId برمی‌گردد) */
export function categoryParentRef(c) {
  const p = c?.parentCategoryId ?? c?.parentId;
  return p;
}

/** کلید پایدار برای انتخاب در UI (id اولویت دارد) */
export function categorySelectionKey(cat) {
  if (cat?.id != null) return cat.id;
  if (cat?.key != null) return cat.key;
  if (cat?.slug != null) return cat.slug;
  return null;
}

export function categoryMatchesSelection(cat, selectedKey) {
  if (selectedKey == null || cat == null) return false;
  const s = String(selectedKey);
  return (
    (cat.id != null && String(cat.id) === s) ||
    (cat.key != null && String(cat.key) === s) ||
    (cat.slug != null && String(cat.slug) === s)
  );
}

/**
 * ریشه‌ها: بدون والد یا والد خالی/صفر
 * @param {{ fallbackToAllWhenEmpty?: boolean }} [opts] — برای مگامنو: اگر ریشه‌ای نبود، کل لیست را نشان بده
 */
export function getRootCategories(categories, opts = {}) {
  const { fallbackToAllWhenEmpty = false } = opts;
  const roots = categories.filter((c) => {
    const p = categoryParentRef(c);
    return p == null || p === "" || p === 0 || p === "0";
  });
  if (roots.length === 0 && categories.length > 0 && fallbackToAllWhenEmpty) return categories;
  return roots;
}

/**
 * @param {object[]} categories
 * @param {object} parent — آبجکت دسته والد (مقایسه با id یا key طبق API)
 */
export function getChildCategories(categories, parent) {
  const pid = parent?.id ?? parent?.key;
  if (pid == null) return [];
  return categories.filter((c) => {
    const p = categoryParentRef(c);
    return String(p) === String(pid);
  });
}
