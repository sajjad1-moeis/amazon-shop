"use client";

import React, { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import BasicInfoCard from "@/template/Dashboard/Profile/BasicInfo/BasicInfoCard";
import FinancialInfoCard from "@/template/Dashboard/Profile/Financial/FinancialInfoCard";
import NotificationSettingsCard from "@/template/Dashboard/Profile/Notification/NotificationSettingsCard";
import SecurityCard from "@/template/Dashboard/Profile/Security/SecurityCard";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/user/userService";
import { userBankAccountService } from "@/services/userBankAccount/userBankAccountService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

function normalizeProfile(apiProfile) {
  if (!apiProfile) return null;
  const p = apiProfile;
  const namePart = p.fullName ?? p.full_name ?? [p.firstName, p.lastName].filter(Boolean).join(" ").trim();
  const fullName = namePart || p.userName || p.phoneNumber || "";
  const createdAt = p.createdAt ?? p.created_at ?? p.registerDate;
  const membershipDate =
    createdAt != null
      ? new Date(createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "2-digit", day: "2-digit" })
      : "";
  return {
    fullName,
    phone: p.phoneNumber ?? p.phone ?? "",
    email: p.email ?? "",
    nationalId: p.nationalId ?? p.national_id ?? "",
    avatar: p.avatarUrl ?? p.avatar ?? p.imageUrl ?? p.profileImage ?? "",
    membershipDate,
    lastPasswordChange: p.lastPasswordChange ?? p.lastPasswordChangeDate ?? null,
    twoFactorEnabled: p.twoFactorEnabled ?? p.twoFactor ?? false,
    activeDevicesCount: p.activeDevicesCount ?? p.connectedDevicesCount ?? 1,
    notificationTypes: p.notificationTypes ?? ["orders"],
    notificationMethods: p.notificationMethods ?? ["site", "telegram"],
    telegramConnected: p.telegramConnected ?? p.telegramLinked ?? false,
  };
}

function normalizeVerification(apiVerification) {
  if (!apiVerification) return { verificationStatusText: "در انتظار" };
  const v = apiVerification;
  const isVerified = v.isVerified ?? (v.isPhoneVerified && v.isEmailVerified);
  return {
    verificationStatusText: isVerified ? "تکمیل شده" : "در انتظار",
    isPhoneVerified: v.isPhoneVerified ?? false,
    isEmailVerified: v.isEmailVerified ?? false,
  };
}

function normalizeBankAccounts(list) {
  if (!Array.isArray(list) || list.length === 0) return null;
  const acc = list[0];
  const shaba = acc.shaba ?? acc.iban ?? acc.sheba ?? "";
  const card = acc.cardNumber ?? acc.card ?? "";
  const maskedCard =
    card && card.length >= 8
      ? `${card.slice(0, 4)} **** **** ${card.slice(-4)}`
      : card
        ? "**** **** **** " + (acc.lastFourDigits ?? card.slice(-4))
        : "—";
  return { shaba: shaba || "—", cardNumber: maskedCard };
}

export default function ProfilePage() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [verification, setVerification] = useState(null);
  const [bankAccounts, setBankAccounts] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      const res = await userService.getProfile();
      const data = unwrapApiData(res);
      setProfile(normalizeProfile(data ?? res));
    } catch {
      setProfile(null);
    }
  }, []);

  const loadVerification = useCallback(async () => {
    try {
      const res = await userService.getVerificationStatus();
      const data = unwrapApiData(res);
      setVerification(normalizeVerification(data ?? res));
    } catch {
      setVerification(normalizeVerification(null));
    }
  }, []);

  const loadBankAccounts = useCallback(async () => {
    try {
      const list = await userBankAccountService.getList();
      const arr = Array.isArray(list) ? list : list?.items ?? list?.data ?? [];
      setBankAccounts(arr);
    } catch {
      setBankAccounts([]);
    }
  }, []);

  const loadAll = useCallback(() => {
    setLoading(true);
    Promise.all([loadProfile(), loadVerification(), loadBankAccounts()]).finally(() => setLoading(false));
  }, [loadProfile, loadVerification, loadBankAccounts]);

  useEffect(() => {
    if (authUser?.id ?? authUser?.userId) {
      loadAll();
    } else {
      setLoading(false);
    }
  }, [authUser?.id, authUser?.userId, loadAll]);

  if (loading && !profile && !verification) {
    return (
      <DashboardLayout>
        <PageHeader title="پروفایل کاربری" description="مدیریت اطلاعات شخصی، امنیت و تنظیمات حساب" />
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  const basicData = profile
    ? {
        fullName: profile.fullName,
        phone: profile.phone,
        email: profile.email,
        nationalId: profile.nationalId,
        verificationStatusText: verification?.verificationStatusText ?? "در انتظار",
        membershipDate: profile.membershipDate,
        avatar: profile.avatar,
      }
    : null;

  const securityData = profile
    ? {
        password: "******",
        twoFactorAuthText: profile.twoFactorEnabled ? "فعال" : "غیرفعال",
        activeDevices: profile.activeDevicesCount ?? 1,
        activeDevicesText: `${profile.activeDevicesCount ?? 1} دستگاه متصل`,
        lastPasswordChange: profile.lastPasswordChange
          ? new Date(profile.lastPasswordChange).toLocaleDateString("fa-IR")
          : "—",
      }
    : null;

  const financialData = bankAccounts != null ? normalizeBankAccounts(bankAccounts) : null;

  const notificationData = profile
    ? {
        notificationTypes: profile.notificationTypes ?? ["orders"],
        notificationMethods: profile.notificationMethods ?? ["site", "telegram"],
        telegramConnected: profile.telegramConnected ?? false,
      }
    : null;

  return (
    <DashboardLayout>
      <PageHeader title="پروفایل کاربری" description="مدیریت اطلاعات شخصی، امنیت و تنظیمات حساب" />

      <div className="space-y-4 sm:space-y-6">
        <BasicInfoCard
          data={basicData}
          onProfileUpdated={loadProfile}
        />

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 sm:gap-6">
          <SecurityCard data={securityData} onDevicesUpdated={loadProfile} />
          <FinancialInfoCard data={financialData} bankAccounts={bankAccounts} onUpdated={loadBankAccounts} />
        </div>

        <NotificationSettingsCard data={notificationData} onUpdated={loadProfile} />
      </div>
    </DashboardLayout>
  );
}
