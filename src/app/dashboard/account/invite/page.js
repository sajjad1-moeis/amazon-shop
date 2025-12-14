"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { invitedFriends } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import InvitedFriendsTable from "@/template/Dashboard/Invite/InvitedFriendsTable";
import ShareModal from "@/template/Dashboard/Invite/ShareModal";
import RewardConditionsModal from "@/template/Dashboard/Invite/RewardConditionsModal";

const referralCode = "REF-۹۳";
const referralLink = "http://example.com/r...";

export default function InvitePage() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRewardConditionsModalOpen, setIsRewardConditionsModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleRewardConditions = () => {
    setIsRewardConditionsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div dir="rtl">
        <PageHeader title={"دعوت دوستان"} description={"با دعوت دوستان خود پاداش دریافت کنید."} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Card - Referral Code Box */}

          {/* Right Section - Invited Friends Table */}
          <div className="lg:col-span-2">
            <InvitedFriendsTable friends={invitedFriends} />
          </div>
          <div className="bg-gradient-to-b from-[#606EC0] to-[#8995D6] rounded-xl p-4 shadow-xl">
            <h3 className="text-white text-lg  mb-6">کد دعوت اختصاصی شما</h3>

            <div>
              {/* Referral Code Input */}
              <div className="bg-white/15 flex-between p-3 rounded-lg mb-3  text-sm text-gray-100">
                <div htmlFor="referral-code">کد دعوت</div>
                <div id="referral-code" type="text">
                  {referralCode}
                </div>
              </div>
              <div className="bg-white/15 flex-between p-3 rounded-lg mb-2  text-sm text-gray-100">
                <div htmlFor="referral-code">لینک دعوت</div>
                <div id="referral-code" type="text">
                  {referralLink}
                </div>
              </div>

              {/* Share Button */}
              <Button
                onClick={handleShare}
                className="w-full bg-gray-200 text-gray-700 hover:bg-white/90 font-medium gap-2 mt-8"
              >
                اشتراک گذاری
              </Button>

              {/* Description Text */}
              <p className="text-white/90 text-xs mt-4 leading-relaxed">
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

        {/* Modals */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          referralCode={referralCode}
          referralLink={referralLink}
        />
        <RewardConditionsModal
          isOpen={isRewardConditionsModalOpen}
          onClose={() => setIsRewardConditionsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
