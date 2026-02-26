/**
 * سبد خرید مهمان (بدون لاگین) — ذخیره در localStorage
 * بعد از ورود با mergeGuestCartToServer به سرور منتقل می‌شود.
 */

const GUEST_CART_KEY = "guest_cart";

/**
 * @typedef {{ productId: number, quantity: number, hasQualityShield?: boolean, title?: string, imageUrl?: string }} GuestCartItem
 */

/**
 * @returns {GuestCartItem[]}
 */
export function getGuestCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

/**
 * @param {GuestCartItem[]} items
 */
export function setGuestCart(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(GUEST_CART_KEY, JSON.stringify(Array.isArray(items) ? items : []));
  } catch (_) {}
}

/**
 * افزودن یک آیتم به سبد مهمان (اگر productId تکراری باشد quantity جمع می‌شود)
 * @param {{ productId: number, quantity?: number, hasQualityShield?: boolean, title?: string, imageUrl?: string }} item
 */
export function addGuestCartItem(item) {
  const productId = Number(item.productId);
  if (!Number.isFinite(productId) || productId <= 0) return;
  const qty = Math.max(1, Number(item.quantity) || 1);
  const list = getGuestCart();
  const idx = list.findIndex((i) => Number(i.productId) === productId);
  if (idx >= 0) {
    list[idx].quantity = (list[idx].quantity || 1) + qty;
  } else {
    list.push({
      productId,
      quantity: qty,
      hasQualityShield: Boolean(item.hasQualityShield),
      title: item.title,
      imageUrl: item.imageUrl,
    });
  }
  setGuestCart(list);
}

/**
 * حذف یک محصول از سبد مهمان
 * @param {number} productId
 */
export function removeGuestCartItem(productId) {
  const id = Number(productId);
  if (!Number.isFinite(id)) return;
  const list = getGuestCart().filter((i) => Number(i.productId) !== id);
  setGuestCart(list);
}

/**
 * به‌روزرسانی تعداد یک آیتم در سبد مهمان
 * @param {number} productId
 * @param {number} quantity
 */
export function updateGuestCartItemQuantity(productId, quantity) {
  const id = Number(productId);
  const qty = Math.max(1, Number(quantity) || 1);
  if (!Number.isFinite(id)) return;
  const list = getGuestCart();
  const idx = list.findIndex((i) => Number(i.productId) === id);
  if (idx >= 0) {
    list[idx].quantity = qty;
    setGuestCart(list);
  }
}

/**
 * تعداد آیتم‌های سبد مهمان (برای نمایش در هدر)
 */
export function getGuestCartCount() {
  const list = getGuestCart();
  return list.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0);
}

/**
 * بعد از ورود: آیتم‌های سبد مهمان را به سرور بفرست و سپس localStorage را خالی کن.
 * @param {number} userId
 * @param {{ addToCart: (userId: number, body: { productId: number, quantity: number, hasQualityShield?: boolean }) => Promise<unknown> }} cartService
 */
export async function mergeGuestCartToServer(userId, cartService) {
  const items = getGuestCart();
  if (items.length === 0) return;
  try {
    for (const it of items) {
      const productId = Number(it.productId);
      if (!Number.isFinite(productId) || productId <= 0) continue;
      await cartService.addToCart(userId, {
        productId,
        quantity: Number(it.quantity) || 1,
        hasQualityShield: Boolean(it.hasQualityShield),
      });
    }
  } catch (e) {
    console.error("Merge guest cart to server failed:", e);
    return;
  }
  setGuestCart([]);
}
