"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import InvitedFriendsTable from "@/template/Dashboard/Invite/InvitedFriendsTable";
import RewardConditionsModal from "@/template/Dashboard/Invite/RewardConditionsModal";
import ShareModal from "@/template/Dashboard/Invite/ShareModal";
import { referralService } from "@/services/referral/referralService";
import { unwrapApiData } from "@/services/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

function mapFriendToTable(item) {
  const joinedAt = item.joinedAt ?? item.membershipDate ?? item.createdAt;
  const membershipDate = joinedAt
    ? new Date(joinedAt).toLocaleDateString("fa-IR")
    : "-";
  return {
    id: item.userId ?? item.id,
    name: item.displayName ?? item.name ?? item.email ?? "-",
    membershipDate,
    registrationStatus: item.registrationStatus ?? "completed",
    purchaseStatus: item.purchaseStatus ?? item.hasPurchased ? "done" : "not-done",
    reward: item.reward ?? item.rewardPoints != null ? `${item.rewardPoints} امتیاز` : "-",
  };
}

export default function InvitePage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [referralInfo, setReferralInfo] = useState({ referralCode: "", referralLink: "", referralCount: 0 });
  const [invitedFriends, setInvitedFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId == null) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    Promise.all([
      referralService.getMyReferralInfo(),
      referralService.getInvitedFriends({ pageNumber: 1, pageSize: 50 }),
    ])
      .then(([infoRes, friendsRes]) => {
        if (cancelled) return;
        const info = unwrapApiData(infoRes);
        const friendsData = unwrapApiData(friendsRes);
        setReferralInfo({
          referralCode: info?.referralCode ?? "",
          referralLink: info?.referralLink ?? "",
          referralCount: info?.referralCount ?? 0,
        });
        const items = friendsData?.items ?? friendsData ?? [];
        setInvitedFriends(items.map(mapFriendToTable));
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(err?.message ?? "خطا در دریافت اطلاعات دعوت");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [userId]);

  const handleShare = () => setShareModalOpen(true);
  const handleRewardConditions = () => setRewardModalOpen(true);

  if (userId == null) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده دعوت دوستان وارد شوید.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div dir="rtl">
        <PageHeader title="دعوت دوستان" description="با دعوت دوستان خود پاداش دریافت کنید." />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {loading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : (
              <InvitedFriendsTable friends={invitedFriends} />
            )}
          </div>
          <div className="bg-gradient-to-b from-[#606EC0] to-[#8995D6] dark:from-[#606EC066] dark:to-[#8995D666] rounded-xl p-3 sm:p-4 shadow-xl order-1 lg:order-2">
            <h3 className="text-white text-base sm:text-lg mb-4 sm:mb-6">کد دعوت اختصاصی شما</h3>
            <div>
              <div className="md:grid-cols-2 lg:grid-cols-1 grid gap-2 md:gap-3">
                <div className="bg-white/15 flex items-center justify-between p-2 sm:p-3 rounded-lg text-xs sm:text-sm text-gray-100">
                  <div>کد دعوت</div>
                  <div className="font-mono text-left break-all">{referralInfo.referralCode || "-"}</div>
                </div>
                <div className="bg-white/15 flex items-center justify-between p-2 sm:p-3 rounded-lg text-xs sm:text-sm text-gray-100">
                  <div>لینک دعوت</div>
                  <div className="font-mono text-left break-all text-[10px] sm:text-xs">{referralInfo.referralLink || "-"}</div>
                </div>
              </div>
              <Button
                onClick={handleShare}
                className="w-full bg-gray-200 text-gray-700 hover:bg-white/90 dark:bg-dark-title font-medium gap-2 mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm py-2"
              >
                اشتراک گذاری
              </Button>
              <p className="text-white/90 dark:text-white/65 text-[10px] sm:text-xs mt-3 sm:mt-4 leading-relaxed">
                با ارسال لینک به دوستان خود میتوانید طبق{" "}
                <button
                  onClick={handleRewardConditions}
                  className="text-yellow-300 hover:text-orange-300 underline font-medium"
                >
                  شرایط دریافت پاداش
                </button>
                ، امتیاز بگیرید
              </p>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        referralCode={referralInfo.referralCode}
        referralLink={referralInfo.referralLink}
      />
      <RewardConditionsModal isOpen={rewardModalOpen} onClose={() => setRewardModalOpen(false)} />
    </DashboardLayout>
  );
}
