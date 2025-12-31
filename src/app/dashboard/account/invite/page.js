"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import InvitedFriendsTable from "@/template/Dashboard/Invite/InvitedFriendsTable";
import RewardConditionsModal from "@/template/Dashboard/Invite/RewardConditionsModal";
import ShareModal from "@/template/Dashboard/Invite/ShareModal";
import { toast } from "sonner";

// Mock data - should be replaced with API call
const invitedFriends = [
  {
    id: 1,
    name: "علی رضایی",
    membershipDate: "۱۴۰۳/۱۰/۱۵",
    registrationStatus: "not-completed",
    purchaseStatus: "done",
    reward: "۲۵۰ امتیاز",
  },
  {
    id: 2,
    name: "لیلا محمدی",
    membershipDate: "۱۴۰۳/۱۰/۲۰",
    registrationStatus: "completed",
    purchaseStatus: "done",
    reward: "۵۰۰ امتیاز",
  },
];

const referralCode = "REF-۹۳";
const referralLink = "http://example.com/referral/REF-93";

export default function InvitePage() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleRewardConditions = () => {
    setRewardModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div dir="rtl">
        <PageHeader title={"دعوت دوستان"} description={"با دعوت دوستان خود پاداش دریافت کنید."} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {/* Right Section - Invited Friends Table */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <InvitedFriendsTable friends={invitedFriends} />
          </div>
          {/* Left Card - Referral Code Box */}
          <div className="bg-gradient-to-b from-[#606EC0] to-[#8995D6] dark:from-[#606EC066] dark:to-[#8995D666] rounded-xl p-3 sm:p-4 shadow-xl order-1 lg:order-2">
            <h3 className="text-white text-base sm:text-lg mb-4 sm:mb-6">کد دعوت اختصاصی شما</h3>

            <div>
              {/* Referral Code Input */}
              <div className="bg-white/15 flex items-center justify-between p-2 sm:p-3 rounded-lg mb-2 sm:mb-3 text-xs sm:text-sm text-gray-100">
                <div>کد دعوت</div>
                <div className="font-mono text-left break-all">{referralCode}</div>
              </div>
              <div className="bg-white/15 flex items-center justify-between p-2 sm:p-3 rounded-lg mb-2 text-xs sm:text-sm text-gray-100">
                <div>لینک دعوت</div>
                <div className="font-mono text-left break-all text-[10px] sm:text-xs">{referralLink}</div>
              </div>

              {/* Share Button */}
              <Button
                onClick={handleShare}
                className="w-full bg-gray-200 text-gray-700 hover:bg-white/90 dark:bg-dark-title font-medium gap-2 mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm py-2"
              >
                اشتراک گذاری
              </Button>

              {/* Description Text */}
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

      {/* Modals */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        referralCode={referralCode}
        referralLink={referralLink}
      />
      <RewardConditionsModal isOpen={rewardModalOpen} onClose={() => setRewardModalOpen(false)} />
    </DashboardLayout>
  );
}
