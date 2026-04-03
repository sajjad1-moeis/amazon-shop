import { getAuthenticatedClient, unwrapApiData } from "../api/client";

const PREFIX = "admin/jobs";

async function getJson(path) {
  const client = getAuthenticatedClient();
  const res = await client.get(path).json();
  return unwrapApiData(res);
}

async function postJson(path, body) {
  const client = getAuthenticatedClient();
  const res = await client.post(path, { json: body ?? {} }).json();
  return unwrapApiData(res);
}

/** فاز ۸ — api/admin/jobs */
export const adminJobsService = {
  overview: () => getJson(`${PREFIX}/overview`),
  recent: (state, take = 30) =>
    getJson(`${PREFIX}/recent?state=${encodeURIComponent(state)}&take=${take}`),
  resyncQueue: (limit = 80, hours = 24) =>
    getJson(`${PREFIX}/resync-queue?limit=${limit}&hours=${hours}`),
  /** @param {"popular"|"highPriority"|"fullStored"} jobType */
  enqueuePriceUpdate: (jobType, idempotencyKey) =>
    postJson(`${PREFIX}/enqueue/price-update`, {
      jobType,
      idempotencyKey: idempotencyKey || undefined,
    }),
  triggerRecurring: (recurringJobId) =>
    postJson(`${PREFIX}/recurring/${encodeURIComponent(recurringJobId)}/trigger`, {}),
  retryFailedJob: (jobId) => postJson(`${PREFIX}/retry/${encodeURIComponent(jobId)}`, {}),
  cancelJob: (jobId) => postJson(`${PREFIX}/cancel/${encodeURIComponent(jobId)}`, {}),
};
