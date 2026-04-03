import { redirect } from "next/navigation";

/** سازگاری با لینک‌های قدیمی — وضعیت Pending = 1 */
export default function PendingOrdersPage() {
  redirect("/admin/orders?status=1");
}
