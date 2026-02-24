import { getAuthenticatedClient, getPublicClient } from "../api/client";

/**
 * Phase 11 - api/admin/products
 * Add by link, bulk import, bulk import status, seed test data.
 * همهٔ متدها data خام را برمی‌گردانند؛ در لایهٔ فراخواننده از unwrapApiData استفاده کن.
 */
export const adminProductService = {
  /** POST api/admin/products/add-by-link — body: AddProductByLinkRequest */
  addByLink: async (payload) => {
    const client = getAuthenticatedClient();
    return client.post("admin/products/add-by-link", { json: payload }).json();
  },

  /** POST api/admin/products/bulk-import — body: BulkImportRequest */
  bulkImport: async (payload) => {
    const client = getAuthenticatedClient();
    return client.post("admin/products/bulk-import", { json: payload }).json();
  },

  /** GET api/admin/products/bulk-import/{jobId}/status */
  getBulkImportStatus: async (jobId) => {
    const client = getAuthenticatedClient();
    return client.get(`admin/products/bulk-import/${encodeURIComponent(jobId)}/status`).json();
  },

  /** POST api/admin/products/seed-test-data?count= */
  seedTestData: async (count) => {
    // در سورس [AllowAnonymous] است؛ از public client استفاده می‌کنیم.
    const client = getPublicClient();
    const qs =
      typeof count === "number" ? `?count=${Math.min(50, Math.max(1, count))}` : "";
    return client.post(`admin/products/seed-test-data${qs}`).json();
  },
};

