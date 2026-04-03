/**
 * یک درخواست همزمان به /api/admin/scraper-proxy/status را برای چند مصرف‌کننده (فاز ۴ هشدار، فاز ۵)
 * به یک Promise واحد می‌چسباند تا با هر «بروزرسانی» داشبورد دوبار به Next زده نشود.
 */
let proxyStatusInflight = null;

export function fetchScraperProxyStatusJsonDeduped() {
  if (!proxyStatusInflight) {
    proxyStatusInflight = fetch("/api/admin/scraper-proxy/status", { credentials: "same-origin" })
      .then(async (r) => {
        const httpOk = r.ok;
        let json = null;
        if (httpOk) {
          try {
            json = await r.json();
          } catch {
            json = null;
          }
        }
        return { httpOk, httpStatus: r.status, json };
      })
      .catch(() => ({ httpOk: false, httpStatus: 0, json: null }))
      .finally(() => {
        proxyStatusInflight = null;
      });
  }
  return proxyStatusInflight;
}
