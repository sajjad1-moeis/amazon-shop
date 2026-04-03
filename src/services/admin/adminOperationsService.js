import { getAuthenticatedClient, unwrapApiData } from "../api/client";

const PREFIX = "admin/operations";

async function getJson(path) {
  const client = getAuthenticatedClient();
  const res = await client.get(path).json();
  return unwrapApiData(res);
}

async function putJson(path, body) {
  const client = getAuthenticatedClient();
  const res = await client.put(path, { json: body }).json();
  return unwrapApiData(res);
}

async function postJson(path, body) {
  const client = getAuthenticatedClient();
  const res = await client.post(path, { json: body ?? {} }).json();
  return unwrapApiData(res);
}

/** api/admin/operations — audit، لاگ عملیاتی، یکپارچه‌سازی */
export const adminOperationsService = {
  auditLogs: ({ page = 1, pageSize = 25, action, entityType } = {}) => {
    const q = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (action?.trim()) q.set("action", action.trim());
    if (entityType?.trim()) q.set("entityType", entityType.trim());
    return getJson(`${PREFIX}/audit-logs?${q}`);
  },

  operationalLogs: ({ page = 1, pageSize = 25, category } = {}) => {
    const q = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (category?.trim()) q.set("category", category.trim());
    return getJson(`${PREFIX}/operational-logs?${q}`);
  },

  getIntegration: () => getJson(`${PREFIX}/integration`),

  updateIntegration: (body) => putJson(`${PREFIX}/integration`, body),

  testWebhook: () => postJson(`${PREFIX}/integration/test-webhook`),
};
