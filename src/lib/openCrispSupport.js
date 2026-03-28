/**
 * فقط از onClick دکمهٔ «پشتیبانی ۲۴ ساعته» صدا زده شود.
 * بدون prefetch/preconnect: هیچ درخواست خارجی و هیچ import به crisp-sdk-web تا قبل از همان کلیک اجرا نمی‌شود.
 */

const CRISP_WEBSITE_ID =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CRISP_WEBSITE_ID
    ? process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    : "4e13846e-a58b-4f6c-a145-36c3d851cfc0";

let crispSdkPromise = null;
let crispConfigured = false;
let crispCloseHandlerBound = false;
let crispOutsidePointerBound = false;

function markCrispAllowedFromHeader() {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-crisp-from-header", "");
  }
}

function bindCrispCloseHidesWidget(Crisp) {
  if (crispCloseHandlerBound || typeof window === "undefined") return;
  crispCloseHandlerBound = true;
  Crisp.chat.onChatClosed(() => {
    document.documentElement.removeAttribute("data-crisp-from-header");
    if (Array.isArray(window.$crisp)) {
      window.$crisp.push(["do", "chat:hide"]);
    }
  });
}

function pathTouchesCrispOrTrigger(event) {
  const path =
    typeof event.composedPath === "function" ? event.composedPath() : [event.target];
  return path.some((node) => {
    if (!(node instanceof HTMLElement)) return false;
    if (node.hasAttribute("data-crisp-support-trigger")) return true;
    if (node.id === "crisp-chatbox") return true;
    if (node.classList?.contains("crisp-client")) return true;
    return false;
  });
}

function bindCrispOutsideClose(Crisp) {
  if (crispOutsidePointerBound || typeof document === "undefined") return;
  crispOutsidePointerBound = true;
  document.addEventListener(
    "pointerdown",
    (event) => {
      if (!document.documentElement.hasAttribute("data-crisp-from-header")) return;
      if (pathTouchesCrispOrTrigger(event)) return;
      let react = false;
      try {
        react = Crisp.chat.isChatOpened() || Crisp.chat.isVisible();
      } catch {
        return;
      }
      if (!react) return;
      Crisp.chat.close();
    },
    true
  );
}

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
  markCrispAllowedFromHeader();
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
  bindCrispCloseHidesWidget(Crisp);
  bindCrispOutsideClose(Crisp);
}
