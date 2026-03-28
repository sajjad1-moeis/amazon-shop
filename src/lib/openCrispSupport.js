/**
 * فقط از onClick دکمهٔ «پشتیبانی ۲۴ ساعته» صدا زده شود.
 * هیچ import استاتیکی به crisp-sdk-web در باندل هدر/لایوت نیست؛ تا کلیک، اسکریپت و CDN Crisp لود نمی‌شوند.
 */

const CRISP_WEBSITE_ID =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CRISP_WEBSITE_ID
    ? process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    : "4e13846e-a58b-4f6c-a145-36c3d851cfc0";

let crispSdkPromise = null;
let crispConfigured = false;

function loadCrispSdk() {
  if (!crispSdkPromise) {
    crispSdkPromise = import(
      /* webpackChunkName: "crisp-sdk-web" */
      "crisp-sdk-web"
    );
  }
  return crispSdkPromise;
}

export async function openCrispSupport() {
  const { Crisp } = await loadCrispSdk();
  if (!crispConfigured) {
    Crisp.configure(CRISP_WEBSITE_ID, { autoload: false });
    // setPosition در crisp-sdk-web با $crisp (بدون window) در ESM خطا می‌دهد؛ همان config را مستقیم می‌فرستیم.
    crispConfigured = true;
  }
  if (!Crisp.isCrispInjected()) {
    Crisp.load();
  }
  if (typeof window !== "undefined" && Array.isArray(window.$crisp)) {
    window.$crisp.push(["config", "position:reverse", [true]]);
  }
  Crisp.chat.show();
  Crisp.chat.open();
}
