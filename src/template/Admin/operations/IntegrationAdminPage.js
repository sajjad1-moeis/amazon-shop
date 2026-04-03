"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Cpu, Refresh, ArrowLeft2 } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { adminOperationsService } from "@/services/admin/adminOperationsService";
import { API_BASE_URL } from "@/services/api/client";

export default function IntegrationAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [apiKeyDraft, setApiKeyDraft] = useState("");
  const [secretDraft, setSecretDraft] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const [hasSecret, setHasSecret] = useState(false);
  const [clearKey, setClearKey] = useState(false);
  const [clearSecret, setClearSecret] = useState(false);
  const [lastTest, setLastTest] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const d = await adminOperationsService.getIntegration();
      setWebhookUrl(d?.webhookOutboundUrl ?? d?.WebhookOutboundUrl ?? "");
      setNotes(d?.notes ?? d?.Notes ?? "");
      setHasKey(!!(d?.hasThirdPartyApiKey ?? d?.HasThirdPartyApiKey));
      setHasSecret(!!(d?.hasWebhookSharedSecret ?? d?.HasWebhookSharedSecret));
      setLastTest({
        ok: d?.lastConnectionTestOk ?? d?.LastConnectionTestOk,
        msg: d?.lastConnectionTestMessage ?? d?.LastConnectionTestMessage,
        at: d?.lastConnectionTestUtc ?? d?.LastConnectionTestUtc,
      });
      setApiKeyDraft("");
      setSecretDraft("");
      setClearKey(false);
      setClearSecret(false);
    } catch (e) {
      toast.error(e.message || "خطا در بارگذاری");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    try {
      setSaving(true);
      const body = {
        webhookOutboundUrl: webhookUrl.trim() || null,
        notes: notes || null,
      };
      if (clearKey) body.thirdPartyApiKey = "";
      else if (apiKeyDraft !== "") body.thirdPartyApiKey = apiKeyDraft;
      if (clearSecret) body.webhookSharedSecret = "";
      else if (secretDraft !== "") body.webhookSharedSecret = secretDraft;
      await adminOperationsService.updateIntegration(body);
      toast.success("ذخیره شد");
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در ذخیره");
    } finally {
      setSaving(false);
    }
  };

  const test = async () => {
    try {
      setTesting(true);
      const r = await adminOperationsService.testWebhook();
      const ok = r?.ok ?? r?.Ok;
      const msg = r?.message ?? r?.Message ?? "";
      if (ok) toast.success(msg || "تست موفق");
      else toast.error(msg || "تست ناموفق");
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در تست");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6 pb-8 p-4 md:p-6 max-w-[720px] mx-auto">
      <AdminPageHeader
        title="مرکز یکپارچه‌سازی"
        subtitle="فاز ۱۰ — وب‌هوک خروجی، کلید API و راز مشترک (ذخیرهٔ امن با Data Protection در سرور). برای حفظ کلید فعلی فیلد را خالی بگذارید."
        icon={Cpu}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <Refresh className="size-4 ml-1" variant="Linear" />
              تازه‌سازی
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/pricing">
                <ArrowLeft2 className="size-4 ml-1 rotate-180" variant="Linear" />
                هاب قیمت‌گذاری
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/security/operational-logs?category=webhook.inbound">
                لاگ وب‌هوک ورودی
              </Link>
            </Button>
          </div>
        }
      />

      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-medium">وب‌هوک ورودی (callback)</p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          <code className="break-all bg-muted px-1 rounded">
            {API_BASE_URL ? `${API_BASE_URL.replace(/\/$/, "")}/webhooks/integration/inbound` : "—"}
          </code>
          <br />
          متد POST، JSON body؛ هدر <code className="bg-muted px-1">X-Webhook-Secret</code> باید با راز مشترک ذخیره‌شده در
          تنظیمات یکسان باشد. رویدادها در لاگ عملیاتی با دسته <code className="bg-muted px-1">webhook.inbound</code> ثبت
          می‌شوند.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="size-10" />
        </div>
      ) : (
        <div className="rounded-xl border border-border p-6 space-y-4">
          <div className="space-y-2">
            <Label>آدرس وب‌هوک (HEAD)</Label>
            <Input
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://..."
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label>کلید API طرف سوم {hasKey ? "(تنظیم شده)" : ""}</Label>
            <Input
              type="password"
              value={apiKeyDraft}
              onChange={(e) => {
                setApiKeyDraft(e.target.value);
                setClearKey(false);
              }}
              placeholder="خالی = بدون تغییر"
              disabled={clearKey}
              autoComplete="new-password"
            />
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <Checkbox checked={clearKey} onCheckedChange={(v) => setClearKey(!!v)} />
              حذف کلید ذخیره‌شده
            </label>
          </div>
          <div className="space-y-2">
            <Label>راز مشترک وب‌هوک {hasSecret ? "(تنظیم شده)" : ""}</Label>
            <Input
              type="password"
              value={secretDraft}
              onChange={(e) => {
                setSecretDraft(e.target.value);
                setClearSecret(false);
              }}
              placeholder="خالی = بدون تغییر"
              disabled={clearSecret}
              autoComplete="new-password"
            />
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <Checkbox checked={clearSecret} onCheckedChange={(v) => setClearSecret(!!v)} />
              حذف راز ذخیره‌شده
            </label>
          </div>
          <div className="space-y-2">
            <Label>یادداشت داخلی</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </div>
          {lastTest?.at != null && (
            <p className="text-xs text-muted-foreground">
              آخرین تست: {String(lastTest.msg)} — {lastTest.at ? new Date(lastTest.at).toLocaleString("fa-IR") : ""}
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button onClick={save} disabled={saving}>
              {saving ? <Spinner className="size-4" /> : "ذخیره"}
            </Button>
            <Button variant="outline" onClick={test} disabled={testing || !webhookUrl.trim()}>
              {testing ? <Spinner className="size-4" /> : "تست وب‌هوک"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
