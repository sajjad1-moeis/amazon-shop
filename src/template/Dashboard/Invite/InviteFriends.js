"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import ReferralCodeBox from "./ReferralCodeBox";
import InvitedFriendsTable from "./InvitedFriendsTable";
import ShareModal from "./ShareModal";
import RewardConditionsModal from "./RewardConditionsModal";

const referralCode = "REF-۹۳۵۲";
const referralLink = "http://example.com/r...";

// Sample data for invited friends
const invitedFriends = [
  {
    id: 1,
    name: "علی رضایی",
    membershipDate: "۱۴۰۳/۱۰/۱۵",
    registrationStatus: "تکمیل نشده",
    firstPurchaseStatus: "انجام شده",
    reward: "۲۵۰ امتیاز",
  },
  {
    id: 2,
    name: "لیلا محمدی",
    membershipDate: "۱۴۰۳/۱۰/۲۰",
    registrationStatus: "تکمیل شده",
    firstPurchaseStatus: "انجام شده",
    reward: "۵۰۰ امتیاز",
  },
];

export default function InviteFriends() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRewardConditionsModalOpen, setIsRewardConditionsModalOpen] = useState(false);

  return (
    <div dir="rtl">
      {/* Page Header */}
      <PageHeader title="دعوت دوستان" description="با دعوت دوستان خود پاداش دریافت کنید." />

      {/* Main Content: Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section: Referral Code Box */}
        <ReferralCodeBox
          referralCode={referralCode}
          referralLink={referralLink}
          onShareClick={() => setIsShareModalOpen(true)}
          onRewardConditionsClick={() => setIsRewardConditionsModalOpen(true)}
        />

        {/* Right Section: Invited Friends Table */}
        <InvitedFriendsTable friends={invitedFriends} />
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        referralCode={referralCode}
        referralLink={referralLink}
      />

      {/* Reward Conditions Modal */}
      <RewardConditionsModal
        isOpen={isRewardConditionsModalOpen}
        onClose={() => setIsRewardConditionsModalOpen(false)}
      />
    </div>
  );
}
